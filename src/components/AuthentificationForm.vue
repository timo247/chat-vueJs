<script setup>
import { ref } from "vue";
import { useFetch } from '../composables/useFetch.js';
import { API_services_urls } from '../composables/Api.js';

const emit = defineEmits([
    'connect'
])

const userName = ref("");

async function login() {
    await useFetch(`${API_services_urls.login}?user=${encodeURI(userName.value)}`)
    return emit('connect')
}

</script>

<template>
    <div class="auth-form-div">
        <form class="auth-form" @submit.prevent="login()" action="/" method="get">
            <label class="label" for="username">Nom d'utilisateur</label>
            <input class="input username-input" v-model="userName" required placeHolder="Entrez votre nom d'utilisateur.">
            <input class="submit normal-cta connection-submit" type="submit" value="Se connecter">
        </form>
    </div>
</template>

<style>
.auth-form-div {
    margin: 2rem 0 0 0;
}

.auth-form {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 23.4rem;
    height: 10.4rem;
    background: var(--dark-blue);
    border: 0.05rem solid var(--light-blue);
    border-radius: 1.7rem;
    padding: 0 1rem;
}

.label {
    margin: 1rem 0 0 0;
    width: 20rem;
    text-align: left;
    font-weight: calc(400);
    font-size: 1.2rem;
    line-height: 1.4rem;
}

.input {
    box-sizing: border-box;
    height: 2.4rem;
    width: 20rem;
    background: var(--dark-blue);
    border: 0.5px solid white;
    border-radius: 0.2rem;
    padding: 0.5rem;
    margin: 1rem 0 0 0;
    color: white;
    font-weight: 30rem;
    font-size: 1rem;
    line-height: 1.2rem;
}

.input:focus {
    border-color: var(--light-blue);
}

.submit {
    box-sizing: border-box;
    width: 8rem;
    height: 2.2rem;
    border-radius: 1.2rem;
    border: none;
    padding: 0.5rem 0;
    font-weight: 70rem;
    font-size: 1rem;
    line-height: 1.2rem;
    text-align: center;
    cursor: pointer;
}

.normal-cta {
    background-color: var(--light-blue);
    border: none;
    color:white;
}

.normal-cta:hover {
    text-align: center;
    background-color: var(--light-blue-hovered);
}

.connection-submit {
    text-align: center;
    margin: 1rem 0 0 0;
}

.critical-cta {
    background-color: var(--laravel-orange);
    border: transparent;
    color:white;
}

.critical-cta:hover{
    background-color: transparent;
    border: solid 0.1rem var(--laravel-orange);
    color:var(--laravel-orange);
}
</style>