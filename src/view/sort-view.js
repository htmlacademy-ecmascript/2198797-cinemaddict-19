import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';


function createSortTemplate() {
  return (`
  <ul class="sort">
    <li><a href="#" class="sort__button" id="${SortType.DEFAULT}" data-sort-type="${SortType.DEFAULT}"}>Sort by default</a></li>
    <li><a href="#" class="sort__button" id="${SortType.BY_DATE}" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" id="${SortType.BY_RATING}" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>
  `);
}

export default class SortView extends AbstractView{

  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }


  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.element.querySelectorAll('a').forEach((elem) => elem.classList.remove('sort__button--active'));
    this.element.querySelector(`#${evt.target.dataset.sortType}`).classList.add('sort__button--active');
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
