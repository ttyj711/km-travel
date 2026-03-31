<template>
  <header class="header-card">
    <!-- 背景装饰 -->
    <div class="header-bg">
      <div class="bg-pattern"></div>
      <div class="bg-gradient"></div>
    </div>

    <!-- 内容 -->
    <div class="header-content">
      <div class="route-badge">
        <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16l-4-4 4-4"/>
          <path d="M8 12h8"/>
        </svg>
        <span>史诗级自驾路线</span>
      </div>

      <h1 class="title">
        <span class="title-main">滇藏青</span>
        <span class="title-sub">超级环线</span>
      </h1>

      <p class="subtitle">丙察察 · 墨脱 · 尼屋乡 · 萨普神山</p>

      <!-- 路线简图 -->
      <div class="route-visual">
        <div class="route-point start">
          <span class="point-dot"></span>
          <span class="point-name">香格里拉</span>
        </div>
        <div class="route-line">
          <div class="line-progress"></div>
          <div class="waypoint" style="left: 20%">察隅</div>
          <div class="waypoint" style="left: 40%">墨脱</div>
          <div class="waypoint" style="left: 60%">拉萨</div>
          <div class="waypoint" style="left: 80%">那曲</div>
        </div>
        <div class="route-point end">
          <span class="point-name">格尔木</span>
          <span class="point-dot"></span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header-card {
  position: relative;
  overflow: hidden;
  margin: 0 !important;
}

/* 背景 */
.header-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 40%);
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 60%, #7DD3FC 100%);
}

/* 内容 */
.header-content {
  position: relative;
  z-index: 1;
  padding: var(--space-xl) var(--space-lg);
  padding-top: var(--space-2xl);
}

/* 徽章 */
.route-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  margin-bottom: var(--space-md);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.badge-icon {
  width: 14px;
  height: 14px;
}

/* 标题 */
.title {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: var(--space-sm);
}

.title-main {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  letter-spacing: 4px;
  line-height: 1.1;
}

.title-sub {
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 2px;
}

.subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: var(--space-lg);
  letter-spacing: 1px;
}

/* 路线可视化 */
.route-visual {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.route-point {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-shrink: 0;
}

.point-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

.route-point.start .point-dot {
  background: #22C55E;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
}

.route-point.end .point-dot {
  background: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
}

.point-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

.route-line {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  border-radius: 1px;
}

.line-progress {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 1px;
}

.waypoint {
  position: absolute;
  top: 6px;
  transform: translateX(-50%);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.waypoint::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
}

@media (max-width: 360px) {
  .waypoint {
    display: none;
  }
}
</style>
