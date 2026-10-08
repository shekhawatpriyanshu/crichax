import api from './api';

export const getCricketSchedule = async (category = 'all', format = 'all', query = '') => {
  try {
    const response = await api.get(
      `/schedule?category=${encodeURIComponent(category)}&format=${encodeURIComponent(format)}&query=${encodeURIComponent(query)}`
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch cricket schedule:', error);
    throw error;
  }
};

export default {
  getCricketSchedule,
};
