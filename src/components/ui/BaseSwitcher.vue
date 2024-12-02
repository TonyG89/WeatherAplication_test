<template>
  <div class="switcher">
    <h3 class="switcher-title">{{ title }}:</h3>
    <label class="switch_container">
      <input
        type="checkbox"
        class="checkbox"
        :checked="isChecked"
        @change="toggleValue"
      />
      <div class="slider">
        <span class="text text-inside" :class="isChecked ? 'left' : 'right'">{{
          switchValue
        }}</span>
      </div>
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
// Пропсы для компонента
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  switchValue: {
    type: String,
    default: "off",
  },
  labels: {
    type: Array,
    default: () => ["off", "on"],
  },
});

const emit = defineEmits(["changeValue"]);

// Определяем начальное состояние isChecked на основе switchValue
const isChecked = ref(props.labels.indexOf(props.switchValue) === 1);

// Функция переключения значения
const toggleValue = () => {
  isChecked.value = !isChecked.value; // Переключаем значение
  emit("changeValue", props.labels[+isChecked.value]); // Вызываем событие с новым значением
};

// Следим за изменением props.switchValue
watch(
  () => props.switchValue,
  (newValue) => {
    isChecked.value = props.labels.indexOf(newValue) === 1;
  }
);
</script>
<style lang="scss" scoped>
.switcher {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 2px;
  &-title {
    font-size: 16px;
    margin: 0 0 7px 0;
    line-height: normal;
    color: var(--color-primary-dark);
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
}

.switch_container {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch_container .checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-primary-dark);
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.checkbox:checked + .slider {
  background-color: var(--color-primary);
}

.checkbox:checked + .slider:before {
  transform: translateX(26px);
}

.text {
  font-size: 16px;
  font-weight: 500;
  padding: 0 5px 2px;
  font-weight: 700;
  &-inside {
    text-transform: uppercase;
    &.left {
      float: left;
      color: var(--color-primary-dark);
    }
    &.right {
      float: right;
      color: var(--color-primary);
    }
  }
  &-outside {
  }
}

@media screen and (max-width: 600px) {
  switcher-title {
    display: none;
  }
}
</style>
