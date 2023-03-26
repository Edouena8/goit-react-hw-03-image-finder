export function fetchImages (searchQuery, page) {
    const USER_KEY = '33518692-16d0d1fee549af403d2d26411';
    const PER_PAGE = 12;
    const URL = 'https://pixabay.com/api/';

    return (
        fetch(
            `${URL}?q=${searchQuery}&page=${page}&key=${USER_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`)
        .then(response => {
            if(response.ok) {
                        return response.json();
            }
        
            return Promise.reject(
                new Error(`${searchQuery} not found`)
            );
        })
     );
};
