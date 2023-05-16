import{ computed } from 'vue';

function useBackgroundColor(props){
    return computed(() => {
        const options = {
          danger: "var(--danger-color)",
          success: "var(--accent-color)",
          info: "var(--info-color)",
          warning: "var(--warning-color)",
          secondary: "var(--secondary-color)",
        };
      
        return options[props.variant];
      });
}

export { useBackgroundColor };