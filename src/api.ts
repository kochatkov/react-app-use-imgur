const API_URL = 'https://pixabay.com/api/?key=18049814-e9719222073fd5b9704ba5084';

export const getPhotos = () => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => data)
};

export const getDataFromServer = async () => {

// @ts-ignore
    const data = await Promise(getPhotos());

    return data;
}

