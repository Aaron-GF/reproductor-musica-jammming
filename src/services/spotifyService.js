import apiInstance from "./apiInstance";

const clientId = "055a20ea891b4c03b8c94ed830fcd1db";
const redirectUrl = window.location.origin + "/";
const scope =
  "user-read-private user-read-email user-read-recently-played user-library-read playlist-modify-public playlist-modify-private";
const authEndpoint = "https://accounts.spotify.com/authorize";

// --- Funciones de Utilidad (PKCE) ---

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

// --- Servicio de Spotify ---

const spotifyService = {
  async login() {
    let codeVerifier = window.localStorage.getItem("code_verifier");
    if (!codeVerifier) {
      codeVerifier = generateRandomString(64);
      window.localStorage.setItem("code_verifier", codeVerifier);
    }

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const authUrl = new URL(authEndpoint);
    const params = {
      response_type: "code",
      client_id: clientId,
      scope: scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUrl,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  },

  async exchangeCodeForToken(code) {
    const codeVerifier = localStorage.getItem("code_verifier");
    if (!codeVerifier) throw new Error("code_verifier missing");

    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUrl,
      code_verifier: codeVerifier,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error exchanging token: ${errorData.error_description}`);
    }

    const data = await response.json();
    const accessToken = data.access_token;

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem(
      "expires_at",
      (Date.now() + data.expires_in * 1000).toString()
    );
    localStorage.removeItem("code_verifier");

    await this.getUserProfile();
    return accessToken;
  },

  async getUserProfile() {
    const { data } = await apiInstance.get("/me");
    localStorage.setItem("user_id", data.id);
    return data;
  },

  async getUserPlaylists(limit = 20) {
    const { data } = await apiInstance.get(`/me/playlists?limit=${limit}`);
    return data.items;
  },

  async getNewReleases(limit = 8) {
    const { data } = await apiInstance.get(
      `/browse/new-releases?limit=${limit}`
    );
    return data.albums.items;
  },

  async getPlaylistTracks(playlistId) {
    const { data } = await apiInstance.get(`/playlists/${playlistId}/tracks`);
    return data.items;
  },

  async searchSongs(query) {
    const { data } = await apiInstance.get(`/search?q=${query}&type=track`);
    return data.tracks.items;
  },

  async createPlaylist(
    userId,
    name,
    description = "Playlist creada con Jammming"
  ) {
    const { data } = await apiInstance.post(`/users/${userId}/playlists`, {
      name,
      description,
      public: true,
    });
    return data;
  },

  async addTracksToPlaylist(playlistId, uris) {
    const { data } = await apiInstance.post(`/playlists/${playlistId}/tracks`, {
      uris,
    });
    return data;
  },
};

export default spotifyService;
