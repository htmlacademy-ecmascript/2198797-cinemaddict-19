import FilterView from '../view/filter-view.js';
import {render, replace, remove} from '../framework/render.js';
import {FilterType, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';


export default class FilterPresenter{
  #filterContainer = null;
  #filtersModel = null;
  #filmsModel = null;
  #filterView = null;


  constructor({filterContainer, filtersModel, filmsModel}){
    this.#filterContainer = filterContainer;
    this.#filtersModel = filtersModel;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init(){

    const prevFilterView = this.#filterView;

    this.#filterView = new FilterView({
      filmsDataCounter: this.#getFilterCounters(),
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if(prevFilterView === null){
      render(this.#filterView, this.#filterContainer );
      return;
    }

    if (this.#filterContainer.contains(prevFilterView.element)) {
      replace(this.#filterView, prevFilterView);
    }
    remove(prevFilterView);
  }

  #getFilterCounters(){
    return {
      watchedCounter: filter[FilterType.WATCHLIST](this.#filmsModel.films).length,
      historyCounter: filter[FilterType.HISTORY](this.#filmsModel.films).length,
      favoritesCounter: filter[FilterType.FAVORITES](this.#filmsModel.films).length,
    };
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
