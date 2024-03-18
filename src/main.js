import './assets/style.css';

import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');

const themeToggle = document.querySelector('.btn-theme-toggle');
const html = document.querySelector('html');

themeToggle.addEventListener('click', () => {
  if (html.getAttribute('data-theme') === 'light') {
    html.setAttribute('data-theme', 'dark');
  } else if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
  }
});
