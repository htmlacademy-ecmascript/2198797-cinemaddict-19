import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render, remove} from '../framework/render.js';

export default class ShowMoreButtonPresenter{
  #showMoreButtonConteiner = null;
  #showMoreButtonClickHandler = null;
  #showMoreButtonComponent = null;

  constructor({showMoreButtonContainer, showMoreButtonClickHandler}){
    this.#showMoreButtonConteiner = showMoreButtonContainer;
    this.#showMoreButtonClickHandler = showMoreButtonClickHandler;
  }

  init(){
    const prevShowMoreButtonComponent = this.#showMoreButtonComponent;

    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onShowMoreButton: ()=> {
        this.#showMoreButtonClickHandler.call(this);
      }
    });

    if(prevShowMoreButtonComponent === null){
      render(this.#showMoreButtonComponent, this.#showMoreButtonConteiner);
    }
  }

  deleteView(){
    remove(this.#showMoreButtonComponent);
  }

}
