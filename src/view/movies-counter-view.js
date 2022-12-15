import {createElement} from '../render.js';

function createMoviesCounterTemplate() {
  return (`
  <p>130 291 movies inside</p>
  `);
}

export default class MoviesCounterView {
  getTemplate() {
    return createMoviesCounterTemplate();
  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
