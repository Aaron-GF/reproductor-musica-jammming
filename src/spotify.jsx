import axios from 'axios';

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "055a20ea891b4c03b8c94ed830fcd1db";
const redirectUri = "http://127.0.0.1:5173";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginUrl = `${authEndpoint}client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=code&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;