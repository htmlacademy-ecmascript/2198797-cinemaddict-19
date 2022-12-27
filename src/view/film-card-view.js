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
  #handlerFilmPopup = null;

  constructor({film, onFilmPopup}) {
    super();
    this.#film = film;
    this.#handlerFilmPopup = onFilmPopup;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmPopupHandler);

  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #filmPopupHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFilmPopup();
  };
}
