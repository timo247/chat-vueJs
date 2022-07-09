import { useFetch } from './useFetch.js';
import { API_services_urls } from './Api.js';
import { ref, computed } from "vue";

export const user = ref({
    id: "",
    nom: "",
    online: false
});

export const user_is_connected = computed({
    get: () => user.value.online,
    set: (val) => user.value.online = val
})

export async function checkConnection() {
    //Vérification si l'utilisateur est connecté
    const user_connection_state_query = await useFetch(API_services_urls.check_connection)
    const user_connection_response = await user_connection_state_query.json()
    const user_data = user_connection_response.data

    if (user_data.online == true) {
        user.value = {
            id: user_data.user.id,
            nom: user_data.user.nom,
            online: true
        }
    } else {
        user.value = {
            id: null,
            nom: null,
            online: false
        }
    }
    //console.log("user:", user.value)
    return ("user:", user.value)
}


