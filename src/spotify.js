import axios from 'axios';

// Spotify Auth details
const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "bea281ef22d14ed787e18a35f6763fd9";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-library-read", "playlist-read-private"];

// Spotify Login URL
export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;

// Axios API client
const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

// Set the token in the headers for API requests
export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};

export default apiClient;
