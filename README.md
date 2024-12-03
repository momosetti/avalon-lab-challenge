# Todo List Project Report

## Overview

This project is a **Todo List Application** built using Vue 3 with the Composition API, **Pinia** for state management, and **SQLite** as the backend database. The frontend and backend are separate. The project demonstrates modern frontend development practices and integrates with a database for persistent storage.

---

## **Technologies Used**

### Frontend:

1. **Vue 3**:
   - Composition API
   - `<script setup>`
   - Scoped CSS for component styling
2. **Pinia**:
   - state management.
3. **Vite**:
   - development server and build tool.

### Backend:

1. **SQLite**:
   - file-based database for persistent data storage.
2. **Express.js**:
   - Backend server to handle API requests and database interactions.

---

## **Project Features**

### Frontend Features:

- **TodoItem Component**:
  - Displays individual todo items with their title and completion status.
  - Includes functionality to toggle completion and remove the todo.
- **TodoList Component**:
  - Displays a list of todos fetched from the backend.
  - Allows adding, toggling, and removing todos.
  - Filters todos based on their completion status (`All`, `Completed`, `Incomplete`).

### Backend Features:

- API endpoints for managing todos:
  - **GET `/todos`**: Fetch all todos.
  - **POST `/todos`**: Add a new todo.
  - **DELETE `/todos/:id`**: Remove a todo by ID.
  - **PATCH `/todos/:id`**: Toggle the completed status of a todo.
- Uses SQLite for storing todo items.

---

## **Project Setup**

### Prerequisites:

- **Node.js** installed (v18+).
- **SQLite**.

---

### **Frontend Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/momosetti/avalon-lab-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Optional: Configure API proxy in `vite.config.js`:
   ```javascript
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:5000',
         changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, ''),
       },
     },
   }
   ```

---

### **Backend Setup**

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Initialize the SQLite database:

   - A database file (`todos.db`) is created automatically on first run.

4. Start the backend server:

   ```bash
   node server.js
   ```

   The server listens on `http://localhost:3000`.

---

## **File Structure**

### **Frontend**

```
frontend/
├── src/
│   ├── components/
│   │   ├── TodoItem.vue
│   │   └── TodoList.vue
│   ├── stores/
│   │   └── todoStore.js
│   ├── App.vue
│   └── main.js
├── vite.config.js
└── package.json
```

### **Backend**

```
backend/
├── server.js
└── package.json
```

---

## **How to Use**

1. Run both the **frontend** and **backend** servers.
2. Access the application at `http://localhost:5173`.
3. Use the interface to:
   - Add todos using the input field.
   - Toggle the completion status using the checkbox.
   - Remove a todo using the delete button.
   - Filter todos using the dropdown.

---

## Part 4:

Refactored version of the code that follows Vue 3 best practices, including using the Composition API and Pinia for state management. Additionally, I've added proper reactivity and error handling.

### Refactored Code

```markdown
<template>
  <div>
    <h1>Todos</h1>
    <div v-for="todo in todos" :key="todo.id">
      <p>{{ todo.title }}</p>
      <button @click="markDone(todo.id)">Done</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();
const todos = todosStore.todos;

const markDone = (id) => {
  try {
    todosStore.toggleDone(id);
  } catch (error) {
    console.error("Error updating todo status:", error);
  }
};
</script>
```

### Pinia Store (`stores/todos.js`)

```javascript
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTodosStore = defineStore('todos', () => {
  // Reactive state with todos
  const todos = reactive([
    { id: 1, title: 'Learn Vue 3', done: false },
    { id: 2, title: 'Build a to-do app', done: false },
  ])

  // Toggle the 'done' status of a todo
  const toggleDone = (id) => {
    const todo = todos.find((t) => t.id === id)
    if (!todo) {
      throw new Error('Todo not found')
    }
    todo.done = !todo.done
  }

  // Return the state and actions
  return { todos, toggleDone }
})
```

## Part 5: Theoretical Questions

### the advantages of using the Composition API over the Options API in Vue 3:

- Improved Code Organization: The Composition API allows you to group related logic (state, methods, computed properties) together, making it easier to manage complex components.
- Reusability: With the Composition API, you can create reusable functions (composables) that encapsulate logic and can be shared across multiple components.
- Increased Flexibility: It provides more fine-grained control over component behavior, making it easier to handle complex state logic and side effects.

### How the <script setup> Improves the Development Experience in Vue 3:

- Simplified Syntax: The <script setup> syntax reduces boilerplate code, eliminating the need for export default and data, making components more concise and easier to read.
- Automatic Imports: It automatically imports components, composables, and other Vue APIs without the need to manually declare them, streamlining development.
- Cleaner Code: It encourages a cleaner and more intuitive structure, improving the overall developer experience.
