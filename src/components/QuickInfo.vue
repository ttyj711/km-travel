<template>
  <div class="quick-info">
    <div class="bento-grid">
      <div
        v-for="(item, index) in infoList"
        :key="item.label"
        class="bento-card"
        :style="{ animationDelay: `${index * 80}ms` }"
      >
        <div class="bento-icon" :style="{ background: item.bgColor }" v-html="item.icon"></div>
        <div class="bento-content">
          <div class="bento-value">{{ item.value }}</div>
          <div class="bento-label">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const infoList = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>`,
    bgColor: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0.05) 100%)',
    label: '最佳时间',
    value: '5月 / 9-10月'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`,
    bgColor: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.05) 100%)',
    label: '行程时长',
    value: '12-13天'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>`,
    bgColor: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
    label: '全程距离',
    value: '约3200km'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M8 3v3a2 2 0 0 1-2 2H3"/>
      <path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
      <path d="M3 16h3a2 2 0 0 1 2 2v3"/>
      <path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
    </svg>`,
    bgColor: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)',
    label: '最高海拔',
    value: '5231m'
  }
]
</script>

<style scoped>
.quick-info {
  margin: var(--space-md);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
}

.bento-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: fadeIn 0.4s ease both;
}

.bento-card:active {
  transform: scale(0.98);
}

.bento-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bento-icon :deep(svg) {
  width: 22px;
  height: 22px;
  stroke: currentColor;
}

.bento-card:nth-child(1) .bento-icon { color: var(--color-primary); }
.bento-card:nth-child(2) .bento-icon { color: var(--color-cta); }
.bento-card:nth-child(3) .bento-icon { color: var(--color-success); }
.bento-card:nth-child(4) .bento-icon { color: #A855F7; }

.bento-content {
  flex: 1;
  min-width: 0;
}

.bento-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 2px;
}

.bento-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
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

@media (max-width: 360px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}
</style>
