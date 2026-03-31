<template>
  <div class="xiaohongshu-section">
    <van-cell-group inset>
      <van-cell title-class="section-title">
        <template #title>
          <span class="section-title">攻略推荐</span>
        </template>
        <template #label>
          <span class="section-subtitle">来自小红书精选</span>
        </template>
      </van-cell>
      <div class="links-grid">
        <a
          v-for="link in xiaohongshuLinks"
          :key="link.keyword"
          :href="`https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(link.keyword)}`"
          target="_blank"
          rel="noopener noreferrer"
          class="link-card clickable"
        >
          <div class="link-icon" :style="{ background: link.color }">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
          </div>
          <span class="link-name">{{ link.name }}</span>
          <svg class="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </a>
      </div>
    </van-cell-group>
  </div>
</template>

<script setup>
import { xiaohongshuLinks } from '../data/travelData'
</script>

<style scoped>
.xiaohongshu-section {
  margin: 0;
}

.section-subtitle {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md) var(--space-md);
}

.link-card {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--color-background);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  text-decoration: none;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.link-card:hover {
  background: var(--color-surface-alt);
}

.link-card:active {
  transform: scale(0.97);
}

.link-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.link-icon .icon {
  width: 18px;
  height: 18px;
}

.link-name {
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text);
}

.link-arrow {
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.link-card:hover .link-arrow {
  opacity: 1;
}

@media (max-width: 360px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>
