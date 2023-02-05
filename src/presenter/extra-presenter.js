import FilmPresenter from './film-presenter.js';
import MostCommentedView from '../view/most-commented-view.js';
import MostRatedView from '../view/most-rated-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';

import {sortByRating, sortByComments} from '../utils.js';


export default class ExtraPresenter{
  #mostCommentedView = null;
  #mostRatedView = null;
  #filmsContainer = null;

  #mostRatedPresentorContainer = [];
  #mostCommentedPresenterContainer = [];

  #openPopupHendler = null;
  #updateUserToFilmMapHandler = null;
  #films = null;

  constructor({openPopupHendler,filmsContainer, updateUserToFilmMapHandler}) {
    this.#openPopupHendler = openPopupHendler;
    this.#filmsContainer = filmsContainer;
    this.#updateUserToFilmMapHandler = updateUserToFilmMapHandler;
  }


  init(films) {

    this.#films = films;

    if (this.#mostCommentedView !== null){
      this.destroy(this.#mostCommentedView);
      this.#mostCommentedPresenterContainer.forEach((filmCard) => filmCard.destroy());
    }

    if (this.#mostRatedView !== null){
      this.destroy(this.#mostRatedView);
      this.#mostRatedPresentorContainer.forEach((filmCard) => filmCard.destroy());
    }
    const mostCommented = this.#getTwoMostCommentedFilms();
    const mostRated = this.#getTwoMostRatedFilms();

    if(mostRated[0].rating !== 0){
      this.#mostRatedView = new MostRatedView();
      render(this.#mostRatedView, this.#filmsContainer, RenderPosition.BEFOREEND);

      mostRated.forEach((film) => {this.#mostRatedPresentorContainer.push(
        new FilmPresenter({
          filmsContainer: this.#mostRatedView.element.querySelector('.films-list__container'),
          openPopupHendler: this.#openPopupHendler,
          updateUserToFilmMapHandler: this.#updateUserToFilmMapHandler
        })
      );
      this.#mostRatedPresentorContainer[this.#mostRatedPresentorContainer.length - 1].init(film);
      });

    }

    if(mostCommented[0].comments.length !== 0){
      this.#mostCommentedView = new MostCommentedView();
      render(this.#mostCommentedView, this.#filmsContainer, RenderPosition.BEFOREEND);

      mostCommented.forEach((film) => {this.#mostCommentedPresenterContainer.push(
        new FilmPresenter({
          filmsContainer: this.#mostCommentedView.element.querySelector('.films-list__container'),
          openPopupHendler: this.#openPopupHendler,
          updateUserToFilmMapHandler: this.#updateUserToFilmMapHandler
        })
      );
      this.#mostCommentedPresenterContainer[this.#mostCommentedPresenterContainer.length - 1].init(film);
      });
    }
  }


  #getTwoMostCommentedFilms(){
    const films = [...this.#films];
    return films.sort(sortByComments).slice(0,2);
  }

  #getTwoMostRatedFilms(){
    const films = [...this.#films];
    return films.sort(sortByRating).slice(0,2);
  }

  setAborting(id){
    this.#mostRatedPresentorContainer.find((element) => {
      if(element.getId() === id){
        element.setAborting();
      }
    });
    this.#mostCommentedPresenterContainer.find((element) => {
      if(element.getId() === id){
        element.setAborting();
      }
    });
  }

  destroy(element) {
    remove(element);
  }

}
