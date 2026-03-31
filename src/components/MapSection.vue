<template>
  <div class="map-section">
    <div class="section-header">
      <h2 class="section-title">路线地图</h2>
      <div class="header-actions">
        <span class="node-count">{{ travelData.length }} 个节点</span>
        <button class="locate-btn" :class="{ loading: isLocating }" @click="getCurrentLocation" :disabled="isLocating">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="map-wrapper" @touchstart.stop @touchmove.stop @touchend.stop @click.stop>
      <div id="map-container" ref="mapContainer"></div>

      <!-- 定位状态提示 -->
      <transition name="fade">
        <div v-if="locationStatus" class="location-toast" :class="locationStatus.type">
          <svg v-if="locationStatus.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <span>{{ locationStatus.message }}</span>
        </div>
      </transition>

      <!-- 图例 -->
      <div class="map-legend">
        <div class="legend-item">
          <span class="legend-dot start"></span>
          <span>起点</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot end"></span>
          <span>终点</span>
        </div>
        <div class="legend-item" v-if="currentLocation">
          <span class="legend-dot current"></span>
          <span>当前位置</span>
        </div>
        <div class="legend-item">
          <span class="legend-line"></span>
          <span>路线</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { travelData } from '../data/travelData'

const mapContainer = ref(null)
const map = ref(null)
const AMapInstance = ref(null)
const isLocating = ref(false)
const currentLocation = ref(null)
const currentMarker = ref(null)
const locationStatus = ref(null)

const emit = defineEmits(['marker-click'])

const initMap = () => {
  AMapLoader.load({
    key: '07d7cb65523c11741b7652adb393132b',
    version: '2.0',
    plugins: ['AMap.Geolocation']
  }).then((AMap) => {
    AMapInstance.value = AMap
    map.value = new AMap.Map('map-container', {
      zoom: 6,
      center: [94.5, 30.5],
      mapStyle: 'amap://styles/whitesmoke'
    })

    // 添加标记点
    travelData.forEach((item, index) => {
      const marker = new AMap.Marker({
        position: item.location,
        title: item.name,
        content: `<div style="background: #F97316; color: white; padding: 4px 10px; border-radius: 6px; font-size: 12px; white-space: nowrap; font-weight: 500; box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);">${item.name}</div>`
      })

      marker.on('click', () => {
        emit('marker-click', index)
      })
      map.value.add(marker)
    })

    // 绘制路线
    const path = travelData.map(item => item.location)
    const polyline = new AMap.Polyline({
      path: path,
      strokeColor: '#0EA5E9',
      strokeWeight: 4,
      strokeOpacity: 0.8,
      lineJoin: 'round',
      lineCap: 'round'
    })
    map.value.add(polyline)

    // 起点标记
    const startMarker = new AMap.Marker({
      position: travelData[0].location,
      content: `<div style="background: #22C55E; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 3px solid white; box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);">起</div>`
    })
    map.value.add(startMarker)

    // 终点标记
    const endMarker = new AMap.Marker({
      position: travelData[travelData.length - 1].location,
      content: `<div style="background: #EF4444; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 3px solid white; box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);">终</div>`
    })
    map.value.add(endMarker)

    map.value.setFitView()
  }).catch(() => {
    if (mapContainer.value) {
      mapContainer.value.innerHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%); color: white; border-radius: 16px;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 12px; opacity: 0.8;">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <p style="font-weight: 500;">地图加载中...</p>
          <p style="font-size: 0.8rem; opacity: 0.8; margin-top: 4px;">请检查网络连接</p>
        </div>
      `
    }
  })
}

// 获取当前位置
const getCurrentLocation = () => {
  if (!map.value || !AMapInstance.value) return

  isLocating.value = true

  const AMap = AMapInstance.value

  // 创建定位标记
  const createLocationMarker = (position) => {
    // 移除旧标记
    if (currentMarker.value) {
      map.value.remove(currentMarker.value)
    }

    // 创建当前位置标记（蓝色脉冲点）
    const markerContent = `
      <div class="location-marker">
        <div class="location-pulse"></div>
        <div class="location-dot"></div>
      </div>
    `

    currentMarker.value = new AMap.Marker({
      position: position,
      content: markerContent,
      offset: new AMap.Pixel(-12, -12)
    })

    map.value.add(currentMarker.value)
  }

  // 使用浏览器定位
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const pos = [longitude, latitude]

        currentLocation.value = pos
        createLocationMarker(pos)

        // 移动地图中心到当前位置
        map.value.setCenter(pos)
        map.value.setZoom(8)

        isLocating.value = false
        locationStatus.value = { type: 'success', message: '定位成功' }

        setTimeout(() => {
          locationStatus.value = null
        }, 2000)
      },
      (error) => {
        console.error('定位失败:', error)
        isLocating.value = false
        locationStatus.value = { type: 'error', message: getErrorMessage(error.code) }

        setTimeout(() => {
          locationStatus.value = null
        }, 3000)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  } else {
    isLocating.value = false
    locationStatus.value = { type: 'error', message: '您的设备不支持定位功能' }

    setTimeout(() => {
      locationStatus.value = null
    }, 3000)
  }
}

// 获取错误信息
const getErrorMessage = (code) => {
  const messages = {
    1: '定位权限被拒绝，请在设置中开启',
    2: '无法获取位置信息，请检查网络',
    3: '定位超时，请重试'
  }
  return messages[code] || '定位失败，请重试'
}

const setCenter = (location) => {
  if (map.value) {
    map.value.setCenter(location)
    map.value.setZoom(10)
  }
}

onMounted(() => {
  initMap()
})

defineExpose({ setCenter, getCurrentLocation })
</script>

<style scoped>
.map-section {
  margin: var(--space-md);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.node-count {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  background: var(--color-background);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-md);
}

.locate-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}

.locate-btn svg {
  width: 18px;
  height: 18px;
  color: white;
}

.locate-btn:active {
  transform: scale(0.95);
}

.locate-btn.loading svg {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.map-wrapper {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  position: relative;
}

#map-container {
  width: 100%;
  height: 240px;
}

/* 定位状态提示 */
.location-toast {
  position: absolute;
  top: var(--space-sm);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 10;
  box-shadow: var(--shadow-md);
}

.location-toast svg {
  width: 14px;
  height: 14px;
}

.location-toast.success {
  background: rgba(34, 197, 94, 0.95);
  color: white;
}

.location-toast.error {
  background: rgba(239, 68, 68, 0.95);
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}

/* 图例 */
.map-legend {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  padding: var(--space-sm);
  background: var(--color-background);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.7rem;
  color: var(--color-text-secondary);
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
}

.legend-dot.start {
  background: var(--color-success);
}

.legend-dot.end {
  background: var(--color-error);
}

.legend-dot.current {
  background: #3B82F6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.legend-line {
  width: 16px;
  height: 3px;
  background: var(--color-primary);
  border-radius: 2px;
}
</style>

<style>
/* 当前位置标记样式 - 全局样式 */
.location-marker {
  position: relative;
  width: 24px;
  height: 24px;
}

.location-pulse {
  position: absolute;
  inset: 0;
  background: rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: locationPulse 2s ease-out infinite;
}

.location-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #3B82F6;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
}

@keyframes locationPulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
