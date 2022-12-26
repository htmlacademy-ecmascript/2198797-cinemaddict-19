import AbstractView from '../framework/view/abstract-view.js';

function createDetailsGenreTemplate(genre) {
  return (`<span class="film-details__genre">${genre}</span>`);
}

export default class DetailsGenreView extends AbstractView{
  #genre = null;

  constructor({genre}) {
    super();
    this.#genre = genre;
  }

  get template() {
    return createDetailsGenreTemplate(this.#genre);
  }
}
