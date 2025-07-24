const clientId = '055a20ea891b4c03b8c94ed830fcd1db';
const redirectUrl = 'http://127.0.0.1:5173';
const scope = 'user-read-private user-read-email user-read-recently-played user-library-read playlist-modify-public playlist-modify-private';
const authEndpoint = "https://accounts.spotify.com/authorize";

// Verificador de código
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

// Función para convertir array buffer a base64
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Genera el valor utilizando el algoritmo SHA256
const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

// Generar URL de login
export const generateLoginUrl = async () => {
  let codeVerifier = window.localStorage.getItem('code_verifier');
  if (!codeVerifier) {
    codeVerifier = generateRandomString(64);
    window.localStorage.setItem('code_verifier', codeVerifier);
  }

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const authUrl = new URL(authEndpoint)
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  return authUrl.toString();
};

// Intercambia código por token
export const exchangeCodeForToken = (code) => {
  const codeVerifier = localStorage.getItem('code_verifier');
  if (!codeVerifier) throw new Error('code_verifier missing');

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUrl,
    code_verifier: codeVerifier,
  });

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(`Error exchanging token: ${errorData.error_description}`);
        });
      }
      return response.json();
    })
    .then(data => {
      const accessToken = data.access_token;

      localStorage.setItem('access_token', accessToken); // Añade token a LocalStorage
      const expiresAt = Date.now() + data.expires_in * 1000; // Momento en el que expira el token en ms
      localStorage.setItem('expires_at', expiresAt.toString()); // Añade como string el momento en el que expira
      localStorage.removeItem('code_verifier');

      // Obtener y guardar en almacenamiento local el id del usuario
      return fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('No se pudo obtener el perfil del usuario');
          }
          return res.json();
        })
        .then(userData => {
          localStorage.setItem('user_id', userData.id); // Añade id de usuario a LocalStorage
          return accessToken;
        });
    });
};
