import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate, convertMinutesToHours} from '../utils.js';

const ACTIVATE_ELEMENT_CLASS = 'film-card__controls-item--active';

function createFilmCardTemplate(film) {
  return (`
  <article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${film.title}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${humanizeDate(film.release, 'YYYY')}</span>
      <span class="film-card__duration">${convertMinutesToHours(film.runningTime)}</span>
      <span class="film-card__genre">${film.genre[0]}</span>
    </p>
    <img src="${film.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${film.description}</p>
    <span class="film-card__comments">${film.comments.length}</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${film.userDetails.isWhantToWatch ? ACTIVATE_ELEMENT_CLASS : ''}" type="button" id="watchlist">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${film.userDetails.isWatched ? ACTIVATE_ELEMENT_CLASS : ''}" type="button" id="watched">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${film.userDetails.isFavorite ? ACTIVATE_ELEMENT_CLASS : ''}" type="button" id="favorite">Mark as favorite</button>
  </div>
</article>
  `);
}

export default class FilmCardView extends AbstractView{
  #film = null;
  #handlerFilmPopup = null;
  #handlerFilmControlButton = null;

  constructor({film, onFilmPopup, onFilmControlButton}) {
    super();
    this.#film = film;
    this.#handlerFilmPopup = onFilmPopup;
    this.#handlerFilmControlButton = onFilmControlButton;

    this.element.querySelector('.film-card__controls').addEventListener('click', this.#FilmControlButtonHandler);
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmPopupHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #filmPopupHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFilmPopup();
  };

  #FilmControlButtonHandler = (evt) =>{
    this.#handlerFilmControlButton(evt.target.id);
  };
}
