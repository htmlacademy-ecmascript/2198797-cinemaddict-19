import FilmCardView from '../view/film-card-view.js';
import {render, replace, remove} from '../framework/render.js';
import {FilterType, UserAction, UpdateType} from '../const.js';


export default class FilmPresenter{
  #filmsContainer = null;

  #openPopupHendler = null;
  #updateUserToFilmMapHandler = null;

  #filmCardView = null;
  #film = null;
  #dataMap = null;

  constructor({openPopupHendler,filmsContainer, updateUserToFilmMapHandler}) {
    this.#openPopupHendler = openPopupHendler;
    this.#filmsContainer = filmsContainer;
    this.#updateUserToFilmMapHandler = updateUserToFilmMapHandler;
  }


  init(film, dataMap) {

    this.#film = film;
    this.#dataMap = dataMap;

    const prevFilmCardView = this.#filmCardView;

    this.#filmCardView = new FilmCardView({
      film: this.#film,
      dataMap: this.#dataMap,
      onFilmPopup: ()=> {
        this.#openPopup.call(this);
      },
      onFilmControlButton: this.#updateMap,
    });

    if(prevFilmCardView === null){
      render(this.#filmCardView, this.#filmsContainer);
      return;
    }

    if (this.#filmsContainer.contains(prevFilmCardView.element)) {
      replace(this.#filmCardView, prevFilmCardView);
    }

    remove(prevFilmCardView);
  }

  getId(){
    return this.#film.id;
  }

  #openPopup(){
    this.#openPopupHendler(this.#film, this.#dataMap);
  }

  #updateMap = (element) => {
    switch(element){
      case FilterType.WATCHLIST:
        this.#dataMap.isWhantToWatch = Math.abs(this.#dataMap.isWhantToWatch - 1);
        break;
      case FilterType.HISTORY:
        this.#dataMap.isWatched = Math.abs(this.#dataMap.isWatched - 1);
        break;
      case FilterType.FAVORITES:
        this.#dataMap.isFavorite = Math.abs(this.#dataMap.isFavorite - 1);
        break;
    }

    this.#updateUserToFilmMapHandler(
      UserAction.UPDATE_FILM_DETAILS,
      UpdateType.PATCH,
      {film: this.#film, dataMap: this.#dataMap});
  };

  destroy() {
    remove(this.#filmCardView);
  }

}
