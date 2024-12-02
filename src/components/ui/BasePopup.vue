<template>
  <div v-if="isOpen" class="backdrop"></div>
  <dialog ref="modal" class="modal" :open="isOpen">
    <h2 class="title">{{ title }}</h2>
    <p>
      {{ text }}
    </p>
    <section class="actions">
      <template v-if="type === 'confirm'">
        <button @click="$emit('remove')">{{ $t("dialog_card.button.remove") }}</button>
        <button @click="$emit('cancel')">{{ $t("dialog_card.button.cancel") }}</button>
      </template>
      <template v-if="type === 'alert'">
        <button class="one_button" @click="$emit('redirect')">
          {{ $t("dialog_card.button.redirect") }}
        </button>
      </template>
    </section>
  </dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const modal = ref(null);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "alert", // alert, confirm
  },
});

defineEmits(["remove", "cancel", "redirect"]);

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }
);
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 400px;
  max-width: 90%;
  z-index: 1050;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.title {
  margin-top: -10px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
}

.one_button {
  margin: 0 auto;
}
</style>
