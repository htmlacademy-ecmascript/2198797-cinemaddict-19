import AbstractView from '../framework/view/abstract-view.js';

function createFilmDetailsContro() {
  return (`
<section class="film-details__controls">
  <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
</section>
  `);
}

export default class FilmDetailsControlView extends AbstractView {

  #dataMap = null;
  #handlerFilmControlButton = null;
  #addToWatchList = null;
  #markAsWatched = null;
  #favorite = null;

  constructor({dataMap ,onFilmControlButton}){
    super();
    this.#handlerFilmControlButton = onFilmControlButton;
    this.#dataMap = dataMap;

    this.#addToWatchList = this.element.querySelector('.film-details__control-button--watchlist');
    this.#markAsWatched = this.element.querySelector('.film-details__control-button--watched');
    this.#favorite = this.element.querySelector('.film-details__control-button--favorite');
    this.element.addEventListener('click', this.#FilmControlButtonHandler);
    this.#init();
  }

  #init(){

    if(this.#dataMap.isWhantToWatch === 1){
      this.#addToWatchList.classList.add('film-details__control-button--active');
    } else{
      this.#addToWatchList.classList.remove('film-details__control-button--active');
    }

    if(this.#dataMap.isWatched === 1){
      this.#markAsWatched.classList.add('film-details__control-button--active');
    } else{
      this.#markAsWatched.classList.remove('film-details__control-button--active');
    }

    if(this.#dataMap.isFavorite === 1){
      this.#favorite.classList.add('film-details__control-button--active');
    } else{
      this.#favorite.classList.remove('film-details__control-button--active');
    }
  }

  #FilmControlButtonHandler = (evt) => {
    if(evt.target.classList.contains('film-details__control-button--watched')){
      this.#dataMap.isWatched = Math.abs(this.#dataMap.isWatched - 1);
    }
    if(evt.target.classList.contains('film-details__control-button--watchlist')){
      this.#dataMap.isWhantToWatch = Math.abs(this.#dataMap.isWhantToWatch - 1);
    }
    if(evt.target.classList.contains('film-details__control-button--favorite')){
      this.#dataMap.isFavorite = Math.abs(this.#dataMap.isFavorite - 1);
    }
    this.#handlerFilmControlButton(this.#dataMap);
  };

  get template() {
    return createFilmDetailsContro();
  }
}