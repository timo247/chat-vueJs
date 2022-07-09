<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import AuthentificationForm from './components/AuthentificationForm.vue'
import MessagesAdder from './components/MessagesAdder.vue'
import MessagesDisplayer from './components/MessagesDisplayer.vue'
import DisconnectionForm from './components/DisconnectionForm.vue'
import { user_is_connected, checkConnection } from './composables/Auth.js'
import { onMounted } from "vue";
import { useFetch } from './composables/useFetch.js';
import { API_services_urls } from './composables/Api.js';

onMounted(() => {
  useFetch(API_services_urls.logout)
});

checkConnection()

function focus(selector) {
  document.querySelector(selector).focus()
}

</script>

<template>
  <header class="header">
    <div class="disconnection-form-div" v-if="user_is_connected">
      <disconnection-form @disconnect="checkConnection()"></disconnection-form>
    </div>
    <svg class="app-logo" width="6rem" height="6rem" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 55V8.75C5 7.79167 5.375 6.92708 6.125 6.15625C6.875 5.38542 7.75 5 8.75 5H51.25C52.2083 5 53.0729 5.38542 53.8438 6.15625C54.6146 6.92708 55 7.79167 55 8.75V41.25C55 42.2083 54.6146 43.0729 53.8438 43.8438C53.0729 44.6146 52.2083 45 51.25 45H15L5 55ZM8.75 45.9375L13.4375 41.25H51.25V8.75H8.75V45.9375ZM8.75 8.75V45.9375V8.75Z" fill="#53B5FF" />
    </svg>
    <h1 class="app-title">Laravel mini-chat API</h1>
  </header>
  <div class="auth-page" v-if="!user_is_connected">
    <span class="auth-span">Application de chat en ligne, avec une API Rest Laravel côté serveur et une
      intégration avec VueJs côté client.</span>
    <a class="auth-span a link" href="/" @click.prevent="focus('.username-input')">Connectez-vous pour
      continuer</a>
    <authentification-form @connect="checkConnection()"></authentification-form>
  </div>
  <div v-if="user_is_connected">
    <messages-displayer></messages-displayer>
    <messages-adder></messages-adder>
  </div>
  <a class="auth-span a link" :href="`${API_services_urls.documentation}`">Lire la doc de l'API</a>
</template>

<style>
@media screen and (max-width: 428px) {
  :root {
    font-size: 10px;
  }
}

@media screen and (min-width: 429px) {
  :root {
    font-size: 20px;
  }
}

:root {
  --light-blue: #53B5FF;
  --light-blue-hovered: #2779BD;
  --laravel-orange: #F56655;
  --dark-blue: #182A45;
  --background-color: #1d3257;

  font-family: 'Roboto';
  color: white;
}

.body {
  margin: 0 0 0 0;
  padding: 0 1rem;
  background: linear-gradient(180deg, #1B2E50 0%, #0B0D10 100%);
  min-height: 100vh;
}

#app {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 0 0 0;
  padding: 0 0 2rem 0;
}

.header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.app-logo {
  margin: 2rem 0 0 0;
}

.app-title {
  font-style: normal;
  font-weight: calc(400 * 1rem);
  font-size: 2rem;
  line-height: 2.3rem;
  text-align: center;
  margin: 2rem 0 0 0;
}

.auth-page {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.auth-span {
  width: 30rem;
  font-weight: calc(400 * 1rem);
  font-size: 1.2rem;
  line-height: 1.4rem;
  text-align: center;
  margin: 2rem 0 0 0;
}


.link {
  text-decoration-line: underline;
}

.a {
  color: var(--light-blue);
}

.a:hover {
  color: var(--laravel-orange);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 0.1rem;
}

::-webkit-scrollbar-track {
  background: var(--background-color);
}

::-webkit-scrollbar-thumb {
  background: var(--light-blue);
  width: 0.01rem;
}

::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
