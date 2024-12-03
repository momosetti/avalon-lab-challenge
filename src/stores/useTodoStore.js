import { defineStore } from 'pinia'
import axios from 'axios' // For API calls

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    error: null,
  }),

  actions: {
    // Fetch todo items from backend
    async fetchTodos() {
      try {
        const response = await axios.get('/api/todos') // API endpoint to fetch todos
        this.todos = response.data // Populate state with fetched data
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch todos'
      }
    },

    // Add a new todo
    async addTodo(title) {
      try {
        const response = await axios.post('/api/todos', { title, completed: false })
        this.todos.push(response.data) // Add the new to-do to the state
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to add todo'
      }
    },

    // Remove a todo
    async removeTodo(id) {
      try {
        await axios.delete(`/api/todos/${id}`) // API endpoint to delete a todo
        this.todos = this.todos.filter((todo) => todo.id !== id) // Remove from state
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to remove todo'
      }
    },

    // Toggle the completed status in both state and backend
    async toggleTodo(id) {
      try {
        const todo = this.todos.find((todo) => todo.id === id)
        if (!todo) throw new Error('Todo not found')

        const updatedTodo = { ...todo, completed: !todo.completed }
        await axios.put(`/api/todos/${id}`, updatedTodo) // API endpoint to update the todo

        // Update state
        todo.completed = updatedTodo.completed
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to toggle todo'
      }
    },
  },
})
