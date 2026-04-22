<template>
  <section class="route-editor surface-card">
    <div class="editor-shell">
      <div class="editor-header">
        <div>
          <h2 class="section-title">自定义路线</h2>
          <p class="editor-copy">增删站点、调整顺序，地图和行程自动同步。</p>
        </div>
        <div class="editor-actions">
          <button class="action-btn" @click="showSearch = true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
          <button class="action-btn" @click="handleReset" :disabled="isDefault">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="stop-list">
        <van-swipe-cell v-for="(stop, index) in stops" :key="stop.id">
          <div class="stop-item" :class="{ dragging: dragIndex === index }">
            <div class="stop-handle" @touchstart.passive="startDrag(index, $event)" @mousedown="startDrag(index, $event)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="6" r="1.5"/>
                <circle cx="15" cy="6" r="1.5"/>
                <circle cx="9" cy="12" r="1.5"/>
                <circle cx="15" cy="12" r="1.5"/>
                <circle cx="9" cy="18" r="1.5"/>
                <circle cx="15" cy="18" r="1.5"/>
              </svg>
            </div>

            <div class="stop-content">
              <span class="stop-seq">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="stop-detail">
                <strong>{{ stop.name }}</strong>
                <span class="stop-altitude">{{ stop.altitude }}</span>
              </div>
            </div>

            <div class="stop-arrows">
              <button class="arrow-btn" :disabled="index === 0" @click="moveUp(index)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 15l-6-6-6 6"/>
                </svg>
              </button>
              <button class="arrow-btn" :disabled="index === stops.length - 1" @click="moveDown(index)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </div>
          </div>

          <template #right>
            <van-button square type="danger" text="删除" class="delete-btn" @click="handleRemove(index)" />
          </template>
        </van-swipe-cell>
      </div>

      <button class="add-stop-btn" @click="showSearch = true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        添加站点
      </button>
    </div>

    <SearchPanel v-model:show="showSearch" @added="onStopAdded" />
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { travelData as defaultData } from '../data/travelData'
import SearchPanel from './SearchPanel.vue'

const { stops, removeStop, moveUp, moveDown, resetStops } = inject('travelStore')

const showSearch = ref(false)
const dragIndex = ref(-1)

const isDefault = computed(() => {
  if (stops.value.length !== defaultData.length) return false
  return stops.value.every((stop, i) => stop.id === defaultData[i].id)
})

const handleRemove = (index) => {
  removeStop(index)
}

const handleReset = () => {
  resetStops()
}

const onStopAdded = () => {
}

const startDrag = (index, event) => {
  dragIndex.value = index
}
</script>

<style scoped>
.route-editor {
  overflow: hidden;
  border-radius: 30px;
}

.editor-shell {
  padding: 18px;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
}

.editor-copy {
  margin: 10px 0 0;
  max-width: 30ch;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.editor-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 42px;
  height: 42px;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  background: rgba(19, 35, 31, 0.04);
  color: var(--color-forest);
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:disabled {
  opacity: 0.4;
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.stop-list {
  display: grid;
  gap: 8px;
  margin-top: 16px;
}

.stop-list :deep(.van-swipe-cell) {
  border-radius: 18px;
  overflow: hidden;
}

.stop-list :deep(.van-swipe-cell__content) {
  background: transparent;
}

.stop-item {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 18px;
  background: rgba(19, 35, 31, 0.04);
  transition: background var(--transition-fast);
}

.stop-item.dragging {
  background: rgba(31, 107, 91, 0.1);
  box-shadow: 0 4px 12px rgba(31, 107, 91, 0.12);
}

.stop-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  cursor: grab;
  touch-action: none;
}

.stop-handle svg {
  width: 16px;
  height: 16px;
}

.stop-content {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.stop-seq {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: rgba(19, 35, 31, 0.08);
  font-size: 0.76rem;
  font-weight: 800;
  flex-shrink: 0;
}

.stop-detail {
  min-width: 0;
}

.stop-detail strong {
  display: block;
  font-size: 0.88rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stop-altitude {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.stop-arrows {
  display: grid;
  gap: 2px;
}

.arrow-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: rgba(19, 35, 31, 0.06);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-btn:disabled {
  opacity: 0.3;
}

.arrow-btn:active:not(:disabled) {
  background: rgba(31, 107, 91, 0.14);
  color: var(--color-forest);
}

.arrow-btn svg {
  width: 14px;
  height: 14px;
}

.delete-btn {
  height: 100%;
}

.add-stop-btn {
  width: 100%;
  min-height: 50px;
  margin-top: 14px;
  border: 2px dashed rgba(19, 35, 31, 0.12);
  border-radius: 18px;
  background: transparent;
  color: var(--color-forest);
  font-size: 0.86rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background var(--transition-fast), border-color var(--transition-fast);
}

.add-stop-btn:active {
  background: rgba(31, 107, 91, 0.06);
  border-color: var(--color-forest);
}

.add-stop-btn svg {
  width: 18px;
  height: 18px;
}
</style>
