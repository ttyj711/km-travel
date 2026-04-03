<template>
  <section class="map-section surface-card">
    <div class="section-shell">
      <div class="section-header">
        <div>
          <h2 class="section-title">路线地图</h2>
          <p class="section-copy">用地图把站点密度、首尾呼应和当前位置放到同一个画面里。</p>
        </div>
        <button class="locate-btn" :class="{ loading: isLocating }" @click="getCurrentLocation" :disabled="isLocating">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
          </svg>
        </button>
      </div>

      <div class="meta-row">
        <span class="meta-chip">{{ travelData.length }} 个节点</span>
        <span class="meta-chip">自驾主线</span>
        <span class="meta-chip" v-if="currentLocation">已定位</span>
      </div>

      <div class="map-wrapper" @touchstart.stop @touchmove.stop @touchend.stop @click.stop>
        <div id="map-container" ref="mapContainer"></div>

        <transition name="fade">
          <div v-if="locationStatus" class="location-toast" :class="locationStatus.type">
            <span>{{ locationStatus.message }}</span>
          </div>
        </transition>

        <div class="map-legend glass-panel">
          <div class="legend-item">
            <span class="legend-dot start"></span>
            <span>起点</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot end"></span>
            <span>终点</span>
          </div>
          <div class="legend-item">
            <span class="legend-line"></span>
            <span>路线</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineExpose, defineEmits, onMounted, ref } from 'vue'
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
  })
    .then((AMap) => {
      AMapInstance.value = AMap
      map.value = new AMap.Map('map-container', {
        zoom: 6,
        center: [94.5, 30.5],
        mapStyle: 'amap://styles/whitesmoke'
      })

      travelData.forEach((item, index) => {
        const marker = new AMap.Marker({
          position: item.location,
          title: item.name,
          content: `<div style="background:#153e36;color:#fff7ef;padding:6px 12px;border-radius:999px;font-size:12px;white-space:nowrap;font-weight:600;box-shadow:0 12px 22px rgba(21,62,54,.18);border:1px solid rgba(255,255,255,.16);">${item.name}</div>`
        })

        marker.on('click', () => emit('marker-click', index))
        map.value.add(marker)
      })

      const path = travelData.map((item) => item.location)
      const polyline = new AMap.Polyline({
        path,
        strokeColor: '#c56d3b',
        strokeWeight: 5,
        strokeOpacity: 0.9,
        lineJoin: 'round',
        lineCap: 'round'
      })
      map.value.add(polyline)

      const startMarker = new AMap.Marker({
        position: travelData[0].location,
        content: `<div style="background:#3e8f73;color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;border:3px solid #fff7ef;box-shadow:0 10px 18px rgba(62,143,115,.28);">起</div>`
      })
      map.value.add(startMarker)

      const endMarker = new AMap.Marker({
        position: travelData[travelData.length - 1].location,
        content: `<div style="background:#c56d3b;color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;border:3px solid #fff7ef;box-shadow:0 10px 18px rgba(197,109,59,.28);">终</div>`
      })
      map.value.add(endMarker)

      map.value.setFitView()
    })
    .catch(() => {
      if (mapContainer.value) {
        mapContainer.value.innerHTML = `
          <div style="height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:linear-gradient(135deg,#ece4d8,#d7c9b4);color:#153e36;border-radius:24px;">
            <p style="margin:0;font-weight:700;">地图加载中断</p>
            <p style="margin:8px 0 0;font-size:13px;opacity:.72;">请检查网络或高德服务状态</p>
          </div>
        `
      }
    })
}

const getErrorMessage = (code) => {
  const messages = {
    1: '定位权限被拒绝，请检查系统设置',
    2: '当前位置不可用，请稍后重试',
    3: '定位超时，请切换网络后重试'
  }

  return messages[code] || '定位失败，请稍后再试'
}

const getCurrentLocation = () => {
  if (!map.value || !AMapInstance.value) return

  isLocating.value = true
  const AMap = AMapInstance.value

  const createLocationMarker = (position) => {
    if (currentMarker.value) {
      map.value.remove(currentMarker.value)
    }

    currentMarker.value = new AMap.Marker({
      position,
      content: '<div style="width:18px;height:18px;border-radius:50%;background:#1f6b5b;border:4px solid rgba(255,255,255,.94);box-shadow:0 0 0 8px rgba(31,107,91,.18);"></div>',
      offset: new AMap.Pixel(-9, -9)
    })

    map.value.add(currentMarker.value)
  }

  if (!navigator.geolocation) {
    isLocating.value = false
    locationStatus.value = { type: 'error', message: '当前设备不支持定位' }
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const pos = [position.coords.longitude, position.coords.latitude]
      currentLocation.value = pos
      createLocationMarker(pos)
      map.value.setCenter(pos)
      map.value.setZoom(8)
      isLocating.value = false
      locationStatus.value = { type: 'success', message: '当前位置已同步到地图' }
      window.setTimeout(() => {
        locationStatus.value = null
      }, 2200)
    },
    (error) => {
      isLocating.value = false
      locationStatus.value = { type: 'error', message: getErrorMessage(error.code) }
      window.setTimeout(() => {
        locationStatus.value = null
      }, 2600)
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  )
}

onMounted(() => {
  initMap()
})

defineExpose({ getCurrentLocation })
</script>

<style scoped>
.map-section {
  overflow: hidden;
  border-radius: 30px;
}

.section-shell {
  padding: 18px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
}

.section-copy {
  margin: 10px 0 0;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.locate-btn {
  width: 42px;
  height: 42px;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  background: rgba(19, 35, 31, 0.04);
  color: var(--color-forest);
}

.locate-btn svg {
  width: 18px;
  height: 18px;
}

.locate-btn.loading svg {
  animation: spin 1s linear infinite;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(19, 35, 31, 0.05);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.map-wrapper {
  position: relative;
  margin-top: 16px;
}

#map-container {
  width: 100%;
  height: 360px;
  border-radius: 26px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(236, 228, 216, 0.9), rgba(210, 196, 174, 0.7));
}

.map-legend {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  display: flex;
  justify-content: center;
  gap: 14px;
  padding: 10px 14px;
  border-radius: 18px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #fff7ef;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.legend-dot.start {
  background: #3e8f73;
}

.legend-dot.end {
  background: #c56d3b;
}

.legend-line {
  width: 18px;
  height: 3px;
  border-radius: 999px;
  background: #c56d3b;
}

.location-toast {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 180px;
  padding: 10px 16px;
  border-radius: 999px;
  text-align: center;
  font-size: 0.76rem;
  font-weight: 600;
  color: #fff7ef;
  backdrop-filter: blur(10px);
}

.location-toast.success {
  background: rgba(31, 107, 91, 0.92);
}

.location-toast.error {
  background: rgba(168, 77, 58, 0.92);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
