<template>
    <Modal :show="show" @close="$emit('close')">
      <template v-slot:header>
        <h2>Edit Todo</h2>
      </template>

      <template v-slot:content>
        <form @submit.prevent class="edit-todo-form">
          <label>Todo Title</label>
          <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        </form>
      </template>

      <template v-slot:footer>
        <div class="edit-todo-modal-footer">
          <Btn class="edit-todo-submit-btn" @click="$emit('update')">Submit</Btn>
          <Btn variant="danger" @click="$emit('close')">Close</Btn>
        </div>
      </template>

    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import Btn from './Btn.vue';
export default {
    components:{
        Modal,
        Btn,
    },

    props:['modelValue', 'show'],

    emits: ['close','update','update:modelValue']
}
</script>

<style scoped>
.edit-todo-form {
  width: 100%;
  border: 1px, solid, var(--accent-color);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.edit-todo-form input {
  width: 100%;
}

.edit-todo-modal-footer {
  display: flex;
  justify-content: end;
  padding: 10px;
}

.edit-todo-submit-btn {
  margin-right: 5px;
}

</style>