<template>
  <Navbar />

  <main class="container">
    <EditTodoForm
      :show="editTodoForm.show"
      @close="editTodoForm.show = false"
      @update="updateTodo"
      v-model="editTodoForm.todo.title"
    />

    <Alert
      :message="alert.message"
      :show="alert.show"
      @close="alert.show = false"
      :type="alert.type"
    />
    <section>
      <AddTodoForm @submit="addTodo" :isLoading="isPostingTodo" />
    </section>

    <section>
      <Spinner v-if="isLoading" class="spinner" />
      <div v-else>
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :title="todo.title"
          @remove="removeTodo(todo.id)"
          @edit="showEditTodoForm(todo)"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import Alert from "./components/Alert.vue";
import Navbar from "./components/Navbar.vue";
import AddTodoForm from "./components/addTodoForm.vue";
import Todo from "./components/Todo.vue";
import axios from "axios";
import Spinner from "./components/Spinner.vue";
import EditTodoForm from "./components/EditTodoForm.vue";
import { reactive } from "vue";
import { ref } from "vue";

const todos = ref([]);
const alert = reactive({
  show: false,
  message: "",
  type: "danger",
});
const isLoading = ref(false);
const isPostingTodo = ref(false);
const editTodoForm = reactive({
  show: false,
  todo: {
    id: 0,
    title: "",
  },
});

const showAlert = (message, type) => {
  alert.show = true;
  alert.message = message;
  alert.type = type;
};

const showEditTodoForm = (todo) => {
  editTodoForm.show = true;
  editTodoForm.todo = { ...todo }; // guardo una copia del todo para que con el v-model no se me actualice mi objeto directamente
};

const fetchTodos = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get("/api/todos");
    todos.value = res.data;
  } catch (e) {
    showAlert("Failed loading todos");
  }
  isLoading.value = false;
};
fetchTodos();

const addTodo = async (title) => {
  if (title === "") {
    showAlert("Todo title is required", "danger");
    return;
  }

  isPostingTodo.value = true;
  const res = await axios.post("/api/todos", { title });
  todos.value.push(res.data);
  isPostingTodo.value = false;
  alert.show = false;
};

const removeTodo = async (id) => {
  isLoading.value = true;
  await axios.delete(`api/todos/${id}`);
  todos.value = todos.value.filter((todo) => todo.id !== id);
  isLoading.value = false;
};

const updateTodo = async () => {
  editTodoForm.show = false;
  isLoading.value = true;
  const todo = todos.value.find((todo) => todo.id === editTodoForm.todo.id);
  todo.title = editTodoForm.todo.title;
  await axios.put(`/api/todos/${todo.id}`, todo);
  isLoading.value = false;
};
</script>

<style scoped>
.spinner {
  margin: auto;
  margin-top: 30px;
}
</style>
