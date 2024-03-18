<template>
  <div class="list__cont">
    <ul>
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="{ completed: todo.status === 'completed' }"
        @click="toggleComplete(todo.id)"
        @dragstart="handleDragStart(todos.indexOf(todo))"
        @dragover.prevent="handleDragOver(todos.indexOf(todo))"
        @drop.prevent="handleDrop"
        draggable="true"
      >
        {{ todo.text }}
        <button class="btn-delete-todo" @click="deleteTodo(todo.id)">
          <img src="../assets/images/icon-cross.svg" alt="cross icon" />
        </button>
      </li>
    </ul>
    <div class="list__utilities">
      <span class="list__todos-count">{{ todosCount }} items</span>

      <button class="btn" @click="clearCompleted">Clear Completed</button>
    </div>
  </div>
  <div class="list__filters">
    <button
      class="btn btn-filter"
      @click="filterAll"
      :class="{ active: filterStatus === null }"
    >
      All
    </button>
    <button
      class="btn btn-filter"
      @click="filterActive"
      :class="{ active: filterStatus === 'active' }"
    >
      Active
    </button>
    <button
      class="btn btn-filter"
      @click="filterCompleted"
      :class="{ active: filterStatus === 'completed' }"
    >
      Completed
    </button>
  </div>
  <p>Drag and drop to reorder list</p>
</template>

<script setup>
import { ref, computed } from 'vue';

const filterStatus = ref(null);

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits([
  'toggleComplete',
  'clearCompleted',
  'deleteTodo',
  'handleDragStart',
  'handleDragOver',
  'handleDrop',
]);

const filteredTodos = computed(() => {
  if (!filterStatus.value) {
    return props.todos;
  }
  return props.todos.filter((todo) => todo.status === filterStatus.value);
});

const todosCount = computed(() => {
  return filteredTodos.value.length.toString();
});

function filterAll(e) {
  filterStatus.value = null;
}

function filterActive() {
  filterStatus.value = 'active';
}

function filterCompleted() {
  filterStatus.value = 'completed';
}

function clearCompleted() {
  emits('clearCompleted');
}

function toggleComplete(id) {
  emits('toggleComplete', id);
}

function deleteTodo(id) {
  emits('deleteTodo', id);
}

function handleDragStart(index) {
  emits('handleDragStart', index);
}

function handleDragOver(index) {
  emits('handleDragOver', index);
}

function handleDrop() {
  emits('handleDrop');
}
</script>
