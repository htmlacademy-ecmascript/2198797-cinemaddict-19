import {createElement} from '../render.js';

function createMoviesCounterTemplate() {
  return (`
  <p>130 291 movies inside</p>
  `);
}

export default class MoviesCounterView {
  #element = null;

  get template() {
    return createMoviesCounterTemplate();
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
