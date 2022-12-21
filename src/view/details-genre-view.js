import {createElement} from '../render.js';

function createDetailsGenreTemplate(genre) {
  return (`<span class="film-details__genre">${genre}</span>`);
}

export default class DetailsGenreView {
  #element = null;
  #genre = null;

  constructor({genre}) {
    this.#genre = genre;
  }

  get template() {
    return createDetailsGenreTemplate(this.#genre);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
