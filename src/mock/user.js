import {getRandomPositiveInteger} from '../utils.js';


export const getUserInfo = () => {
  const isWatched = getRandomPositiveInteger(0,1);
  const isFavorite = getRandomPositiveInteger(0,1);
  let isWhantToWatch = getRandomPositiveInteger(0,1) - isWatched;
  if(isWhantToWatch < 0){
    isWhantToWatch = 0;
  }

  return {
    isWatched: isWatched,
    isWhantToWatch: isWhantToWatch,
    isFavorite: isFavorite
  };
};

