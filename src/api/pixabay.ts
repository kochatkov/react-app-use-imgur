import {stringify} from 'qs';

const API_URL = 'https://pixabay.com/api/?key=18049814-e9719222073fd5b9704ba5084';

export interface GetPhotosOptions {
    page: number;
    image_type?: string;
    q?: string;
    editors_choice?: string[];
    category?: string;
}

export const getPhotos = (options: GetPhotosOptions) => {
   return fetch(`${API_URL}&options=${stringify(options)}`).then(res => res.json())
}