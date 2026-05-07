export const isTokenValid = () => {
  const token = localStorage.getItem('user_token');
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return false;
    const payload = parts[1];
    // base64url -> base64
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(b64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const data = JSON.parse(jsonPayload);
    if (data.exp && typeof data.exp === 'number') {
      return data.exp > Math.floor(Date.now() / 1000);
    }
    return true;
  } catch (e) {
    console.error('Token parse error', e);
    return false;
  }
};

export const clearAuth = () => {
  localStorage.removeItem('user_token');
  localStorage.removeItem('user_info');
};
