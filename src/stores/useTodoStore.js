import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    error: null,
  }),

  actions: {
    // Fetch todo items from backend
    async fetchTodos() {
      try {
        const response = await axios.get('/api/todos')
        this.todos = response.data
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch todos'
      }
    },

    // Add a new todo
    async addTodo(title) {
      try {
        const response = await axios.post('/api/todos', {
          title,
          completed: false,
        })
        this.todos.push(response.data)
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to add todo'
      }
    },

    // Remove a todo
    async removeTodo(id) {
      try {
        await axios.delete(`/api/todos/${id}`)
        this.todos = this.todos.filter((todo) => todo.id !== id)
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
        await axios.put(`/api/todos/${id}`, updatedTodo)

        // Update state
        todo.completed = updatedTodo.completed
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to toggle todo'
      }
    },
  },
})
