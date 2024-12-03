<template>
  <div>
    <h1>Todo List</h1>
    <div>
      <input v-model="newTodoTitle" placeholder="Add a new todo" />
      <button @click="addTodo">Add</button>
    </div>

    <div>
      <label for="filter">Filter:</label>
      <select id="filter" v-model="filter">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>

    <ul>
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :id="todo.id"
        :title="todo.title"
        :completed="todo.completed"
        @toggle="toggleTodo"
      >
        <button @click="removeTodo(todo.id)">❌</button>
      </TodoItem>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from './stores/useTodoStore'
import TodoItem from './components/TodoItem.vue'

const todoStore = useTodoStore()

// Local state for new todo title and filter
const newTodoTitle = ref('')
const filter = ref('all')

// Fetch todos when the component mounts
todoStore.fetchTodos()

// Computed property to filter
const filteredTodos = computed(() => {
  if (filter.value === 'completed') {
    return todoStore.todos.filter((todo) => todo.completed)
  }
  if (filter.value === 'incomplete') {
    return todoStore.todos.filter((todo) => !todo.completed)
  }
  return todoStore.todos // all todos
})

// Action handlers
const addTodo = () => {
  if (newTodoTitle.value.trim()) {
    todoStore.addTodo(newTodoTitle.value.trim())
    newTodoTitle.value = '' // Clear the input
  }
}

const removeTodo = (id) => {
  todoStore.removeTodo(id)
}

const toggleTodo = (id) => {
  todoStore.toggleTodo(id)
}
</script>

<style scoped>
/* Styles for the todo list */
input {
  margin-right: 1em;
}

select {
  margin-left: 0.5em;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
