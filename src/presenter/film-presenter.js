import FilmCardView from '../view/film-card-view.js';
import {render, replace, remove} from '../framework/render.js';


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

  #updateMap = (film, dataMap) => {
    this.#updateUserToFilmMapHandler(film, dataMap);
  };

}
