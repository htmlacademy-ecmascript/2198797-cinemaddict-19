import AbstractView from '../framework/view/abstract-view.js';

function createMenuTemplate(data) {
  return (`
<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${data.watchedCounter}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${data.historyCounter}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${data.favoritesCounter}</span></a>
</nav>
  `);
}

export default class MenuView extends AbstractView {

  #filmsDataCounter = null;

  constructor({filmsDataCounter}){
    super();
    this.#filmsDataCounter = filmsDataCounter;
  }

  get template() {
    return createMenuTemplate(this.#filmsDataCounter);
  }
}
