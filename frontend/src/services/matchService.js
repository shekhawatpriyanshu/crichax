import api from './api';

export const getLiveMatches = async () => {
  try {
    const response = await api.get('/matches/live');
    return response;
  } catch (error) {
    console.error('Failed to fetch live matches:', error);
    throw error;
  }
};

export default {
  getLiveMatches,
};
