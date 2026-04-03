<template>
  <section class="header-card">
    <div class="hero-copy">
      <span class="eyebrow">Expedition Edition</span>
      <h2>把“路线信息”做成真正有旅行气味的首页开场</h2>
      <p>
        这条线不是普通打卡清单，而是一段不断切换气候、海拔和地貌的自驾叙事。界面也应该有同样的层次感。
      </p>

      <div class="hero-badges">
        <span v-for="badge in heroBadges" :key="badge" class="hero-badge">{{ badge }}</span>
      </div>
    </div>

    <div class="hero-dossier glass-panel">
      <div class="dossier-topline">
        <span>Route Archive</span>
        <span>{{ travelData.length }} stops</span>
      </div>

      <div class="hero-stats">
        <article v-for="stat in stats" :key="stat.label" class="stat-card">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </article>
      </div>

      <div class="route-track">
        <div class="route-line"></div>
        <div v-for="(stop, index) in routeHighlights" :key="stop.name" class="route-stop" :style="{ left: `${index * 25}%` }">
          <span class="stop-dot"></span>
          <span class="stop-name">{{ stop.name }}</span>
        </div>
      </div>

      <div class="route-note">
        <strong>沿线记忆点</strong>
        <span>梅里雪山、丙察察、墨脱、拉萨、纳木错</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { travelData } from '../data/travelData'

const numericAltitudes = computed(() =>
  travelData
    .map((item) => Number.parseInt(item.altitude, 10))
    .filter((value) => Number.isFinite(value))
)

const highestAltitude = computed(() => Math.max(...numericAltitudes.value))

const stats = computed(() => [
  { label: '建议天数', value: '12-13 天' },
  { label: '路线气质', value: '高原秘境' },
  { label: '峰值海拔', value: `${highestAltitude.value}m` }
])

const routeHighlights = computed(() => [
  travelData[0],
  travelData[2],
  travelData[5],
  travelData[7],
  travelData[travelData.length - 1]
].filter(Boolean))

const heroBadges = ['自驾主线', '多海拔切换', '适合慢节奏']
</script>

<style scoped>
.header-card {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 18px;
  padding: 24px;
  border-radius: 34px;
  background:
    linear-gradient(135deg, rgba(21, 62, 54, 0.96), rgba(31, 107, 91, 0.9) 56%, rgba(140, 185, 201, 0.74));
  color: #fff7ef;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 28px 48px rgba(16, 42, 36, 0.22);
}

.header-card::before,
.header-card::after {
  content: '';
  position: absolute;
  pointer-events: none;
}

.header-card::before {
  inset: 0;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.22), transparent 26%),
    linear-gradient(145deg, transparent 0 52%, rgba(255, 255, 255, 0.08) 52% 60%, transparent 60%);
}

.header-card::after {
  right: -48px;
  bottom: -42px;
  width: 180px;
  height: 180px;
  border-radius: 40% 60% 58% 42%;
  background: rgba(255, 239, 210, 0.1);
  filter: blur(4px);
}

.hero-copy,
.hero-dossier {
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 12px;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 247, 239, 0.72);
}

.hero-copy h2 {
  margin: 0;
  max-width: 12ch;
  font-size: 2rem;
  line-height: 0.96;
  letter-spacing: -0.06em;
}

.hero-copy p {
  margin: 14px 0 0;
  max-width: 32ch;
  color: rgba(255, 247, 239, 0.82);
  font-size: 0.9rem;
  line-height: 1.7;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.hero-badge {
  padding: 9px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 0.74rem;
  font-weight: 600;
}

.hero-dossier {
  padding: 18px;
  border-radius: 26px;
}

.dossier-topline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 0.72rem;
  color: rgba(255, 247, 239, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat-card {
  padding: 14px 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.stat-value {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.1;
}

.stat-label {
  display: block;
  margin-top: 6px;
  font-size: 0.7rem;
  color: rgba(255, 247, 239, 0.72);
}

.route-track {
  position: relative;
  margin-top: 20px;
  padding-top: 24px;
  min-height: 62px;
}

.route-line {
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.4));
}

.route-stop {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  display: grid;
  justify-items: center;
  gap: 8px;
}

.stop-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #fff7ef;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.08);
}

.stop-name {
  max-width: 58px;
  text-align: center;
  font-size: 0.66rem;
  color: rgba(255, 247, 239, 0.72);
  line-height: 1.25;
}

.route-note {
  display: grid;
  gap: 6px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.78rem;
}

.route-note strong {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 247, 239, 0.72);
}

.route-note span {
  color: rgba(255, 247, 239, 0.88);
  line-height: 1.5;
}

@media (max-width: 380px) {
  .header-card {
    padding: 20px;
  }

  .hero-copy h2 {
    font-size: 1.75rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .route-track {
    display: none;
  }
}
</style>
