import AbstractView from '../framework/view/abstract-view.js';

function createMoviesCounterTemplate(filmsCount) {
  return (`
  <p>${filmsCount} movies inside</p>
  `);
}

export default class MoviesCounterView extends AbstractView{
  #filmsCount = null;

  constructor({filmsCount}){
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return createMoviesCounterTemplate(this.#filmsCount);
  }
}
