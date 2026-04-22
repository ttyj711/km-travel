<template>
  <section class="weather-section surface-card">
    <div class="weather-shell">
      <div class="weather-intro">
        <div>
          <h2 class="section-title">高原天气</h2>
          <p>这条线路最重要的不是绝对温度，而是昼夜温差和连续补给的体感变化。</p>
        </div>
        <button class="refresh-btn" :class="{ loading }" @click="handleRefresh" :disabled="loading">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
          </svg>
        </button>
      </div>

      <div class="spotlight-card">
        <span class="spotlight-label">体感重点</span>
        <strong>清晨和夜间温差明显</strong>
        <p>保暖层和防晒都要准备，不要被白天阳光误导。</p>
      </div>

      <div class="weather-grid">
        <button v-for="city in cityList" :key="city" class="weather-card" @click="showForecast(city)">
          <span class="weather-city">{{ weatherData[city]?.city }}</span>
          <span class="weather-icon" v-html="getWeatherIcon(weatherData[city]?.weather)"></span>
          <strong class="weather-temp">{{ weatherData[city]?.temp }}°</strong>
          <span class="weather-range">夜间 {{ weatherData[city]?.nightTemp }}°</span>
        </button>
      </div>

      <div class="update-time">{{ updateTime }}</div>
    </div>

    <van-popup v-model:show="showPopup" position="bottom" round :style="{ minHeight: '46%' }">
      <div class="forecast-popup">
        <div class="popup-header">
          <div>
            <span class="popup-kicker">3 Day Forecast</span>
            <h3>{{ selectedCity?.city }}</h3>
          </div>
          <button class="popup-close" @click="showPopup = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="forecast-list">
          <article v-for="forecast in selectedCity?.forecast" :key="forecast.date" class="forecast-item">
            <div>
              <span class="forecast-date">{{ forecast.date }}</span>
              <strong>{{ forecast.day }}</strong>
            </div>
            <span class="forecast-temp-range">{{ forecast.high }}° / {{ forecast.low }}°</span>
          </article>
        </div>
      </div>
    </van-popup>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { cityList, getWeatherIcon, weatherData as initialWeatherData } from '../utils/weather'

const loading = ref(false)
const updateTime = ref('刚刚更新')
const showPopup = ref(false)
const selectedCity = ref(null)
const weatherData = ref({ ...initialWeatherData })

let refreshInterval = null

const handleRefresh = async () => {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 700))

  cityList.forEach((city) => {
    const variance = Math.floor(Math.random() * 3) - 1
    weatherData.value[city].temp += variance
  })

  updateTime.value = new Date().toLocaleString('zh-CN', {
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
  overflow: hidden;
  border-radius: 30px;
}

.weather-shell {
  padding: 18px;
}

.weather-intro {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
}

.weather-intro p {
  margin: 10px 0 0;
  max-width: 32ch;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.refresh-btn {
  width: 42px;
  height: 42px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: rgba(19, 35, 31, 0.04);
  color: var(--color-forest);
}

.refresh-btn svg {
  width: 18px;
  height: 18px;
}

.refresh-btn.loading svg {
  animation: spin 1s linear infinite;
}

.spotlight-card {
  margin-top: 16px;
  padding: 18px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(21, 62, 54, 0.96), rgba(31, 107, 91, 0.82));
  color: #fff7ef;
}

.spotlight-label {
  display: inline-flex;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 247, 239, 0.72);
}

.spotlight-card strong {
  display: block;
  margin-top: 10px;
  font-size: 1.2rem;
  line-height: 1.1;
}

.spotlight-card p {
  margin: 8px 0 0;
  font-size: 0.82rem;
  line-height: 1.6;
  color: rgba(255, 247, 239, 0.82);
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.weather-card {
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 22px;
  background: rgba(255, 250, 244, 0.72);
  text-align: left;
}

.weather-city {
  display: block;
  font-size: 0.76rem;
  color: var(--color-text-muted);
}

.weather-icon {
  display: inline-flex;
  margin-top: 10px;
  color: var(--color-clay);
}

.weather-icon :deep(svg) {
  width: 28px;
  height: 28px;
}

.weather-temp {
  display: block;
  margin-top: 14px;
  font-size: 1.4rem;
  line-height: 1;
  letter-spacing: -0.04em;
}

.weather-range {
  display: block;
  margin-top: 8px;
  font-size: 0.74rem;
  color: var(--color-text-secondary);
}

.update-time {
  margin-top: 14px;
  text-align: right;
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.forecast-popup {
  padding: 22px;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
}

.popup-kicker {
  display: inline-flex;
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.popup-header h3 {
  margin: 8px 0 0;
  font-size: 1.4rem;
  letter-spacing: -0.04em;
}

.popup-close {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: rgba(19, 35, 31, 0.04);
}

.popup-close svg {
  width: 18px;
  height: 18px;
}

.forecast-list {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.forecast-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 16px;
  border-radius: 20px;
  background: rgba(19, 35, 31, 0.04);
}

.forecast-date {
  display: block;
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.forecast-item strong {
  display: block;
  margin-top: 6px;
  font-size: 1rem;
}

.forecast-temp-range {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--color-text-secondary);
}

</style>
