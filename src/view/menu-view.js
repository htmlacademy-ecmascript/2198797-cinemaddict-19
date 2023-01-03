import AbstractView from '../framework/view/abstract-view.js';

function createMenuTemplate(user) {
  return (`
<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${user.watchlist.length}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${user.history.length}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${user.favorites.length}</span></a>
</nav>
  `);
}

export default class MenuView extends AbstractView {
  #user = null;

  constructor({user}) {
    super();
    this.#user = user;
  }

  get template() {
    return createMenuTemplate(this.#user);
  }
}
