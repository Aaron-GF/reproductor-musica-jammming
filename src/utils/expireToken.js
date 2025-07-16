export function expireToken() {
  const token = localStorage.getItem('access_token');
  const expiresAt = localStorage.getItem('expires_at');

  if (!token || !expiresAt) return true;

  const isExpired = Date.now() > Number(expiresAt);
  return isExpired;
}
