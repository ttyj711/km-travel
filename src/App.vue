<template>
  <div class="app">
    <!-- 顶部标签导航 -->
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">滇藏青环线</h1>
        <div class="tab-segment">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            class="segment-btn"
            :class="{ active: activeTab === index }"
            @click="switchTab(index)"
          >
            <span class="segment-icon" v-html="tab.icon"></span>
            <span class="segment-label">{{ tab.label }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- 滑动容器 -->
    <div
      ref="swiperRef"
      class="swiper-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div
        class="swiper-wrapper"
        :style="{
          transform: `translateX(${-activeTab * 100}%)`,
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
        }"
      >
        <!-- 概览页 -->
        <div class="swiper-slide" data-tab="0">
          <div class="slide-content">
            <HeaderCard />
            <QuickInfo />
            <MapSection ref="mapRef" @marker-click="handleMarkerClick" />
          </div>
        </div>

        <!-- 行程页 -->
        <div class="swiper-slide" data-tab="1">
          <div class="slide-content">
            <TravelCard @select="handleSelect" />
          </div>
        </div>

        <!-- 信息页 -->
        <div class="swiper-slide" data-tab="2">
          <div class="slide-content">
            <WeatherSection />
            <TipsSection />
          </div>
        </div>
      </div>

      <!-- 页面指示器 -->
      <div class="page-indicator">
        <span
          v-for="(tab, index) in tabs"
          :key="tab.id"
          class="indicator-dot"
          :class="{ active: activeTab === index }"
        ></span>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <DetailPanel v-model:show="showDetail" :index="selectedIndex" />

    <!-- 底部操作栏 -->
    <footer class="app-footer">
      <button class="footer-btn" @click="switchTab(0)">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
          <line x1="9" y1="3" x2="9" y2="18"/>
          <line x1="15" y1="6" x2="15" y2="21"/>
        </svg>
        <span>地图</span>
      </button>
      <button class="footer-btn" @click="handleLocate">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
        </svg>
        <span>定位</span>
      </button>
      <button class="footer-btn primary" @click="openAMap">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>高德导航</span>
      </button>
    </footer>

    <!-- 回到顶部 -->
    <van-back-top />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import HeaderCard from './components/HeaderCard.vue'
import QuickInfo from './components/QuickInfo.vue'
import MapSection from './components/MapSection.vue'
import WeatherSection from './components/WeatherSection.vue'
import TravelCard from './components/TravelCard.vue'
import TipsSection from './components/TipsSection.vue'
import DetailPanel from './components/DetailPanel.vue'

const tabs = [
  {
    id: 'overview',
    label: '概览',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>`
  },
  {
    id: 'journey',
    label: '行程',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>`
  },
  {
    id: 'info',
    label: '信息',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>`
  }
]

const activeTab = ref(0)
const swiperRef = ref(null)
const mapRef = ref(null)
const showDetail = ref(false)
const selectedIndex = ref(0)
const isDragging = ref(false)

// 触摸滑动 - 优化版
let touchStartX = 0
let touchStartY = 0
let currentTranslate = 0

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  isDragging.value = true
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return

  const currentX = e.touches[0].clientX
  const currentY = e.touches[0].clientY
  const diffX = touchStartX - currentX
  const diffY = touchStartY - currentY

  // 如果垂直滑动大于水平滑动，不处理
  if (Math.abs(diffY) > Math.abs(diffX)) {
    return
  }

  // 防止页面整体滚动
  e.preventDefault()
}

const handleTouchEnd = (e) => {
  if (!isDragging.value) return

  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY
  const diffX = touchStartX - touchEndX
  const diffY = touchStartY - touchEndY
  const threshold = 60

  // 只有水平滑动距离大于阈值且大于垂直滑动时才切换页面
  if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0 && activeTab.value < tabs.length - 1) {
      // 左滑 -> 下一页
      activeTab.value++
    } else if (diffX < 0 && activeTab.value > 0) {
      // 右滑 -> 上一页
      activeTab.value--
    }
  }

  isDragging.value = false
}

const switchTab = (index) => {
  activeTab.value = index
}

const handleSelect = (index) => {
  selectedIndex.value = index
  showDetail.value = true
}

const handleMarkerClick = (index) => {
  selectedIndex.value = index
  nextTick(() => {
    showDetail.value = true
  })
}

const handleLocate = () => {
  // 先切换到概览页（地图页）
  switchTab(0)
  // 调用地图组件的定位方法
  if (mapRef.value && mapRef.value.getCurrentLocation) {
    mapRef.value.getCurrentLocation()
  }
}

const openAMap = () => {
  const amapUrl = 'amapuri://workInAmap/createWithToken?polymericId=mcp_6a6456df9c80433d8e178e97d93fecf9&from=MCP'
  window.location.href = amapUrl
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh; /* 动态视口高度 */
  background: var(--color-background);
  overflow: hidden;
}

/* ========== 顶部导航 ========== */
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.header-content {
  padding: var(--space-sm) var(--space-md);
}

.app-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-sm);
  letter-spacing: 0.5px;
}

/* 分段式导航 */
.tab-segment {
  display: flex;
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: 4px;
  gap: 4px;
}

.segment-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.segment-btn .icon {
  width: 16px;
  height: 16px;
}

.segment-btn.active {
  background: var(--color-surface);
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.segment-btn:not(.active):active {
  background: rgba(0, 0, 0, 0.05);
}

/* ========== 滑动容器 ========== */
.swiper-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.swiper-wrapper {
  display: flex;
  height: 100%;
  will-change: transform;
}

.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.slide-content {
  padding-bottom: 80px;
}

.slide-content > * {
  margin-bottom: var(--space-md);
}

.slide-content > *:first-child {
  margin-top: 0;
}

.slide-content > *:last-child {
  margin-bottom: 0;
}

/* 页面指示器 */
.page-indicator {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-sm);
  z-index: 10;
}

.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-muted);
  opacity: 0.4;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  width: 20px;
  border-radius: 3px;
  background: var(--color-primary);
  opacity: 1;
}

/* ========== 底部操作栏 ========== */
.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  padding-bottom: calc(var(--space-sm) + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 100;
}

.footer-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  background: var(--color-background);
  color: var(--color-text);
}

.footer-btn .icon {
  width: 20px;
  height: 20px;
}

.footer-btn:active {
  transform: scale(0.97);
}

.footer-btn.primary {
  flex: 2;
  background: var(--color-cta);
  color: white;
  font-weight: 600;
}

.footer-btn.primary:active {
  background: var(--color-cta-dark);
}

/* ========== 微交互动画 ========== */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* 无障碍：减少动效 */
@media (prefers-reduced-motion: reduce) {
  .swiper-wrapper {
    transition: none !important;
  }

  .segment-btn,
  .footer-btn,
  .indicator-dot {
    transition: none !important;
  }
}
</style>
