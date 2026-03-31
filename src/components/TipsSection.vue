<template>
  <div class="tips-section">
    <div class="section-header">
      <h2 class="section-title">旅行贴士</h2>
    </div>

    <div class="tips-grid">
      <div
        v-for="(tip, index) in tipsData"
        :key="tip.title"
        class="tip-card"
        :style="{ animationDelay: `${index * 60}ms` }"
      >
        <div class="tip-icon" :class="`tip-icon-${index + 1}`" v-html="tip.iconSvg"></div>
        <div class="tip-content">
          <h4 class="tip-title">{{ tip.title }}</h4>
          <p class="tip-desc">{{ tip.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { tipsData } from '../data/travelData'
</script>

<style scoped>
.tips-section {
  margin: var(--space-md);
}

.section-header {
  margin-bottom: var(--space-sm);
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.tips-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.tip-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  animation: fadeIn 0.35s ease both;
}

.tip-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tip-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.tip-icon-1 {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0.05) 100%);
  color: var(--color-primary);
}

.tip-icon-2 {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.05) 100%);
  color: var(--color-cta);
}

.tip-icon-3 {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%);
  color: var(--color-success);
}

.tip-icon-4 {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%);
  color: #A855F7;
}

.tip-icon-5 {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
  color: var(--color-info);
}

.tip-icon-6 {
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(234, 179, 8, 0.05) 100%);
  color: var(--color-warning);
}

.tip-content {
  flex: 1;
  min-width: 0;
}

.tip-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 2px;
}

.tip-desc {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
