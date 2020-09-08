import React, { useCallback, useEffect, useState } from 'react';
import ReviewCard from './components/ReviewCard';
import './App.scss';
import { Photo, Data } from './interfaces/Photo';
import CircularIndeterminate from './Spinner';
import CheckboxSelect from './components/CheckboxSelect';
import MultipleSelect from './components/MultipleSelect';
import debounce from 'lodash/debounce';
import { getPhotos, GetPhotosOptions } from './api/pixabay';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [option, setOption] = useState<GetPhotosOptions>({ page: 1 });

  useEffect(() => {
    getPhotos(option).then((data: Data) => setPhotos(data.hits));
  }, []);

  const loadMore = () => {
    const newOption = { ...option, page: option.page + 1 };
    setOption(newOption);
    getPhotos(newOption).then((data) => setPhotos(data.hits));
  };

  const filterImageByCategory = (categories: string[]) => {
    const newOption = { ...option, page: 1, category: categories.join(',') };
    setOption(newOption);
    getPhotos(newOption).then((data) => setPhotos(data.hits));
  };

  const updateSearchingApi = useCallback(
    debounce((photos: Photo[]) => {
      setPhotos(photos);
    }, 500),
    []
  );

  const searchingFilter = (e: React.ChangeEvent<{ value: string }>) => {
    const { value } = e.target;

    if (value.length > 100) {
      return;
    }

    const newOption = { ...option, page: 1, q: value };
    setOption(newOption);
    getPhotos(newOption).then((data) => setPhotos(data.hits));
  };

  const filterImageByType = (types: string[]) => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const newOption = { ...option, page: 1, image_type: types.join(',') };
    setOption(newOption);
    getPhotos(newOption).then((data) => setPhotos(data.hits));
  };

  return (
    <div className="App">
      <div className="App__selects">
        <CheckboxSelect filterImageByType={filterImageByType} />
        <MultipleSelect filterImageByCategory={filterImageByCategory} />
        <input type="text" className="App__search" onChange={searchingFilter} />
      </div>
      <div className="App__cards">
        {photos.length !== 0 ? (
          photos.map((photo) => <ReviewCard key={photo.id} photo={photo} />)
        ) : (
          <CircularIndeterminate />
        )}
      </div>
      <div className="App__button-container">
        <button onClick={loadMore} className="App__load-more">
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
