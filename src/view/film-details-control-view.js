import AbstractView from '../framework/view/abstract-view.js';

const ACTIVATE_ELEMENT_CLASS = 'film-details__control-button--active';

function createFilmDetailsContro(film) {
  return (`
<section class="film-details__controls">
  <button type="button" class="film-details__control-button film-details__control-button--watchlist ${film.userDetails.isWhantToWatch ? ACTIVATE_ELEMENT_CLASS : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button film-details__control-button--watched ${film.userDetails.isWatched ? ACTIVATE_ELEMENT_CLASS : ''}" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button film-details__control-button--favorite ${film.userDetails.isFavorite ? ACTIVATE_ELEMENT_CLASS : ''}" id="favorite" name="favorite">Add to favorites</button>
</section>
  `);
}

export default class FilmDetailsControlView extends AbstractView {

  #film = null;
  #handlerFilmControlButton = null;

  constructor({film ,onFilmControlButton}){
    super();
    this.#handlerFilmControlButton = onFilmControlButton;
    this.#film = film;

    this.element.addEventListener('click', this.#FilmControlButtonHandler);
  }

  #FilmControlButtonHandler = (evt) => {
    if(evt.target.tagName !== 'BUTTON'){
      return;
    }
    const controlElement = this.element.querySelector(`#${evt.target.id}`);
    if(controlElement.classList.contains(ACTIVATE_ELEMENT_CLASS)){
      controlElement.classList.remove(ACTIVATE_ELEMENT_CLASS);
    }else{
      controlElement.classList.add(ACTIVATE_ELEMENT_CLASS);
    }
    this.#handlerFilmControlButton(evt.target.id);
  };

  get template() {
    return createFilmDetailsContro(this.#film);
  }
}
