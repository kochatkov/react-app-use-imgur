import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import './App.scss';
import { Photo, Data } from './Photo';
import CircularIndeterminate from './Spinner';
import CheckboxSelect from './CheckboxSelect';
import MultipleSelect from './MultipleSelect';

const API_URL = 'https://pixabay.com/api/?key=18049814-e9719222073fd5b9704ba5084';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [count, setCount] = useState(2);
  const [filteredPhotos, setFilteredPhotos] = React.useState<Photo[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Data) => setPhotos(data.hits));
  }, []);

  useEffect(() => {
    setFilteredPhotos([...photos]);
  }, [photos]);

  const loadMore = () => {
    let counter = count;
    fetch(`${API_URL}/&page=${count}`)
      .then((res) => res.json())
      .then((data) => {
        const morePhotos = [...photos, ...data.hits];
        setPhotos(morePhotos);
      });

    counter++;
    setCount(counter);
  };

  console.log(filteredPhotos);

  const filterImageByCategory = (categories: string[]) => {
    categories.map((category) => {
      fetch(`${API_URL}/&category=${category}`)
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data.hits);
        });
    });
  };

  const filterImageByType = (types: string[]) => {
    types.map((type: string) => {
      switch (type) {
        case 'photo':
          setFilteredPhotos([...photos].filter((photo) => photo.type === 'photo'));
          break;
        case 'illustration':
          setFilteredPhotos([...photos].filter((photo) => photo.type === 'illustration'));
          break;
        case 'vector':
          setFilteredPhotos([...photos].filter((photo) => photo.type === 'vector'));
          break;
        default:
          setFilteredPhotos([...photos]);
      }
    });
  };

  return (
    <div className="App">
      <div className="App__selects">
        <CheckboxSelect
          // @ts-ignore
          filterImageByType={filterImageByType}
        />
        <MultipleSelect
          // @ts-ignore
          filterImageByCategory={filterImageByCategory}
        />
        <input type="text" className="App__search" />
      </div>
      <div className="App__cards">
        {filteredPhotos.length !== 0 ? (
          filteredPhotos.map((photo) => <ReviewCard key={photo.id} photo={photo} />)
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
