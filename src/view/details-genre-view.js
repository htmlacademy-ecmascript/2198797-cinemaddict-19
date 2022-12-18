import {createElement} from '../render.js';

function createDetailsGenreTemplate(genre) {
  return (`<span class="film-details__genre">${genre}</span>`);
}

export default class DetailsGenreView {

  constructor({genre}){
    this.genre = genre;
  }

  getTemplate() {
    return createDetailsGenreTemplate(this.genre);
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
