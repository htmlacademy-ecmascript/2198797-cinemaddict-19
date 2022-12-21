import FiltersView from '../view/filters-view.js';
import MenuView from '../view/menu-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import MoviesCounterView from '../view/movies-counter-view';
import ProfileRatingView from '../view/profile-rating-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';
import CommentFilmView from '../view/comment-film-view.js';
import DetailsGenreView from '../view/details-genre-view.js';
import {render} from '../render.js';

const FILMS_NUMBER = 5;

export default class MoviePresenter {
  #siteBodyElement = null;
  #siteMainElement = null;
  #siteHeaderElement = null;
  #siteFooterElement = null;
  #filmsModel = null;

  #filmsListComponent = new FilmsListView();
  #filmsContainer = this.#filmsListComponent.element.querySelector('.films-list__container');
  #filmsList = this.#filmsListComponent.element.querySelector('.films-list');

  #loadedFilms = [];
  #loadedComments = null;

  constructor({siteBodyElement, siteMainElement, siteHeaderElement, siteFooterElement, filmsModel}) {
    this.#siteBodyElement = siteBodyElement;
    this.#siteMainElement = siteMainElement;
    this.#siteHeaderElement = siteHeaderElement;
    this.#siteFooterElement = siteFooterElement;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#loadedFilms = [...this.#filmsModel.films];
    this.#loadedComments = this.#filmsModel.comments;

    this.#renderBoard();
  }

  #renderPopup(film){
    const popupView = new PopupView({film});
    render(popupView, this.#siteBodyElement);

    const genresList = popupView.element.querySelector('.genres');
    render(new DetailsGenreView({genre: film.genre}), genresList);

    const commentList = popupView.element.querySelector('.film-details__comments-list');
    for(let i = 0; i < film.comments.length; i++){
      const tmpComment = this.#loadedComments[film.comments[i]];
      render(new CommentFilmView({comment: tmpComment}), commentList);
    }

    const closePopup = () => {
      popupView.element.parentElement.removeChild(popupView.element);
      popupView.removeElement();
      this.#siteBodyElement.classList.remove('hide-overflow');
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    popupView.element.querySelector('.film-details__close-btn').addEventListener('click', () =>{
      closePopup();
    });

    document.addEventListener('keydown', escKeyDownHandler);
  }

  #renderFilm(film){
    const filmCardView = new FilmCardView({film});
    render(filmCardView, this.#filmsContainer);

    const openPopup = () => {
      this.#renderPopup(film);
      this.#siteBodyElement.classList.add('hide-overflow');
    };

    filmCardView.element.querySelector('.film-card__link').addEventListener('click', () => {
      openPopup();
    });
  }

  #renderBoard(){
    render(new MenuView, this.#siteMainElement);
    render(new FiltersView, this.#siteMainElement);
    render(this.#filmsListComponent, this.#siteMainElement);
    render(new MoviesCounterView, this.#siteFooterElement);
    render(new ProfileRatingView, this.#siteHeaderElement);

    for(let i = 0; i < FILMS_NUMBER; i++){
      this.#renderFilm(this.#loadedFilms[i]);
    }
    render(new ShowMoreButtonView, this.#filmsList);
  }
}
