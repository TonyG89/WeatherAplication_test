<template>
  <div class="chart-skeleton">
    <div class="chart-skeleton-header">
      <div class="skeleton-legend"></div>
    </div>
    <div class="chart-skeleton-body">
      <div class="skeleton-grid"></div>
      <div class="skeleton-line">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none">
          <path
            d="M0,25 Q25,10 33,20 T50,30 T75,15 T100,25"
            fill="none"
            class="animated-path"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-skeleton {
  width: 100%;
  height: 250px;
  background-color: #f4f4f4;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.chart-skeleton-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.skeleton-legend {
  width: 180px;
  height: 20px;
  margin: 0 auto;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.chart-skeleton-body {
  position: relative;
  height: calc(100% - 60px);
}

.skeleton-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.grid-line {
  position: absolute;
  background-color: rgba(200, 200, 200, 0.3);
}

.grid-line.vertical {
  width: 1px;
  height: 100%;
  left: calc(20% * var(--index));
}

.grid-line.horizontal {
  width: 100%;
  height: 1px;
  top: calc(25% * var(--index));
}

.skeleton-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.skeleton-line svg {
  width: 100%;
  height: 100%;
}

.animated-path {
  stroke: #e0e0e0;
  stroke-width: 3;
  fill: none;
  animation: dash 1.5s linear infinite, color-change 3s infinite alternate;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 0 100;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 50 100;
    stroke-dashoffset: -25;
  }
  100% {
    stroke-dasharray: 0 100;
    stroke-dashoffset: -100;
  }
}

@keyframes color-change {
  0% {
    stroke: #e0e0e0;
  }
  50% {
    stroke: #f0f0f0;
  }
  100% {
    stroke: #e0e0e0;
  }
}
</style>
