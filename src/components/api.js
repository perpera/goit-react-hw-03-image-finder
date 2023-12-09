import axios from 'axios';
import toast from 'react-hot-toast';

const API_KEY = '39896651-9a027bdc3823726f67ea1473a';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page,
    });

    const response = await axios.get(BASE_URL, { params });
    if (response.data.totalHits === 0) {
      toast.error('No images found. Please try again.');
    }

    return response.data;
  } catch (error) {
    toast.error(
      'An error occured while fetching data. Please try again later.'
    );
  }
};
