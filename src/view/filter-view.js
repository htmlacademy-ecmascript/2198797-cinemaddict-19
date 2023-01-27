import AbstractView from '../framework/view/abstract-view.js';

const ACTIVATION = 'main-navigation__item--active';

function createFilterTemplate(data, filter) {
  return (`
<nav class="main-navigation">
  <a href="#all" id="all" class="main-navigation__item ${filter === 'all' ? ACTIVATION : ''}">All movies</a>
  <a href="#watchlist" id="watchlist" class="main-navigation__item ${filter === 'watchlist' ? ACTIVATION : ''}">Watchlist <span class="main-navigation__item-count">${data.watchedCounter}</span></a>
  <a href="#history" id="watched" class="main-navigation__item ${filter === 'watched' ? ACTIVATION : ''}">History <span class="main-navigation__item-count">${data.historyCounter}</span></a>
  <a href="#favorites" id="favorite" class="main-navigation__item ${filter === 'favorite' ? ACTIVATION : ''}">Favorites <span class="main-navigation__item-count">${data.favoritesCounter}</span></a>
</nav>
  `);
}

export default class MenuView extends AbstractView {

  #filmsDataCounter = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;


  constructor({filmsDataCounter, currentFilterType, onFilterTypeChange}){
    super();
    this.#filmsDataCounter = filmsDataCounter;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filmsDataCounter, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.id);
  };
}
