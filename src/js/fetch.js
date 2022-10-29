const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const PIXABAY_KEY = '13148921-0323c4cb1958202307573e40e';

export async function fetch(query, page) {
  console.log(query);

  try {
    const response = await axios.get(
      `${BASE_URL}?key=${PIXABAY_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
