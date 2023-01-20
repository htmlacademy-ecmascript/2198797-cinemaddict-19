import AbstractView from '../framework/view/abstract-view.js';

const ACTIVATE_ELEMENT_CLASS = 'film-details__control-button--active';

function createFilmDetailsContro(dataMap) {
  return (`
<section class="film-details__controls">
  <button type="button" class="film-details__control-button film-details__control-button--watchlist ${ACTIVATE_ELEMENT_CLASS.repeat(dataMap.isWhantToWatch)}" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button film-details__control-button--watched ${ACTIVATE_ELEMENT_CLASS.repeat(dataMap.isWatched)}" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button film-details__control-button--favorite ${ACTIVATE_ELEMENT_CLASS.repeat(dataMap.isFavorite)}" id="favorite" name="favorite">Add to favorites</button>
</section>
  `);
}

export default class FilmDetailsControlView extends AbstractView {

  #dataMap = null;
  #handlerFilmControlButton = null;

  constructor({dataMap ,onFilmControlButton}){
    super();
    this.#handlerFilmControlButton = onFilmControlButton;
    this.#dataMap = dataMap;

    this.element.addEventListener('click', this.#FilmControlButtonHandler);
  }

  #FilmControlButtonHandler = (evt) => {
    const controlElement = this.element.querySelector(`#${evt.target.id}`);
    if(controlElement.classList.contains(ACTIVATE_ELEMENT_CLASS)){
      controlElement.classList.remove(ACTIVATE_ELEMENT_CLASS);
    }else{
      controlElement.classList.add(ACTIVATE_ELEMENT_CLASS);
    }
    this.#handlerFilmControlButton(evt.target.id);
  };

  get template() {
    return createFilmDetailsContro(this.#dataMap);
  }
}
