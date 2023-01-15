import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate} from '../utils.js';

function createFilmCardTemplate(film) {
  return (`
  <article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${film.title}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${humanizeDate(film.release, 'YYYY')}</span>
      <span class="film-card__duration">${film.runningTime}</span>
      <span class="film-card__genre">${film.genre}</span>
    </p>
    <img src="./images/posters/${film.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${film.description}</p>
    <span class="film-card__comments">${film.comments.length}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>
  `);
}

export default class FilmCardView extends AbstractView{
  #film = null;
  #dataMap = null;
  #handlerFilmPopup = null;
  #handlerFilmControlButton = null;
  #addToWatchList = null;
  #markAsWatched = null;
  #favorite = null;

  constructor({film, dataMap, onFilmPopup, onFilmControlButton}) {
    super();
    this.#film = film;
    this.#dataMap = dataMap;
    this.#handlerFilmPopup = onFilmPopup;
    this.#handlerFilmControlButton = onFilmControlButton;

    this.element.querySelector('.film-card__controls').addEventListener('click', this.#FilmControlButtonHandler);
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmPopupHandler);

    this.#addToWatchList = this.element.querySelector('.film-card__controls-item--add-to-watchlist');
    this.#markAsWatched = this.element.querySelector('.film-card__controls-item--mark-as-watched');
    this.#favorite = this.element.querySelector('.film-card__controls-item--favorite');

    this.#init();

  }

  #init(){

    if(this.#dataMap.isWhantToWatch === 1){
      this.#addToWatchList.classList.add('film-card__controls-item--active');
    } else{
      this.#addToWatchList.classList.remove('film-card__controls-item--active');
    }

    if(this.#dataMap.isWatched === 1){
      this.#markAsWatched.classList.add('film-card__controls-item--active');
    } else{
      this.#markAsWatched.classList.remove('film-card__controls-item--active');
    }

    if(this.#dataMap.isFavorite === 1){
      this.#favorite.classList.add('film-card__controls-item--active');
    } else{
      this.#favorite.classList.remove('film-card__controls-item--active');
    }
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #filmPopupHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFilmPopup();
  };

  #FilmControlButtonHandler = (evt) =>{
    if(evt.target.classList.contains('film-card__controls-item--mark-as-watched')){
      this.#dataMap.isWatched = Math.abs(this.#dataMap.isWatched - 1);
    }
    if(evt.target.classList.contains('film-card__controls-item--add-to-watchlist')){
      this.#dataMap.isWhantToWatch = Math.abs(this.#dataMap.isWhantToWatch - 1);
    }
    if(evt.target.classList.contains('film-card__controls-item--favorite')){
      this.#dataMap.isFavorite = Math.abs(this.#dataMap.isFavorite - 1);
    }
    this.#handlerFilmControlButton(this.#film, this.#dataMap);
  };
}
