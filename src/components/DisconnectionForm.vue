<script setup>
import { onUnmounted } from "vue";
import { useFetch } from '../composables/useFetch.js';
import { API_services_urls } from '../composables/Api.js';

 const emit = defineEmits([
    'disconnect'
  ])

  onUnmounted(() => {
    useFetch(API_services_urls.logout)
   });

async function disconnect(){
  await useFetch(API_services_urls.logout)
  return emit("disconnect")
}
</script>

<template>
    <form
    class="disconnection-form"
    @submit.prevent="disconnect()"
    action="#auth">
    <input 
    class="submit critical-cta disconnect-input"
    type="submit" 
    value="Déconnexion">
    </form>
</template>

<style>
.disconnection-form-div {
    z-index: 10;
    position: absolute;
    top: 2.5rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.disconnection-form{
  margin: 0 0 0 0;
}
</style>