import FilmDetailsControlView from '../view/film-details-control-view.js';
import PopupView from '../view/popup-view.js';
import {render, RenderPosition} from '../framework/render.js';
import {FilterType} from '../const.js';

export default class PopupPresenter{
  #updateUserToFilmMapHandler = null;
  #popupView = null;
  #closePopupHandler = null;

  #film = null;
  #comments = null;
  #dataMap = null;
  #filmDetailsControlView = null;
  #siteBodyElement = null;

  constructor({siteBodyElement, updateUserToFilmMapHandler, closePopupHandler}) {
    this.#siteBodyElement = siteBodyElement;
    this.#updateUserToFilmMapHandler = updateUserToFilmMapHandler;
    this.#closePopupHandler = closePopupHandler;
  }


  init(film, dataMap, comments) {
    this.#film = film;
    this.#comments = comments;
    this.#dataMap = dataMap;

    this.#siteBodyElement.classList.add('hide-overflow');

    const closePopup = () => {
      this.#siteBodyElement.classList.remove('hide-overflow');
      this.#closePopupHandler();
    };

    this.#popupView = new PopupView({
      film: this.#film,
      comments: this.#comments,
      dataMap: this.#dataMap,
      onClosePopup: () =>{
        closePopup.call(this);
      },
      onFilmControlButton: this.#updateMap,
      rerenderPopup: this.#rerenderPopup,
    });
    render(this.#popupView, this.#siteBodyElement);
    this.#renderFilmDetailsControlElement();
  }

  #renderFilmDetailsControlElement(){
    const containerForControlView = this.#popupView.element.querySelector('.film-details__top-container');
    this.#filmDetailsControlView = new FilmDetailsControlView({
      dataMap:this.#dataMap,
      onFilmControlButton: this.#updateMap});
    render(this.#filmDetailsControlView, containerForControlView, RenderPosition.BEFOREEND);
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
    this.#updateUserToFilmMapHandler(this.#film, this.#dataMap);
  };

  #rerenderPopup = () => {
    this.#renderFilmDetailsControlElement();
  };
}
