<template>
  <section class="xiaohongshu-section surface-card">
    <div class="links-shell">
      <div class="links-header">
        <div>
          <h2 class="section-title">攻略外链</h2>
          <p>保留小红书入口，但做成更克制、更像内容索引的视觉语气。</p>
        </div>
      </div>

      <div class="links-grid">
        <a
          v-for="link in xiaohongshuLinks"
          :key="link.keyword"
          :href="`https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(link.keyword)}`"
          target="_blank"
          rel="noopener noreferrer"
          class="link-card"
        >
          <span class="link-name">{{ link.name }}</span>
          <span class="link-action">搜索参考</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { xiaohongshuLinks } from '../data/travelData'
</script>

<style scoped>
.xiaohongshu-section {
  overflow: hidden;
  border-radius: 30px;
}

.links-shell {
  padding: 18px;
}

.links-header p {
  margin: 10px 0 0;
  max-width: 30ch;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.link-card {
  display: grid;
  gap: 8px;
  min-height: 116px;
  padding: 16px;
  border-radius: 22px;
  text-decoration: none;
  color: inherit;
  background: linear-gradient(180deg, rgba(255, 247, 236, 0.86), rgba(244, 233, 214, 0.68));
  border: 1px solid rgba(19, 35, 31, 0.06);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.link-card:nth-child(3n + 2) {
  background: linear-gradient(180deg, rgba(230, 240, 236, 0.86), rgba(207, 227, 220, 0.68));
}

.link-card:nth-child(3n) {
  background: linear-gradient(180deg, rgba(235, 241, 244, 0.9), rgba(207, 223, 229, 0.72));
}

.link-card:active {
  transform: scale(0.985);
}

.link-name {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.link-action {
  align-self: end;
  font-size: 0.76rem;
  color: var(--color-text-secondary);
}

@media (max-width: 380px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>
