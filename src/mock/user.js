import {createUniqRandomArray, getRandomPositiveInteger} from '../utils.js';
import { FILMS_COUNT } from './films.js';
import {PROFILE_RATINGS} from '../const.js';


export const getMockUser = () => {
  const watchlist = createUniqRandomArray(0, FILMS_COUNT - 1, getRandomPositiveInteger(0, FILMS_COUNT - 1));
  const history = createUniqRandomArray(0, FILMS_COUNT - 1, getRandomPositiveInteger(0, FILMS_COUNT - 1));
  const favorites = createUniqRandomArray(0, FILMS_COUNT - 1, getRandomPositiveInteger(0, FILMS_COUNT - 1));

  let profileRating = null;

  if(history.length > 0 && history.length <= 10){
    profileRating = PROFILE_RATINGS[0];
  }
  if(history.length >= 11 && history.length <= 20){
    profileRating = PROFILE_RATINGS[1];
  }
  if(history.length >= 21){
    profileRating = PROFILE_RATINGS[2];
  }

  return {
    watchlist: watchlist,
    history: history,
    favorites: favorites,
    profileRating: profileRating,
  };
};
