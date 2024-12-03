<template>
  <div class="todo-item" :class="{ completed: completed }">
    <label>
      <input type="checkbox" :checked="completed" @change="emitToggle" />
      <span>{{ title }}</span>
      <slot></slot>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Define props
const { id, title, completed } = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
})

// Define emits
const emit = defineEmits(['toggle'])

// Emit the toggle event when the checkbox is changed
const emitToggle = () => {
  emit('toggle', id)
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
  margin-bottom: 8px;
  transition: background-color 0.3s ease;
}

.todo-item.completed {
  text-decoration: line-through;
  color: gray;
  background-color: #f9f9f9;
}

input[type='checkbox'] {
  margin-right: 8px;
}
</style>
