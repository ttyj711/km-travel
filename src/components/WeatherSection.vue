<template>
  <div class="weather-section">
    <div class="section-header">
      <h2 class="section-title">实时天气</h2>
      <button class="refresh-btn" :class="{ loading }" @click="handleRefresh" :disabled="loading">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
        </svg>
      </button>
    </div>

    <div class="weather-grid">
      <div
        v-for="city in cityList"
        :key="city"
        class="weather-card"
        @click="showForecast(city)"
      >
        <div class="weather-city">{{ weatherData[city]?.city }}</div>
        <div class="weather-icon" v-html="getWeatherIcon(weatherData[city]?.weather)"></div>
        <div class="weather-temp">
          <span class="temp-value">{{ weatherData[city]?.temp }}</span>
          <span class="temp-unit">°</span>
        </div>
        <div class="weather-range">{{ weatherData[city]?.nightTemp }}° / {{ weatherData[city]?.temp }}°</div>
      </div>
    </div>

    <div class="update-time">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
      {{ updateTime }}
    </div>

    <!-- 预报弹窗 -->
    <van-popup v-model:show="showPopup" position="bottom" round style="height: 45%">
      <div class="forecast-popup">
        <div class="popup-header">
          <h3>{{ selectedCity?.city }} 天气预报</h3>
          <span class="popup-close" @click="showPopup = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </span>
        </div>
        <div class="forecast-list">
          <div v-for="f in selectedCity?.forecast" :key="f.date" class="forecast-item">
            <span class="forecast-date">{{ f.date }}</span>
            <span class="forecast-weather">{{ f.day }}</span>
            <span class="forecast-temps">
              <span class="high">{{ f.high }}°</span>
              <span class="low">{{ f.low }}°</span>
            </span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { weatherData as initialWeatherData, cityList, getWeatherIcon } from '../utils/weather'

const loading = ref(false)
const updateTime = ref('更新中...')
const showPopup = ref(false)
const selectedCity = ref(null)
const weatherData = ref({ ...initialWeatherData })

let refreshInterval = null

const handleRefresh = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))

  cityList.forEach(city => {
    const variance = Math.floor(Math.random() * 3) - 1
    weatherData.value[city].temp += variance
  })

  const now = new Date()
  updateTime.value = now.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

  loading.value = false
}

const showForecast = (city) => {
  selectedCity.value = weatherData.value[city]
  showPopup.value = true
}

onMounted(() => {
  handleRefresh()
  refreshInterval = setInterval(handleRefresh, 5 * 60 * 1000)
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
})
</script>

<style scoped>
.weather-section {
  margin: var(--space-md);
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  padding-bottom: var(--space-sm);
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.refresh-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--color-background);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;
}

.refresh-btn svg {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
}

.refresh-btn:active {
  background: var(--color-surface-alt);
}

.refresh-btn.loading svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xs);
  padding: 0 var(--space-sm);
}

.weather-card {
  padding: var(--space-sm);
  text-align: center;
  border-radius: var(--radius-md);
  transition: background 0.15s ease;
}

.weather-card:active {
  background: var(--color-background);
}

.weather-city {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: var(--space-xs);
}

.weather-icon {
  color: var(--color-cta);
  margin: var(--space-xs) 0;
}

.weather-icon :deep(svg) {
  width: 28px;
  height: 28px;
}

.weather-temp {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.temp-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
}

.temp-unit {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.weather-range {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
}

.update-time {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm);
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.update-time svg {
  width: 12px;
  height: 12px;
}

/* 弹窗 */
.forecast-popup {
  padding: var(--space-lg);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.popup-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
}

.popup-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.popup-close svg {
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
}

.forecast-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.forecast-item {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-background);
  border-radius: var(--radius-md);
}

.forecast-date {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text);
}

.forecast-weather {
  flex: 1;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.forecast-temps {
  display: flex;
  gap: var(--space-sm);
}

.forecast-temps .high {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.forecast-temps .low {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
</style>
