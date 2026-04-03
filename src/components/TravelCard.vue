<template>
  <section class="travel-cards">
    <div class="cards-header">
      <div>
        <h2 class="section-title">行程节点</h2>
        <p class="cards-copy">把每一站当作一个独立场景来阅读，减少同质化列表的疲劳感。</p>
      </div>
      <span class="cards-total">{{ travelData.length }} 站</span>
    </div>

    <div class="cards-list">
      <article v-for="(item, index) in travelData" :key="item.id" class="journey-entry" :class="`theme-${index % 3}`">
        <div class="entry-rail">
          <span class="entry-day">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="entry-line"></span>
        </div>

        <button class="entry-card surface-card" @click="$emit('select', index)">
          <div class="entry-media" :style="{ backgroundImage: `url('${item.image}')` }">
            <div class="entry-overlay"></div>
            <span class="entry-altitude">{{ item.altitude }}</span>
          </div>

          <div class="entry-body">
            <div class="entry-topline">
              <span class="entry-day-text">{{ item.day }}</span>
              <span class="entry-marker">可展开详情</span>
            </div>

            <h3>{{ item.name }}</h3>
            <p>{{ item.desc.substring(0, 66) }}...</p>

            <div class="tag-row">
              <span v-for="tag in item.tags.slice(0, 3)" :key="tag" class="tag-chip">{{ tag }}</span>
            </div>
          </div>
        </button>
      </article>
    </div>
  </section>
</template>

<script setup>
import { travelData } from '../data/travelData'

defineEmits(['select'])
</script>

<style scoped>
.travel-cards {
  display: grid;
  gap: 16px;
}

.cards-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
}

.cards-copy {
  margin: 10px 0 0;
  max-width: 30ch;
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.cards-total {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(19, 35, 31, 0.06);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-text-secondary);
}

.cards-list {
  display: grid;
  gap: 14px;
}

.journey-entry {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;
  align-items: stretch;
}

.entry-rail {
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 10px;
}

.entry-day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 16px;
  background: rgba(19, 35, 31, 0.07);
  color: var(--color-text);
  font-size: 0.82rem;
  font-weight: 800;
}

.entry-line {
  width: 1px;
  min-height: calc(100% - 52px);
  background: linear-gradient(180deg, rgba(19, 35, 31, 0.18), rgba(19, 35, 31, 0));
}

.entry-card {
  overflow: hidden;
  border: none;
  padding: 0;
  text-align: left;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.entry-card:active {
  transform: scale(0.985);
}

.entry-media {
  position: relative;
  height: 146px;
  background-size: cover;
  background-position: center;
}

.entry-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.5));
}

.entry-altitude {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 250, 244, 0.9);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-forest-deep);
}

.entry-body {
  padding: 18px;
}

.entry-topline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.entry-marker {
  color: var(--color-clay);
  font-weight: 700;
}

.entry-body h3 {
  margin: 12px 0 0;
  font-size: 1.18rem;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.entry-body p {
  margin: 10px 0 0;
  color: var(--color-text-secondary);
  font-size: 0.83rem;
  line-height: 1.68;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tag-chip {
  padding: 7px 11px;
  border-radius: 999px;
  background: rgba(19, 35, 31, 0.05);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.theme-0 .entry-day,
.theme-0 .entry-marker {
  color: var(--color-forest);
}

.theme-1 .entry-day,
.theme-1 .entry-marker {
  color: var(--color-clay);
}

.theme-2 .entry-day,
.theme-2 .entry-marker {
  color: var(--color-gold);
}
</style>
