<template>
  <Navbar />

  <main class="container">
    <Modal :show="editTodoForm.show" @close="editTodoForm.show = false">
      <template v-slot:header>
        <h2>Edit Todo</h2>
      </template>

      <template v-slot:content>
        <form @submit.prevent class="edit-todo-form">
          <label>Todo Title</label>
          <input type="text" v-model="editTodoForm.todo.title">
        </form>
      </template>

      <template v-slot:footer>
        <div class="edit-todo-modal-footer">
          <Btn class="edit-todo-submit-btn" @click="updateTodo">Submit</Btn>
          <Btn variant="danger" @click="editTodoForm.show = false">Close</Btn>
        </div>
      </template>

    </Modal>

    <Alert :message="alert.message" :show="alert.show" @close="alert.show = false" :type=alert.type />
    <section>
      <AddTodoForm @submit="addTodo" :isLoading="isPostingTodo"/>
    </section>

    <section>
      <Spinner v-if="isLoading" class="spinner"/>
      <div v-else>
        <Todo v-for="todo in todos" :key="todo.id" :title="todo.title" @remove="removeTodo(todo.id)"
          @edit="showEditTodoForm(todo)" />
      </div>
    </section>
  </main>
</template>

<script>
import Alert from "./components/Alert.vue";
import Navbar from "./components/Navbar.vue";
import AddTodoForm from "./components/addTodoForm.vue";
import Todo from "./components/Todo.vue";
import Modal from "./components/Modal.vue";
import Btn from './components/Btn.vue';
import axios from "axios";
import Spinner from './components/Spinner.vue';

const component = {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    Modal,
    Btn,
    Spinner
  },

  data() {
    return {
      todoTitle: "",
      todos: [],
      counter: 0,
      alert: {
        show: false,
        message: "",
        type: "danger",
      },
      formButtonDisabled: false,
      isLoading: false,
      isPostingTodo:false,  
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          title: "",
        }
      },
    };
  },

  created(){
    this.fetchTodos();
  },


  methods: {

    showAlert(message, type){
      this.alert.show = true;
      this.alert.message = message;
      this.alert.type = type;
    },

    async fetchTodos(){
      this.isLoading = true;
      try{
      const res = await axios.get('http://localhost:8080/todos');
      this.todos = res.data;
      }catch(e){
        this.showAlert("Failed loading todos");
      }
      this.isLoading = false; 
    },

    async addTodo(title) {
      if (title === "") {
        this.showAlert("Todo title is required", "danger");
        return;
      }

      this.isPostingTodo = true;
      const res = await axios.post('http://localhost:8080/todos', {title})
      this.todos.push(res.data);
      this.isPostingTodo = false;
      this.alert.show = false;
    },

    async removeTodo(id) {
      this.isLoading = true;
      await axios.delete(`http://localhost:8080/todos/${id}`);
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.isLoading = false;
    },

    showEditTodoForm(todo) {
      this.editTodoForm.show = true;
      this.editTodoForm.todo = { ...todo }; // guardo una copia del todo para que con el v-model no se me actualice mi objeto directamente
    },

    updateTodo() {
      const todo = this.todos.find(todo => todo.id === this.editTodoForm.todo.id);
      todo.title = this.editTodoForm.todo.title;
      this.editTodoForm.show = false;
    },
  },
};
export default component;
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

.spinner{
  margin: auto;
  margin-top: 30px;
}
</style>
