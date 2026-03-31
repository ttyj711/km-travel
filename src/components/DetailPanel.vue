<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    round
    closeable
    :style="{ height: '75%' }"
  >
    <div class="detail-panel" v-if="item">
      <!-- 图片 -->
      <div class="panel-hero">
        <img class="hero-image" :src="item.image" :alt="item.name" />
        <div class="hero-overlay">
          <div class="hero-day">{{ item.day }}</div>
          <div class="hero-altitude">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3"/>
              <path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
              <path d="M3 16h3a2 2 0 0 1 2 2v3"/>
              <path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
            </svg>
            {{ item.altitude }}
          </div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="panel-body">
        <h2 class="panel-title">{{ item.name }}</h2>

        <p class="panel-desc">{{ item.desc }}</p>

        <!-- 标签 -->
        <div class="panel-tags">
          <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <!-- 提示卡片 -->
        <div class="tips-card">
          <div class="tips-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <span>旅行提示</span>
          </div>
          <p class="tips-text">{{ item.tips }}</p>
        </div>

        <!-- 导航按钮 -->
        <button class="nav-btn" @click="openNav">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          打开高德地图导航
        </button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'
import { travelData } from '../data/travelData'

const props = defineProps({
  show: { type: Boolean, default: false },
  index: { type: Number, default: 0 }
})

const emit = defineEmits(['update:show'])

// 使用 computed 实现 v-model
const visible = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const item = computed(() => travelData[props.index])

const navUrl = computed(() => {
  if (!item.value) return '#'
  const { name, location } = item.value
  return `androidamap://navi?sourceApplication=kmTravel&poiname=${encodeURIComponent(name)}&lat=${location[1]}&lon=${location[0]}&dev=0&style=2`
})

const openNav = () => {
  window.location.href = navUrl.value
}
</script>

<style scoped>
.detail-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Hero 图片 */
.panel-hero {
  position: relative;
  flex-shrink: 0;
}

.hero-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, transparent 30%, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--space-md);
}

.hero-day {
  background: var(--color-cta);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
}

.hero-altitude {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  color: var(--color-primary-dark);
  font-size: 0.8rem;
  font-weight: 600;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-md);
}

.hero-altitude svg {
  width: 14px;
  height: 14px;
}

/* 内容 */
.panel-body {
  flex: 1;
  padding: var(--space-lg);
  overflow-y: auto;
}

.panel-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-md);
}

.panel-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-lg);
}

.panel-tags {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-lg);
}

.tag {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-primary);
  background: rgba(14, 165, 233, 0.1);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-md);
}

/* 提示卡片 */
.tips-card {
  background: linear-gradient(135deg, var(--color-background) 0%, rgba(14, 165, 233, 0.05) 100%);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
}

.tips-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

.tips-header svg {
  width: 18px;
  height: 18px;
}

.tips-text {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* 导航按钮 */
.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  padding: var(--space-md);
  background: var(--color-cta);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.nav-btn:active {
  background: var(--color-cta-dark);
  transform: scale(0.98);
}
</style>
