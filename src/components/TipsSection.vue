<template>
  <section class="tips-section surface-card">
    <div class="tips-shell">
      <div class="tips-header">
        <div>
          <h2 class="section-title">行前清单</h2>
          <p>把原本散落的准备事项重排成更像出发前 briefing 的阅读节奏。</p>
        </div>
      </div>

      <div class="tips-list">
        <article v-for="(tip, index) in tipsData" :key="tip.title" class="tip-card">
          <div class="tip-index">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="tip-content">
            <h3>{{ tip.title }}</h3>
            <p>{{ tip.desc }}</p>
          </div>
          <div class="tip-icon" v-html="tip.iconSvg"></div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { tipsData } from '../data/travelData'
</script>

<style scoped>
.tips-section {
  overflow: hidden;
  border-radius: 30px;
}

.tips-shell {
  padding: 18px;
}

.tips-header p {
  margin: 10px 0 0;
  max-width: 32ch;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.tips-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.tip-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 16px;
  border-radius: 22px;
  background: rgba(19, 35, 31, 0.04);
}

.tip-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background: rgba(19, 35, 31, 0.08);
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--color-text);
}

.tip-content h3 {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.15;
}

.tip-content p {
  margin: 6px 0 0;
  font-size: 0.78rem;
  line-height: 1.58;
  color: var(--color-text-secondary);
}

.tip-icon {
  width: 42px;
  height: 42px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(197, 109, 59, 0.14), rgba(215, 166, 66, 0.12));
  color: var(--color-clay);
}

.tip-icon :deep(svg) {
  width: 20px;
  height: 20px;
}
</style>
