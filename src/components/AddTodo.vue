<template>
  <form @submit.prevent="addTodo">
    <div class="form-control">
      <input
        type="text"
        name="todo"
        ref="todoInput"
        id="todo-input"
        class="form__input"
        placeholder="Create a new todo..."
      />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const todoInput = ref(null);

const emits = defineEmits(['submitForm']);

function addTodo() {
  const newTodo = {
    id: new Date().toISOString(),
    text: todoInput.value.value,
    status: 'active',
  };

  emits('submitForm', newTodo);

  todoInput.value.value = '';
}
</script>
