<script setup>
import { useFetch } from "../composables/useFetch.js"
import { ref, onMounted, onUnmounted, nextTick, watchEffect } from "vue";
import { API_services_urls } from '../composables/Api.js';
import { checkConnection, user } from "../composables/Auth.js";
import { dateToHours } from "../composables/Dates.js";

const messagerie = ref(null)
const messages = ref([])
const stored_messages = new Set()
const online_users = ref([])
const chat = ref(null)
const timerFetchNewMsg = setInterval(fetchNewMsg, 2500);
const repositionMessagesTimer = setInterval(repositionMessages, 500);
const timerFetchNewUser = setInterval(fetchConnectedUsers, 15000);

onUnmounted(() => {
    clearInterval(repositionMessagesTimer)
    clearInterval(timerFetchNewMsg);
    clearInterval(timerFetchNewUser);
});

onMounted(async () => {
    addWelcomeMessage();
    await fetchConnectedUsers();
    await fetchNewMsg();
});

function repositionMessages() {
    const chat_messages = document.querySelectorAll('.message-div');
    chat_messages.forEach(message => {
        if (message.dataset.user == user.value.id) {
            message.classList.add('current-user-message')
        } else {
            message.classList.add('other-user-message')
        }
    });

    //Scroll automatique vers dernier message
}

async function fetchNewMsg() {
    //Récupération des messages
    const connection_check = await checkConnection();
    const messages_query = await useFetch(API_services_urls.get_messages);
    const messages_response = await messages_query.json();
    const messages_data = await messages_response.data

    if (messages_data[0] != undefined) {
        messages_data.forEach(chatMessage => {
            if (!stored_messages.has(chatMessage.id)) {
                stored_messages.add(chatMessage.id)
                messages.value.push(chatMessage)
            }
        });
    }
}

async function fetchConnectedUsers() {
    const response = await useFetch(API_services_urls.get_online_users)
    const online_users_response = await response.json();
    online_users.value = await online_users_response.data;
}

function addWelcomeMessage() {
    const welcome_message = {
        user_id: 1,
        username: "Amelia bot",
        message: `Bienvenue sur ce mini chat ${user.value.nom}. Je me réjouis de lire tes messages.`,
        created_at: dateToHours(new Date())
    }
    messages.value.push(welcome_message);
}

watchEffect(async () => {
    if (messages.value?.length > 0) {
        await nextTick();
        repositionMessages();
        console.log("top scrooll", messagerie.value.scrollTop, "height", messagerie.value.scrollHeight)
        messagerie.value.scrollTop = messagerie.value.scrollHeight;
    }
});

</script>

<template>
    <div class="online-users-div">
        <h2 class="sub-header">Utilisateurs en ligne</h2>
        <div class="online-users">
            <div class="online-user" v-for="user in online_users">
                <span class="material-icons user-face">face</span><span class="user-name-users-div">{{ user.nom
                }}</span><br />
            </div>
        </div>
    </div>
    <div class="messagerie-div  inner-scrollbar" ref="messagerie">
        <div class="message-div" ref="chat" v-for="chatMessage in messages" :data-user="chatMessage.user_id">
            <span class="username-span">{{ chatMessage.username }}</span>
            <span class="message-content-span">{{ chatMessage.message }}</span>
            <span class="message-date">{{ chatMessage.created_at }}</span>
        </div>
    </div>
</template>

<style>
.online-users-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0 0 0;
    padding: 0 1rem;
}

.sub-header {
    font-weight: 50rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: white;
}

.online-users {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 0 0;
    padding: 0 1rem;
}

.online-user {
    display: flex;
    flex-direction: column;
    width: 4.5rem;
    height: 5.7rem;
    margin: 0 0.5rem;
}

.user-face {
    text-align: center;
    color: var(--light-blue);
}

.user-name-users-div {
    text-align: center;
}

.messagerie-div {
    display: flex;
    flex-direction: column;
    margin: 2rem 0 0 0;
    padding: 0 0 1rem 0;
    box-sizing: border-box;
    width: 30rem;
    height: 23.2rem;
    border: 0.05rem solid var(--light-blue);
    border-radius: 0.9rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.inner-scrollbar::-webkit-scrollbar {
    width: 0.05rem;
}

.inner-scrollbar::-webkit-scrollbar-thumb {
    background: white;
}

.message-div {
    /* Rectangle 6 */
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 25.7rem;
    padding: 0 0.5rem 0.5rem 0.5rem;
    margin: 1rem 0 0 1rem;
    background: var(--dark-blue);
    border-radius: 0.04rem;
}

.message-div.other-user-message {
    margin: 1rem 0 0 1rem;
}

.message-div.current-user-message {
    margin: 1rem 1rem 0 auto;
}

.username-span {
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.2rem;
    color: var(--light-blue);
    margin: 0.5rem 0 0 0;
}

.message-content-span {
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.2rem;
}

.message-date {
    margin: 0.5rem 0 0 0;
    font-weight: 300;
    font-size: 8px;
    line-height: 9px;
}
</style>