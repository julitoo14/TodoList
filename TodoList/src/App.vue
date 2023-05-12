<template>
  <Navbar />

  <main class="container">
    <EditTodoForm 
      :show="editTodoForm.show"
      @close="editTodoForm.show = false"
      @update="updateTodo"
      v-model="editTodoForm.todo.title"
      />

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
import EditTodoForm from "./components/EditTodoForm.vue";

const component = {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    Modal,
    Btn,
    Spinner,
    EditTodoForm,
    
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
      const res = await axios.get('/api/todos');
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
      const res = await axios.post('/api/todos', {title})
      this.todos.push(res.data);
      this.isPostingTodo = false;
      this.alert.show = false;
    },

    async removeTodo(id) {
      this.isLoading = true;
      await axios.delete(`api/todos/${id}`);
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.isLoading = false;
    },

    showEditTodoForm(todo) {
      this.editTodoForm.show = true;
      this.editTodoForm.todo = { ...todo }; // guardo una copia del todo para que con el v-model no se me actualice mi objeto directamente
    },

    async updateTodo() {
      this.editTodoForm.show = false;
      this.isLoading = true;
      const todo = this.todos.find(todo => todo.id === this.editTodoForm.todo.id);
      todo.title = this.editTodoForm.todo.title;
      await axios.put(`/api/todos/${todo.id}`, todo);
      this.isLoading= false;
    },
  },
};
export default component;
</script>

<style scoped>

.spinner{
  margin: auto;
  margin-top: 30px;
}
</style>
