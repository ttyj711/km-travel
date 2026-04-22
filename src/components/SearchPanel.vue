<template>
  <van-popup v-model:show="visible" position="bottom" round :style="{ height: '72%' }">
    <div class="search-panel">
      <div class="search-header">
        <div>
          <span class="search-kicker">Add Stop</span>
          <h3>搜索地点添加到路线</h3>
        </div>
        <button class="search-close" @click="visible = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="search-input-row">
        <van-search
          v-model="keyword"
          placeholder="输入地名搜索，如：稻城亚丁"
          shape="round"
          :clearable="true"
          @search="handleSearch"
          @clear="clearResults"
        />
      </div>

      <div class="search-status" v-if="searching">
        <span class="status-loading">搜索中...</span>
      </div>

      <div class="search-status" v-else-if="searchError">
        <span class="status-error">{{ searchError }}</span>
      </div>

      <div class="search-results" v-else-if="results.length > 0">
        <article
          v-for="poi in results"
          :key="poi.id"
          class="result-item"
          @click="selectPoi(poi)"
        >
          <div class="result-info">
            <strong class="result-name">{{ poi.name }}</strong>
            <span class="result-addr">{{ poi.address || poi.cityname + poi.adname }}</span>
          </div>
          <svg class="result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </article>
      </div>

      <div class="search-empty" v-else-if="keyword && !searching">
        <p>输入关键词后点击搜索</p>
      </div>

      <div class="search-form" v-if="selectedPoi">
        <div class="form-divider"></div>
        <div class="form-row">
          <label>站点名称</label>
          <van-field v-model="form.name" placeholder="站点名称" />
        </div>
        <div class="form-row">
          <label>海拔</label>
          <van-field v-model="form.altitude" placeholder="如：3200m" />
        </div>
        <div class="form-row">
          <label>简介</label>
          <van-field v-model="form.desc" type="textarea" rows="2" placeholder="站点简介" />
        </div>
        <div class="form-row">
          <label>标签（逗号分隔）</label>
          <van-field v-model="form.tagsStr" placeholder="如：秘境,雪山" />
        </div>
        <button class="add-btn" @click="confirmAdd">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          添加到路线
        </button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const props = defineProps({
  show: { type: Boolean, default: false }
})

const emit = defineEmits(['update:show', 'added'])

const { addStop } = inject('travelStore')

const visible = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const keyword = ref('')
const searching = ref(false)
const searchError = ref('')
const results = ref([])
const selectedPoi = ref(null)

const form = ref({
  name: '',
  altitude: '',
  desc: '',
  tagsStr: ''
})

const handleSearch = () => {
  if (!keyword.value.trim()) return

  searching.value = true
  searchError.value = ''
  results.value = []
  selectedPoi.value = null

  const apiKey = import.meta.env.VITE_AMAP_KEY || 'YOUR_AMAP_KEY_HERE'

  AMapLoader.load({
    key: apiKey,
    version: '2.0',
    plugins: ['AMap.PlaceSearch']
  })
    .then((AMap) => {
      const placeSearch = new AMap.PlaceSearch({
        pageSize: 10,
        pageIndex: 1,
        extensions: 'all'
      })

      placeSearch.search(keyword.value, (status, result) => {
        searching.value = false

        if (status === 'complete' && result.poiList) {
          results.value = result.poiList.pois || []
          if (results.value.length === 0) {
            searchError.value = '未找到相关地点，请换个关键词'
          }
        } else {
          searchError.value = '搜索失败，请稍后重试'
        }
      })
    })
    .catch(() => {
      searching.value = false
      searchError.value = '地图服务加载失败'
    })
}

const selectPoi = (poi) => {
  selectedPoi.value = poi
  form.value.name = poi.name
  form.value.altitude = ''
  form.value.desc = poi.address || ''
  form.value.tagsStr = ''
}

const confirmAdd = () => {
  if (!selectedPoi.value) return

  const poi = selectedPoi.value
  const location = [poi.location.lng, poi.location.lat]
  const tags = form.value.tagsStr
    ? form.value.tagsStr.split(/[,，]/).map(t => t.trim()).filter(Boolean)
    : []

  addStop({
    name: form.value.name || poi.name,
    location,
    altitude: form.value.altitude || '未知',
    desc: form.value.desc || poi.address || '',
    tips: '',
    tags
  })

  emit('added')

  keyword.value = ''
  results.value = []
  selectedPoi.value = null
  form.value = { name: '', altitude: '', desc: '', tagsStr: '' }
  visible.value = false
}

const clearResults = () => {
  results.value = []
  selectedPoi.value = null
  searchError.value = ''
}
</script>

<style scoped>
.search-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fffaf3;
  overflow-y: auto;
  padding: 22px;
}

.search-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
}

.search-kicker {
  display: inline-flex;
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.search-header h3 {
  margin: 8px 0 0;
  font-size: 1.4rem;
  letter-spacing: -0.04em;
}

.search-close {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: rgba(19, 35, 31, 0.04);
}

.search-close svg {
  width: 18px;
  height: 18px;
}

.search-input-row {
  margin-top: 18px;
}

.search-input-row :deep(.van-search) {
  padding: 0;
  background: transparent;
}

.search-input-row :deep(.van-search__content) {
  background: rgba(19, 35, 31, 0.04);
  border: 1px solid var(--color-border);
}

.search-status,
.search-empty {
  text-align: center;
  padding: 40px 0;
  font-size: 0.84rem;
  color: var(--color-text-secondary);
}

.status-loading {
  color: var(--color-forest);
}

.status-error {
  color: var(--color-danger);
}

.search-results {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(19, 35, 31, 0.04);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.result-item:active {
  background: rgba(19, 35, 31, 0.08);
}

.result-info {
  min-width: 0;
}

.result-name {
  display: block;
  font-size: 0.94rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-addr {
  display: block;
  margin-top: 6px;
  font-size: 0.74rem;
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-arrow {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.search-form {
  margin-top: 14px;
}

.form-divider {
  height: 1px;
  background: var(--color-border);
  margin-bottom: 18px;
}

.form-row {
  margin-bottom: 14px;
}

.form-row label {
  display: block;
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.form-row :deep(.van-cell) {
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(19, 35, 31, 0.04);
  border: 1px solid var(--color-border);
}

.form-row :deep(.van-cell::after) {
  display: none;
}

.add-btn {
  width: 100%;
  min-height: 54px;
  margin-top: 18px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #1f6b5b, #153e36);
  color: #fff7ef;
  font-size: 0.9rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.add-btn svg {
  width: 18px;
  height: 18px;
}
</style>
