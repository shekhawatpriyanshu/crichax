import api from './api';

export const searchPlayers = async (query = '') => {
  try {
    const response = await api.get(`/players/search?query=${encodeURIComponent(query)}`);
    return response.players || [];
  } catch (error) {
    console.error('Failed to search players:', error);
    throw error;
  }
};

export const getPlayerDetails = async (id) => {
  try {
    const response = await api.get(`/players/${encodeURIComponent(id)}`);
    return response.player;
  } catch (error) {
    console.error('Failed to fetch player details:', error);
    throw error;
  }
};

export default {
  searchPlayers,
  getPlayerDetails,
};
