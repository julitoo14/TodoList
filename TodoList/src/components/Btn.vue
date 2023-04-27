<template>
  <button :style="{ backgroundColor: backgroundColor }" @click.prevent="$emit('click')" :class="{ circle: applyCircleClass }"
    v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      required: false,
      default: "success",
      validator(value) {
        const options = ["danger", "warning", "info", "success", "secondary"];

        return options.includes(value);
      },
    },

    circle: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    backgroundColor() {
      const options = {
        danger: "var(--danger-color)",
        success: "var(--accent-color)",
        info: "var(--info-color)",
        warning: "var(--warning-color)",
        secondary: "var(--secondary-color)"
      };

      return options[this.variant];
    },

    applyCircleClass() {
      return this.circle;
    }
  },
  emits: ["click"],
};
</script>

<style scoped>
button {
  font-size: 30px;
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: black solid 2px;
}

.circle {
  border-radius: 50%;
}
</style>
