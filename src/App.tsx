import React, { useCallback, useEffect, useState } from 'react';
import ReviewCard from './components/ReviewCard';
import './App.scss';
import { Photo, Data } from './interfaces/Photo';
import CircularIndeterminate from './Spinner';
import CheckboxSelect from './components/CheckboxSelect';
import MultipleSelect from './components/MultipleSelect';
import debounce from 'lodash/debounce';
import { getPhotos, GetPhotosOptions } from './api/pixabay';
import { Select } from '@material-ui/core';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [option, setOption] = useState<GetPhotosOptions>({ page: 1 });

  const requestApi = (option: GetPhotosOptions, isAppend?: boolean) => {
    setOption(option);
    setLoading(true);
    getPhotos(option)
      .then((data) => {
        setPhotos(isAppend ? [...photos, ...data.hits] : data.hits);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    return requestApi(option);
  }, []);

  const loadMore = () => {
    requestApi({ ...option, page: option.page + 1 }, true);
  };

  const filterImageByCategory = (categories: string[]) => {
    requestApi({ ...option, page: 1, category: categories.join(',') });
  };

  const updateSearchingApi = useCallback(
    debounce((query: GetPhotosOptions) => {
      return requestApi(query);
    }, 500),
    []
  );

  const searchingFilter = (e: React.ChangeEvent<{ value: string }>) => {
    const { value } = e.target;

    if (value.length > 100) {
      setError(new Error('Too much letters in input'));
      return;
    }

    updateSearchingApi({ ...option, page: 1, q: value });
  };

  const filterImageByType = (types: string[]) => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    requestApi({ ...option, page: 1, image_type: types.join(',') });
  };

  return (
    <div className="App">
      <div className="App__selects">
        <CheckboxSelect filterImageByType={filterImageByType} disabled={loading} />
        <MultipleSelect filterImageByCategory={filterImageByCategory} disabled={loading} />
        <input type="text" className="App__search" onChange={searchingFilter} disabled={loading} />
      </div>
      <div className="App__cards">
        {error && <div>{error.message}</div>}
        {photos.map((photo) => (
          <ReviewCard key={photo.id} photo={photo} />
        ))}
      </div>
      {loading && <CircularIndeterminate />}
      <div className="App__button-container">
        <button onClick={loadMore} className="App__load-more" disabled={loading}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
