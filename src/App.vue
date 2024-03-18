<template>
  <AddTodo @submitForm="addTodo" />
  <TodoList
    :todos="todos"
    @toggleComplete="toggleComplete"
    @clearCompleted="clearCompletedTodos"
    @deleteTodo="deleteTodo"
    @handleDragStart="handleDragStart"
    @handleDragOver="handleDragOver"
    @handleDrop="handleDrop"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';

const todos = ref([]);
let draggedIndex = null;
let dragTargetIndex = null;

function addTodo(newTodo) {
  todos.value.unshift(newTodo);
  updateLocalStorage();
}

function toggleComplete(id) {
  const selectedTodo = todos.value.find((todo) => todo.id === id);

  selectedTodo.status =
    selectedTodo.status === 'active' ? 'completed' : 'active';

  updateLocalStorage();
}

function clearCompletedTodos() {
  todos.value = todos.value.filter((todo) => todo.status != 'completed');

  updateLocalStorage();
}

function deleteTodo(id) {
  todos.value = todos.value.filter((todo) => todo.id != id);

  updateLocalStorage();
}

function handleDragStart(index) {
  draggedIndex = index;
}

function handleDragOver(index) {
  dragTargetIndex = index;
}

function handleDrop() {
  //destructuring swapping
  [todos.value[draggedIndex], todos.value[dragTargetIndex]] = [
    todos.value[dragTargetIndex],
    todos.value[draggedIndex],
  ];

  updateLocalStorage();

  draggedIndex = null;
  dragTargetIndex = null;
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos.value));
}

onMounted(() => {
  if (localStorage.getItem('todos')) {
    todos.value = JSON.parse(localStorage.getItem('todos'));
  }
});
</script>
