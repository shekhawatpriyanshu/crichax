import api from './api';

export const getTeamRankings = async (category = 'men', format = 'odi') => {
  try {
    const response = await api.get(`/rankings?category=${encodeURIComponent(category)}&format=${encodeURIComponent(format)}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch team rankings:', error);
    throw error;
  }
};

export default {
  getTeamRankings,
};
