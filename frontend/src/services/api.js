/**
 * Unified API Client for CriChax Frontend
 * Handles baseURL, CORS credentials (cookies), Bearer token headers, and auto-refresh on 401.
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  getStoredToken() {
    return localStorage.getItem('crichax_access_token');
  }

  setStoredToken(token) {
    if (token) {
      localStorage.setItem('crichax_access_token', token);
    } else {
      localStorage.removeItem('crichax_access_token');
    }
  }

  clearAuth() {
    localStorage.removeItem('crichax_access_token');
    localStorage.removeItem('crichax_user');
  }

  async request(endpoint, options = {}, isRetry = false) {
    const url = endpoint.startsWith('http') 
      ? endpoint 
      : `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Attach Bearer token if available
    const token = this.getStoredToken();
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
      credentials: 'include', // Ensures cookies (accessToken, refreshToken) are sent & received
    };

    try {
      const response = await fetch(url, config);

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      // If token expired (401) and we haven't retried yet, attempt silent refresh
      if (response.status === 401 && !isRetry && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
        try {
          const refreshRes = await fetch(`${this.baseUrl}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            if (refreshData.accessToken) {
              this.setStoredToken(refreshData.accessToken);
            }
            // Retry the original request once
            return this.request(endpoint, options, true);
          }
        } catch {
          // Refresh failed; clear local cache
          this.clearAuth();
        }
      }

      if (!response.ok) {
        const errorMessage = data?.message || `Request failed with status ${response.status}`;
        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      // Re-throw formatted error
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient(BASE_URL);
export default api;
