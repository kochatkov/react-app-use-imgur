import React, { useEffect, useState } from "react";
// import { getDataFromServer, getPhotos } from "./api";
import RecipeReviewCard from "./demo";
import "./App.scss";

const API_URL = 'https://pixabay.com/api/?key=18049814-e9719222073fd5b9704ba5084';

function App() {
    const [photos, getPhotos] = useState([]);

    useEffect(() => {
        fetch(API_URL)
        .then(res => res.json())
            .then(data => {
               const photos = Object.values(data)
               // @ts-ignore
                return getPhotos(photos[2]);
            });
    }, [])

    console.log(photos)

    return (
        <div className="App">
            {photos.length !== 0 ?
                photos.map((photo: any) => (
                    <RecipeReviewCard
                        key={photo.id}
                        // @ts-ignore
                        userImage={photo.userImageURL}
                        user={photo.user}
                        preview={photo.previewURL}
                        tags={photo.tags}
                    />
                )) : 'loading'
            }

        </div>
    );
}

export default App;
