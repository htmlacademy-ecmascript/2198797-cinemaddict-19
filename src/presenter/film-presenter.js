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


  init(film) {

    this.#film = film;

    const prevFilmCardView = this.#filmCardView;

    this.#filmCardView = new FilmCardView({
      film: this.#film,
      onFilmPopup: ()=> {
        this.#openPopup.call(this);
      },
      onFilmControlButton: this.#updateUserDetails,
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
    this.#openPopupHendler(this.#film);
  }

  #updateUserDetails = (element) => {
    switch(element){
      case FilterType.WATCHLIST:
        this.#film.userDetails.isWhantToWatch = !this.#film.userDetails.isWhantToWatch;
        break;
      case FilterType.HISTORY:
        this.#film.userDetails.isWatched = !this.#film.userDetails.isWatched;
        break;
      case FilterType.FAVORITES:
        this.#film.userDetails.isFavorite = !this.#film.userDetails.isFavorite;
        break;
    }

    this.#updateUserToFilmMapHandler(
      UserAction.UPDATE_FILM_DETAILS,
      UpdateType.PATCH,
      {film: this.#film});
  };

  setAborting(){
    this.#filmCardView.shake();
  }

  destroy() {
    remove(this.#filmCardView);
  }

}
