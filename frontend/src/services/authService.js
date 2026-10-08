import api from './api';

export const authService = {
  /**
   * Register a new user
   * @param {Object} data - { name, email, password }
   */
  async register(data) {
    const response = await api.post('/auth/register', data);
    if (response.accessToken) {
      api.setStoredToken(response.accessToken);
    }
    if (response.user) {
      localStorage.setItem('crichax_user', JSON.stringify(response.user));
    }
    return response;
  },

  /**
   * Login user with email and password
   * @param {Object} credentials - { email, password }
   */
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.accessToken) {
      api.setStoredToken(response.accessToken);
    }
    if (response.user) {
      localStorage.setItem('crichax_user', JSON.stringify(response.user));
    }
    return response;
  },

  /**
   * Get current authenticated user session
   */
  async getMe() {
    const response = await api.get('/auth/me');
    if (response.user) {
      localStorage.setItem('crichax_user', JSON.stringify(response.user));
    }
    return response.user;
  },

  /**
   * Log out user and clear stored state & cookies
   */
  async logout() {
    try {
      await api.post('/auth/logout', {});
    } finally {
      api.clearAuth();
    }
  },

  /**
   * Verify backend connection & health
   */
  async checkBackendHealth() {
    const rootUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api\/?$/, '');
    const res = await fetch(`${rootUrl}/`, { method: 'GET' });
    if (!res.ok) throw new Error('Backend health check returned status ' + res.status);
    return await res.json();
  }
};

export default authService;
