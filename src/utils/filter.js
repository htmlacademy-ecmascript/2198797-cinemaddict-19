import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films, userToFilmMap) => films.filter((film) => userToFilmMap.get(film.id).isWhantToWatch),
  [FilterType.HISTORY]: (films, userToFilmMap) => films.filter((film) => userToFilmMap.get(film.id).isWatched),
  [FilterType.FAVORITES]: (films, userToFilmMap) => films.filter((film) => userToFilmMap.get(film.id).isFavorite),
};

export {filter};
