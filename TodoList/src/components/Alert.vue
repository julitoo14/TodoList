<template>
  <div
    v-if="show"
    class="alert"
    :style="{
      backgroundColor: backgroundColor,
    }"
  >
    <div>{{ message }}</div>
    <div class="close-alert" @click="emit('close')">&times;</div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps({
  message: {
    required: true,
    type: String,
  },
  show: {
    required: true,
    type: Boolean,
  },
  type: {
    required: false,
    default: "danger",
    validator(value) {
      return ["danger", "warning", "info"].includes(value);
    },
  },
});

const backgroundColor = computed(() => {
  const options = {
    danger: "var(--danger-color)",
    info: "var(--info-color)",
    warning: "var(--warning-color)",
  };

  return options[props.type];
});
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--danger-color);
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
  height: 50px;
}

.close-alert {
  font-size: 50px;
  cursor: pointer;
}
</style>
