import api from './api';

export const getNewsAndVideos = async (type = 'all', category = 'all', query = '') => {
  try {
    const response = await api.get(
      `/news?type=${encodeURIComponent(type)}&category=${encodeURIComponent(category)}&query=${encodeURIComponent(query)}`
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch news and videos:', error);
    throw error;
  }
};

export default {
  getNewsAndVideos,
};
