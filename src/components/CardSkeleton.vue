<template>
  <article class="weather-card skeleton">
    <p class="skeleton-text skeleton-title"></p>
    <div class="weather-container">
      <div class="middle">
        <div class="icon">
          <div class="skeleton-icon"></div>
          <p class="skeleton-text skeleton-line"></p>
        </div>
        <div class="icon_right">
          <p class="skeleton-text skeleton-line"></p>
          <p class="skeleton-text skeleton-line"></p>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <p class="skeleton-text skeleton-line"></p>
          <p class="skeleton-text skeleton-line"></p>
          <p class="skeleton-text skeleton-line"></p>
        </div>
        <div class="right">
          <p class="skeleton-text skeleton-line"></p>
          <p class="skeleton-text skeleton-line"></p>
          <p class="skeleton-text skeleton-line"></p>
        </div>
      </div>
    </div>
    <div class="skeleton-btn"></div>
  </article>
</template>

<style lang="scss" scoped>
.skeleton {
  background: var(--color-gray-light);
  border-color: var(--color-grayish);
  max-width: 350px;
}

.skeleton-text {
  background: linear-gradient(
    90deg,
    var(--color-grayish) 25%,
    var(--color-gray-light) 50%,
    var(--color-grayish) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  display: inline-block;

  &.skeleton-title {
    width: 30%;
    height: 28px;
  }

  &.skeleton-line {
    width: 100%;
    height: 20px;
    margin: 0.5rem 0;
  }
}

.weather-container {
  display: flex;
  // flex-direction: column;
  gap: 10px;
}
.middle,
.bottom {
  width: 100%;
  justify-content: space-between;
  display: flex;
}
.middle {
  margin-top: -10px;
}
.bottom {
  margin-top: -10px;
  .skeleton-line {
    margin: 0;
    height: 15px;
  }
  .skeleton-line:first-of-type {
    margin-bottom: 10px;
  }
}

.left,
.right {
  width: 30%;
}
.icon {
  margin-left: 15px;
}
.icon_right {
  margin-top: 10px;
  width: 50%;
}

.skeleton-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(
    90deg,
    var(--color-grayish) 25%,
    var(--color-gray-light) 50%,
    var(--color-grayish) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 50%;
}

.skeleton-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 46px;
  height: 46px;
  background: linear-gradient(
    90deg,
    var(--color-grayish) 25%,
    var(--color-gray-light) 50%,
    var(--color-grayish) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-bottom-left-radius: 80px;
  border-top-right-radius: 15px;
}

@media screen and (max-width: 420px) {
  .bottom {
    margin-top: -14px;
  }
  .skeleton-text.skeleton-line {
    height: 12px;
  }
}
</style>
