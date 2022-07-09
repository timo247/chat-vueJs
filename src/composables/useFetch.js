export async function useFetch(web_service_url){
    const response = fetch(web_service_url, {
        credentials: 'include'
      });
    return response
}