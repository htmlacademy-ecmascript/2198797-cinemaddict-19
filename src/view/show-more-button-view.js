import AbstractView from '../framework/view/abstract-view.js';

function createShowMoreButtonTemplate() {
  return (`
  <button class="films-list__show-more">Show more</button>
  `);
}

export default class ShowMoreButtonView extends AbstractView{
  #handlerShowMoreButton = null;

  constructor({onShowMoreButton}){
    super();
    this.#handlerShowMoreButton = onShowMoreButton;

    this.element.addEventListener('click', this.#showMoreButtonHandler);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  #showMoreButtonHandler = (evt)=> {
    evt.preventDefault();
    this.#handlerShowMoreButton();
  };
}
