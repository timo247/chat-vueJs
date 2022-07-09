const base_url = "http://127.0.0.1:8000/api";

export const API_services_urls = {
    login: `${base_url}/login`,
    logout: `${base_url}/logout`,
    check_connection: `${base_url}/check-connection`,
    get_online_users: `${base_url}/online-users`,
    get_messages: `${base_url}/messages`,
    add_message: `${base_url}/messages/add`,
    documentation: `${base_url}/doc` 
}