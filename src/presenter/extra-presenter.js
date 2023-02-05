import FilmPresenter from './film-presenter.js';
import ExtraView from '../view/extra-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {sortByRating, sortByComments} from '../utils.js';
import {EXTRAS} from '../const';


export default class ExtraPresenter{

  #filmsContainer = null;

  #filmsPresenterContainer = [];
  #extraViewContainer = [];

  #openPopupHendler = null;
  #updateUserToFilmMapHandler = null;
  #films = null;
  #isRenderBlock = true;

  constructor({openPopupHendler,filmsContainer, updateUserToFilmMapHandler}) {
    this.#openPopupHendler = openPopupHendler;
    this.#filmsContainer = filmsContainer;
    this.#updateUserToFilmMapHandler = updateUserToFilmMapHandler;
  }


  init(films) {
    this.#films = films;

    this.#extraViewContainer.forEach((view) => {
      this.destroy(view);
      this.#filmsPresenterContainer.forEach((filmCard) => filmCard.destroy());
    });
    this.#extraViewContainer = [];
    this.#filmsPresenterContainer = [];
    this.#isRenderBlock = true;

    EXTRAS.forEach((rate) => {
      const filteredFilms = this.#getFilteredFilms(rate);
      if(this.#isRenderBlock){
        this.#extraViewContainer.push(new ExtraView({sectionName: rate}));
        render(this.#extraViewContainer[this.#extraViewContainer.length - 1], this.#filmsContainer, RenderPosition.BEFOREEND);

        filteredFilms.forEach((film) => {this.#filmsPresenterContainer.push(
          new FilmPresenter({
            filmsContainer: this.#extraViewContainer[this.#extraViewContainer.length - 1].element.querySelector('.films-list__container'),
            openPopupHendler: this.#openPopupHendler,
            updateUserToFilmMapHandler: this.#updateUserToFilmMapHandler
          })
        );
        this.#filmsPresenterContainer[this.#filmsPresenterContainer.length - 1].init(film);
        });
      }
    });
  }


  #getFilteredFilms(data){
    const films = [...this.#films];
    let filteredFilms = null;
    switch(data){
      case 'comments':
        filteredFilms = films.sort(sortByComments).slice(0,2);
        if(filteredFilms[0].comments.length === 0){
          this.#isRenderBlock = false;
        }
        break;
      case 'rating':
        filteredFilms = films.sort(sortByRating).slice(0,2);
        if(filteredFilms[0].rating === 0){
          this.#isRenderBlock = false;
        }
        break;
    }
    return filteredFilms;
  }

  setAborting(id){
    this.#filmsPresenterContainer.find((element) => {
      if(element.getId() === id){
        element.setAborting();
      }
    });
  }

  destroy(element) {
    remove(element);
  }

}
