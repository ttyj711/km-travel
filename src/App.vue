<template>
  <div class="app-shell">
    <div class="ambient ambient-north"></div>
    <div class="ambient ambient-south"></div>

    <div class="app-frame">
      <header class="app-header">
        <div class="brand-row">
          <div class="brand-copy">
            <span class="brand-kicker">KM TRAVEL DOSSIER</span>
            <h1>滇藏青环线</h1>
            <p>把自驾路线、海拔提醒和落脚节点组织成一套更有节奏的旅行界面。</p>
          </div>
          <div class="brand-badge">
            <span class="badge-value">{{ travelData.length }}</span>
            <span class="badge-label">站点</span>
          </div>
        </div>

        <div class="tab-rail">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            class="tab-pill"
            :class="{ active: activeTab === index }"
            @click="switchTab(index)"
          >
            <span class="tab-icon" v-html="tab.icon"></span>
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <div class="tab-context">
          <span class="context-title">{{ activeTabMeta.title }}</span>
          <span class="context-copy">{{ activeTabMeta.copy }}</span>
        </div>
      </header>

      <main
        ref="swiperRef"
        class="swiper-container"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @touchcancel="handleTouchCancel"
      >
        <div
          class="swiper-wrapper"
          :style="{
            transform: `translateX(${-activeTab * 100}%)`,
            transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
          }"
        >
          <section class="swiper-slide" data-tab="overview">
            <div class="slide-content">
              <HeaderCard />
              <QuickInfo />
              <MapSection ref="mapRef" @marker-click="handleMarkerClick" />
            </div>
          </section>

          <section class="swiper-slide" data-tab="journey">
            <div class="slide-content">
              <article class="section-hero section-hero-journey">
                <div>
                  <span class="section-kicker">Route Sequence</span>
                  <h2>按路书阅读整段旅程</h2>
                  <p>把节点看成一串连续的场景，而不是同质化卡片。每一站都突出海拔、节奏和记忆点。</p>
                </div>
                <div class="section-pill-group">
                  <span>高原穿越</span>
                  <span>秘境密度高</span>
                  <span>建议慢行</span>
                </div>
              </article>

              <TravelCard @select="handleSelect" />
            </div>
          </section>

          <section class="swiper-slide" data-tab="info">
            <div class="slide-content">
              <article class="section-hero section-hero-info">
                <div>
                  <span class="section-kicker">Field Notes</span>
                  <h2>把天气、补给与攻略整合成行前情报</h2>
                  <p>减少信息分散带来的切换成本，保留真正影响出发决策的内容。</p>
                </div>
              </article>

              <WeatherSection />
              <TipsSection />
              <XiaohongshuSection />
            </div>
          </section>
        </div>

        <div class="progress-rail" aria-hidden="true">
          <span
            v-for="(tab, index) in tabs"
            :key="tab.id"
            class="progress-dot"
            :class="{ active: activeTab === index }"
          ></span>
        </div>
      </main>

      <DetailPanel v-model:show="showDetail" :index="selectedIndex" />

      <footer class="app-footer">
        <button class="footer-btn" :class="{ active: activeTab === 0 }" @click="switchTab(0)">
          <span class="footer-icon" v-html="tabs[0].icon"></span>
          <span>概览</span>
        </button>
        <button class="footer-btn" @click="handleLocate">
          <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
          </svg>
          <span>定位</span>
        </button>
        <button class="footer-btn footer-btn-primary" @click="openAMap">
          <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>高德导航</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import HeaderCard from './components/HeaderCard.vue'
import QuickInfo from './components/QuickInfo.vue'
import MapSection from './components/MapSection.vue'
import WeatherSection from './components/WeatherSection.vue'
import TravelCard from './components/TravelCard.vue'
import TipsSection from './components/TipsSection.vue'
import DetailPanel from './components/DetailPanel.vue'
import XiaohongshuSection from './components/XiaohongshuSection.vue'
import { travelData } from './data/travelData'

const tabs = [
  {
    id: 'overview',
    label: '概览',
    title: '整体路线与当前位置',
    copy: '先看全局，再决定从哪里切入行程。',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 7.5 9 4l6 3.5L21 4v12.5L15 20l-6-3.5L3 20Z"/>
      <path d="M9 4v12.5M15 7.5V20"/>
    </svg>`
  },
  {
    id: 'journey',
    label: '行程',
    title: '按站点读路书',
    copy: '每张卡片只保留最关键的信息和进入详情的意图。',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M8 6h13M8 12h13M8 18h13"/>
      <circle cx="4" cy="6" r="1.5"/>
      <circle cx="4" cy="12" r="1.5"/>
      <circle cx="4" cy="18" r="1.5"/>
    </svg>`
  },
  {
    id: 'info',
    label: '信息',
    title: '天气、准备与外部攻略',
    copy: '把行前检查和临近决策放在同一个信息层里。',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 8v4l2.5 2.5"/>
    </svg>`
  }
]

const activeTab = ref(0)
const swiperRef = ref(null)
const mapRef = ref(null)
const showDetail = ref(false)
const selectedIndex = ref(0)
const isDragging = ref(false)

let touchStartX = 0
let touchStartY = 0

const activeTabMeta = computed(() => tabs[activeTab.value])

const handleTouchStart = (event) => {
  touchStartX = event.touches[0].clientX
  touchStartY = event.touches[0].clientY
  isDragging.value = true
}

const handleTouchMove = (event) => {
  if (!isDragging.value) return

  const diffX = touchStartX - event.touches[0].clientX
  const diffY = touchStartY - event.touches[0].clientY

  if (Math.abs(diffX) > Math.abs(diffY)) {
    event.preventDefault()
  }
}

const handleTouchEnd = (event) => {
  if (!isDragging.value) return

  const diffX = touchStartX - event.changedTouches[0].clientX
  const diffY = touchStartY - event.changedTouches[0].clientY
  const threshold = 60

  if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0 && activeTab.value < tabs.length - 1) {
      activeTab.value += 1
    } else if (diffX < 0 && activeTab.value > 0) {
      activeTab.value -= 1
    }
  }

  isDragging.value = false
}

const handleTouchCancel = () => {
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
  activeTab.value = 0

  if (mapRef.value?.getCurrentLocation) {
    mapRef.value.getCurrentLocation()
  }
}

const openAMap = () => {
  const amapUrl =
    'amapuri://workInAmap/createWithToken?polymericId=mcp_6a6456df9c80433d8e178e97d93fecf9&from=MCP'

  window.location.href = amapUrl
}
</script>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(215, 166, 66, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(31, 107, 91, 0.18), transparent 30%),
    linear-gradient(180deg, #f6f0e6 0%, #ece5da 100%);
}

.ambient {
  position: absolute;
  pointer-events: none;
  filter: blur(12px);
  opacity: 0.9;
}

.ambient-north {
  top: -80px;
  right: -40px;
  width: 220px;
  height: 220px;
  border-radius: 36% 64% 58% 42%;
  background: rgba(31, 107, 91, 0.16);
}

.ambient-south {
  left: -60px;
  bottom: 100px;
  width: 200px;
  height: 200px;
  border-radius: 59% 41% 33% 67%;
  background: rgba(197, 109, 59, 0.12);
}

.app-frame {
  position: relative;
  z-index: 1;
  max-width: 520px;
  margin: 0 auto;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  padding: 18px 18px 14px;
  backdrop-filter: blur(16px);
  background: linear-gradient(180deg, rgba(246, 240, 230, 0.94), rgba(246, 240, 230, 0.78));
  border-bottom: 1px solid rgba(20, 35, 31, 0.06);
}

.brand-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: start;
  margin-bottom: 16px;
}

.brand-kicker {
  display: inline-flex;
  margin-bottom: 8px;
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.brand-copy h1 {
  margin: 0;
  font-size: 1.7rem;
  line-height: 1;
  letter-spacing: -0.05em;
}

.brand-copy p {
  margin: 8px 0 0;
  max-width: 34ch;
  color: var(--color-text-secondary);
  font-size: 0.83rem;
  line-height: 1.55;
}

.brand-badge {
  min-width: 72px;
  padding: 12px 10px;
  border-radius: 22px;
  background: rgba(255, 251, 246, 0.85);
  border: 1px solid rgba(20, 35, 31, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
  text-align: center;
}

.badge-value {
  display: block;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--color-forest-deep);
  line-height: 1;
}

.badge-label {
  display: block;
  margin-top: 4px;
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.tab-rail {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px;
  background: rgba(20, 35, 31, 0.045);
  border-radius: 24px;
  border: 1px solid rgba(20, 35, 31, 0.06);
}

.tab-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 10px;
  border: none;
  border-radius: 18px;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.84rem;
  font-weight: 600;
  transition: transform var(--transition-fast), background var(--transition-fast), color var(--transition-fast);
}

.tab-pill.active {
  background: linear-gradient(135deg, rgba(31, 107, 91, 0.96), rgba(21, 62, 54, 0.96));
  color: #f8f4ed;
  box-shadow: 0 14px 28px rgba(21, 62, 54, 0.18);
}

.tab-pill:active {
  transform: scale(0.98);
}

.tab-icon :deep(svg) {
  width: 16px;
  height: 16px;
}

.tab-context {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 14px;
  font-size: 0.76rem;
}

.context-title {
  color: var(--color-text);
  font-weight: 600;
}

.context-copy {
  flex: 1;
  text-align: right;
  color: var(--color-text-secondary);
}

.swiper-container {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.swiper-wrapper {
  display: flex;
  height: 100%;
  will-change: transform;
}

.swiper-slide {
  flex: 0 0 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 10px 18px 110px;
}

.slide-content {
  display: grid;
  gap: 18px;
}

.section-hero {
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  padding: 22px;
  border: 1px solid rgba(20, 35, 31, 0.08);
  box-shadow: var(--shadow-lg);
}

.section-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.24), transparent 42%),
    radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.28), transparent 35%);
  pointer-events: none;
}

.section-hero-journey {
  background: linear-gradient(135deg, rgba(31, 107, 91, 0.94), rgba(18, 58, 52, 0.92));
  color: #f8f4ed;
}

.section-hero-info {
  background: linear-gradient(135deg, rgba(245, 235, 218, 0.92), rgba(232, 219, 200, 0.86));
}

.section-kicker {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.82;
}

.section-hero h2 {
  margin: 0;
  font-size: 1.45rem;
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.section-hero p {
  margin: 10px 0 0;
  font-size: 0.88rem;
  line-height: 1.65;
  color: inherit;
  opacity: 0.82;
}

.section-pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.section-pill-group span {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 0.72rem;
}

.progress-rail {
  position: absolute;
  left: 50%;
  bottom: 88px;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 251, 246, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(20, 35, 31, 0.06);
  z-index: 8;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(20, 35, 31, 0.16);
  transition: width var(--transition-fast), background var(--transition-fast);
}

.progress-dot.active {
  width: 26px;
  background: var(--color-forest);
}

.app-footer {
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 50;
  width: min(520px, 100%);
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: 1fr 1fr 1.45fr;
  gap: 10px;
  padding: 12px 18px calc(12px + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, rgba(246, 240, 230, 0), rgba(246, 240, 230, 0.96) 26%);
}

.footer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 54px;
  border: 1px solid rgba(20, 35, 31, 0.08);
  border-radius: 18px;
  background: rgba(255, 251, 246, 0.92);
  color: var(--color-text);
  font-size: 0.82rem;
  font-weight: 600;
  box-shadow: 0 8px 22px rgba(60, 48, 34, 0.08);
  transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.footer-btn.active {
  border-color: rgba(31, 107, 91, 0.22);
  background: rgba(31, 107, 91, 0.08);
  color: var(--color-forest-deep);
}

.footer-btn:active {
  transform: scale(0.98);
}

.footer-btn-primary {
  background: linear-gradient(135deg, #c56d3b, #a8542a);
  color: #fff8f2;
  border-color: transparent;
}

.footer-icon,
.footer-icon :deep(svg),
.footer-btn svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 380px) {
  .app-header,
  .swiper-slide,
  .app-footer {
    padding-left: 14px;
    padding-right: 14px;
  }

  .brand-copy h1 {
    font-size: 1.5rem;
  }

  .tab-pill {
    padding-inline: 8px;
    font-size: 0.78rem;
  }

  .context-copy {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tab-pill,
  .footer-btn,
  .progress-dot,
  .swiper-wrapper {
    transition: none !important;
  }
}
</style>
