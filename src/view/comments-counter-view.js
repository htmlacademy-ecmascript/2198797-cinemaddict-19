
import AbstractView from '../framework/view/abstract-view.js';

function createCommentsCounterTemplate(commentsCounter) {
  return (`
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCounter}</span></h3>
  `);
}


export default class CommentsCounterView extends AbstractView{

  #commentsCounter = null;

  constructor({commentsCounter}) {
    super();
    this.#commentsCounter = commentsCounter;
  }


  get template() {
    return createCommentsCounterTemplate(this.#commentsCounter);
  }
}
