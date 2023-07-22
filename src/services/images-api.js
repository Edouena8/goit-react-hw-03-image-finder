const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33518692-16d0d1fee549af403d2d26411';

export const fetchImages = async (imageName, page, perPage) => {
  const searchParams = new URLSearchParams({
    q: imageName,
    page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: perPage,
  });
    
    const resp = await fetch(`${BASE_URL}?${searchParams}`);
    console.log(resp)
    if (!resp.ok) {
        Promise.reject(new Error('Something is wrong. Please try again!'));
    }
    const message = resp.json();
    console.log(message)
    return message;
};
