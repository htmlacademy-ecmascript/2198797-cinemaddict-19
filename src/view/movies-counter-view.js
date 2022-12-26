import {createElement} from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';

function createMoviesCounterTemplate() {
  return (`
  <p>130 291 movies inside</p>
  `);
}

export default class MoviesCounterView extends AbstractView{

  get template() {
    return createMoviesCounterTemplate();
  }
}
