<template>
  <van-popup v-model:show="visible" position="bottom" round closeable :style="{ height: '78%' }">
    <div v-if="item" class="detail-panel">
      <div class="panel-hero">
        <img class="hero-image" :src="item.image" :alt="item.name" />
        <div class="hero-overlay">
          <span class="hero-day">{{ item.day }}</span>
          <span class="hero-altitude">{{ item.altitude }}</span>
        </div>
      </div>

      <div class="panel-body">
        <span class="panel-kicker">Route Dossier</span>
        <h2>{{ item.name }}</h2>
        <p class="panel-desc">{{ item.desc }}</p>

        <div class="panel-tags">
          <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <article class="panel-note panel-note-primary">
          <span class="note-label">旅行提示</span>
          <p>{{ item.tips }}</p>
        </article>

        <button class="nav-btn" @click="openNav">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          在高德中导航到这里
        </button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed, inject } from 'vue'

const { stops: travelData } = inject('travelStore')

const props = defineProps({
  show: { type: Boolean, default: false },
  index: { type: Number, default: 0 }
})

const emit = defineEmits(['update:show'])

const visible = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const item = computed(() => {
  const data = travelData.value
  if (!data || props.index < 0 || props.index >= data.length) {
    return null
  }
  return data[props.index]
})

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
  background: #fffaf3;
}

.panel-hero {
  position: relative;
  flex-shrink: 0;
}

.hero-image {
  width: 100%;
  height: 228px;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 18px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.34), transparent 36%, rgba(0, 0, 0, 0.46));
}

.hero-day,
.hero-altitude {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 250, 244, 0.92);
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--color-forest-deep);
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 22px;
}

.panel-kicker {
  display: inline-flex;
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.panel-body h2 {
  margin: 12px 0 0;
  font-size: 1.7rem;
  line-height: 1;
  letter-spacing: -0.05em;
}

.panel-desc {
  margin: 12px 0 0;
  font-size: 0.9rem;
  line-height: 1.72;
  color: var(--color-text-secondary);
}

.panel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tag {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(19, 35, 31, 0.05);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.panel-note {
  margin-top: 18px;
  padding: 18px;
  border-radius: 24px;
}

.panel-note-primary {
  background: linear-gradient(180deg, rgba(230, 240, 236, 0.92), rgba(207, 227, 220, 0.72));
}

.note-label {
  display: inline-flex;
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.panel-note p {
  margin: 10px 0 0;
  font-size: 0.84rem;
  line-height: 1.68;
  color: var(--color-text-secondary);
}

.nav-btn {
  width: 100%;
  min-height: 54px;
  margin-top: 18px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #c56d3b, #a8542a);
  color: #fff8f2;
  font-size: 0.9rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.nav-btn svg {
  width: 18px;
  height: 18px;
}
</style>
