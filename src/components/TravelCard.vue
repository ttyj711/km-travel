<template>
  <div class="travel-cards">
    <div class="cards-header">
      <div class="header-left">
        <h2 class="section-title">行程节点</h2>
        <span class="total-badge">{{ travelData.length }} 站</span>
      </div>
      <span class="distance-tag">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tag-icon">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
        </svg>
        约 3200km
      </span>
    </div>

    <div class="cards-list">
      <div
        v-for="(item, index) in travelData"
        :key="item.id"
        class="travel-card"
        :style="{ animationDelay: `${index * 50}ms` }"
        @click="$emit('select', index)"
      >
        <!-- 天数指示 -->
        <div class="day-indicator">
          <span class="day-number">{{ index + 1 }}</span>
        </div>

        <!-- 图片 -->
        <div class="card-image" :style="{ backgroundImage: `url('${item.image}')` }">
          <div class="image-overlay"></div>
          <div class="altitude-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="altitude-icon">
              <path d="M8 3v3a2 2 0 0 1-2 2H3"/>
              <path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
              <path d="M3 16h3a2 2 0 0 1 2 2v3"/>
              <path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
            </svg>
            {{ item.altitude }}
          </div>
        </div>

        <!-- 内容 -->
        <div class="card-body">
          <div class="card-header">
            <h3 class="card-title">{{ item.name }}</h3>
            <span class="card-day">{{ item.day }}</span>
          </div>
          <p class="card-desc">{{ item.desc.substring(0, 55) }}...</p>
          <div class="card-tags">
            <span v-for="tag in item.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>

        <!-- 箭头 -->
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { travelData } from '../data/travelData'

defineEmits(['select'])
</script>

<style scoped>
.travel-cards {
  padding: var(--space-md);
}

.cards-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
}

.total-badge {
  background: var(--color-primary);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px var(--space-sm);
  border-radius: var(--radius-full);
}

.distance-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  background: var(--color-background);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-md);
}

.tag-icon {
  width: 14px;
  height: 14px;
}

/* 卡片列表 */
.cards-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.travel-card {
  display: flex;
  align-items: stretch;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  position: relative;
  transition: box-shadow 0.2s ease, transform 0.15s ease;
  animation: slideIn 0.35s ease both;
}

.travel-card:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-md);
}

/* 天数指示器 */
.day-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--color-primary);
}

.day-number {
  position: absolute;
  left: -4px;
  top: var(--space-sm);
  background: var(--color-primary);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 图片 */
.card-image {
  position: relative;
  width: 90px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.4) 100%);
}

.altitude-tag {
  position: absolute;
  bottom: var(--space-xs);
  left: var(--space-xs);
  right: var(--space-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  padding: 2px var(--space-xs);
  border-radius: var(--radius-sm);
}

.altitude-icon {
  width: 10px;
  height: 10px;
}

/* 内容 */
.card-body {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  padding-left: var(--space-lg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.card-day {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  background: var(--color-background);
  padding: 1px var(--space-xs);
  border-radius: var(--radius-sm);
}

.card-desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--space-xs);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  gap: var(--space-xs);
}

.tag {
  font-size: 0.65rem;
  color: var(--color-primary);
  background: rgba(14, 165, 233, 0.1);
  padding: 1px var(--space-xs);
  border-radius: var(--radius-sm);
}

/* 箭头 */
.card-arrow {
  position: absolute;
  right: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.travel-card:active .card-arrow {
  opacity: 1;
  transform: translateY(-50%) translateX(4px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
