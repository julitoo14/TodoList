<template>
  <div class="todo">
    <p>{{ title }}</p>
    <div>
      <Btn class="btn edit-todo-btn" circle @click="$emit('edit')" variant="secondary">
        <Pencil />
      </Btn>
      <Btn class="btn" circle @click="$emit('remove')" variant="danger">
        <Trash />
      </Btn>
    </div>
  </div>
</template>

<script>
import Btn from "./Btn.vue"
import Pencil from "./icons/Pencil.vue"
import Trash from "./icons/Trash.vue"
export default {
  components: { Btn, Pencil, Trash },

  props: {
    title: {
      required: true,
      type: String,
    },
  },

  emits: ['remove', 'edit']
};

</script>

<style scoped>
.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

.todo>div {
  display: flex;
}

.btn {
  height: 40px;
  width: 40px;
  font-size: 30px;
}

.edit-todo-btn {
  margin-right: 5px;
}
</style>
