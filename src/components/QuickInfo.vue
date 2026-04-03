<template>
  <section class="quick-info">
    <article class="overview-card overview-card-lead surface-card">
      <div>
        <span class="card-kicker">Trip Readiness</span>
        <h3>先判断节奏，而不是先看景点</h3>
        <p>适合把这条线当成一段穿越式旅行来安排。行程强度受海拔、路况和补给距离共同影响。</p>
      </div>
      <div class="readiness-meter">
        <span class="meter-label">综合强度</span>
        <strong>7 / 10</strong>
        <div class="meter-bar"><span></span></div>
      </div>
    </article>

    <div class="info-grid">
      <article v-for="item in infoList" :key="item.label" class="info-card surface-card" :class="item.className">
        <span class="info-label">{{ item.label }}</span>
        <strong class="info-value">{{ item.value }}</strong>
        <p class="info-copy">{{ item.copy }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const infoList = [
  {
    label: '最佳窗口',
    value: '5月 / 9-10月',
    copy: '避开雨季风险，也更容易获得清晰能见度。',
    className: 'tone-sand'
  },
  {
    label: '建议车况',
    value: '四驱优先',
    copy: '复杂路段和长补给间隔决定了容错空间。',
    className: 'tone-forest'
  },
  {
    label: '高反关注',
    value: '纳木错段',
    copy: '海拔上升快，尽量把日程留得更松。',
    className: 'tone-sky'
  }
]
</script>

<style scoped>
.quick-info {
  display: grid;
  gap: 14px;
}

.overview-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  padding: 22px;
}

.overview-card-lead {
  border-radius: 30px;
}

.card-kicker {
  display: inline-flex;
  margin-bottom: 10px;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.overview-card h3 {
  margin: 0;
  max-width: 12ch;
  font-size: 1.45rem;
  line-height: 1.02;
  letter-spacing: -0.05em;
}

.overview-card p {
  margin: 10px 0 0;
  max-width: 34ch;
  color: var(--color-text-secondary);
  font-size: 0.86rem;
  line-height: 1.7;
}

.readiness-meter {
  min-width: 112px;
  padding: 16px;
  align-self: end;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(19, 35, 31, 0.05), rgba(19, 35, 31, 0.02));
}

.meter-label {
  display: block;
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.readiness-meter strong {
  display: block;
  margin-top: 8px;
  font-size: 1.6rem;
  line-height: 1;
}

.meter-bar {
  height: 8px;
  margin-top: 14px;
  border-radius: 999px;
  background: rgba(19, 35, 31, 0.08);
  overflow: hidden;
}

.meter-bar span {
  display: block;
  width: 70%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-gold), var(--color-clay));
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.info-card {
  min-height: 146px;
  padding: 18px;
  border-radius: 24px;
}

.info-label {
  display: block;
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.info-value {
  display: block;
  margin-top: 12px;
  font-size: 1.04rem;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.info-copy {
  margin: 12px 0 0;
  font-size: 0.78rem;
  color: var(--color-text-secondary);
  line-height: 1.55;
}

.tone-sand {
  background: linear-gradient(180deg, rgba(255, 247, 236, 0.88), rgba(245, 226, 198, 0.7));
}

.tone-forest {
  background: linear-gradient(180deg, rgba(225, 241, 236, 0.92), rgba(203, 228, 220, 0.76));
}

.tone-sky {
  background: linear-gradient(180deg, rgba(229, 240, 244, 0.92), rgba(201, 225, 233, 0.76));
}

@media (max-width: 420px) {
  .overview-card {
    grid-template-columns: 1fr;
  }

  .readiness-meter {
    min-width: unset;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-card {
    min-height: unset;
  }
}
</style>
