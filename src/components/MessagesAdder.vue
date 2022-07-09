<script setup>
import { useFetch } from "../composables/useFetch.js"
import { ref } from "vue";
import { API_services_urls } from '../composables/Api.js';
import { checkConnection } from "../composables/Auth.js";


const message = ref('')
const messageForm = ref(null)
async function addMessage() {
    //Vérification que l'utilisateur est connecté
    const connection_check = await checkConnection();
    //Enregistrement du message
    useFetch(`${API_services_urls.add_message}?msg=${encodeURIComponent(message.value)}`);
    console.log('message ajouté:', encodeURI(message.value))
    //Retour du focus au formulaire vidé
    message.value = '';
    messageForm.value.focus();
    messageForm.value.scrollTo();

}
</script>

<template>
    <div class="add-message-div">
        <form class="add-message-form" @submit.prevent="addMessage()" action="#auth">
            <input class="input add-message-input" type="text" ref="messageForm" placeHolder="Ecrivez votre message." v-model="message" />
            <input class="submit normal-cta send-message-input" type="submit" value="Envoyer">
        </form>
    </div>
</template>

<style>
.add-message-div {
    display: flex;
    margin: 1rem 0 0 0;
}

.add-message-form{
    display: flex;
    flex-direction: column;
    width: 30rem;
}

.input.add-message-input {
    margin: 0 0 0 0;
    width: 30rem;
    background: var(--dark-blue);
    border: 0.05rem solid var(--light-blue);
    border-radius:  0.9rem;
}

.send-message-input {
    margin: 0.5rem 0 0 auto;

}
</style>