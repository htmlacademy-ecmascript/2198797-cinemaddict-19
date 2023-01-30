import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.isWhantToWatch),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.isFavorite),
};

export {filter};
