import MenuView from '../view/menu-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class MenuPresenter{
  #menuContainer = null;

  #menuView = null;

  #dataMap = null;

  constructor({menuContainer}){
    this.#menuContainer = menuContainer;
  }

  init(dataMap){
    this.#dataMap = dataMap;

    const prevMenuView = this.#menuView;

    this.#menuView = new MenuView({
      filmsDataCounter: this.#getMenuCounters(),
    });

    if(prevMenuView === null){
      render(this.#menuView, this.#menuContainer );
      return;
    }

    if (this.#menuContainer.contains(prevMenuView.element)) {
      replace(this.#menuView, prevMenuView);
    }

    remove(prevMenuView);

  }

  #getMenuCounters(){
    let watchedCounter = 0;
    let historyCounter = 0;
    let favoritesCounter = 0;
    this.#dataMap.forEach((element) => {
      watchedCounter = element.isWhantToWatch + watchedCounter;
      historyCounter = element.isWatched + historyCounter;
      favoritesCounter = element.isFavorite + favoritesCounter;
    });

    return {
      watchedCounter: watchedCounter,
      historyCounter: historyCounter,
      favoritesCounter: favoritesCounter,
    };
  }
}
