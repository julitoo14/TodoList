<template>
  <button :style="{ backgroundColor: backgroundColor }" @click.prevent="emit('click')" :class="{ circle: applyCircleClass }"
    v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';


  const emit = defineEmits(['click']);
  const props = defineProps({
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
  });

    const applyCircleClass = computed(() =>{
      return props.circle;
    });
  
  
    const backgroundColor = computed(() => {
      const options = {
        danger: "var(--danger-color)",
        success: "var(--accent-color)",
        info: "var(--info-color)",
        warning: "var(--warning-color)",
        secondary: "var(--secondary-color)"
      };

      return options[props.variant];
    });
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

.btn:disabled{
  opacity: 70%;
  
}

.circle {
  border-radius: 50%;
}
</style>
