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
import EmptyListView from '../view/empty-list-view.js';
import {render} from '../render.js';

const FILMS_NUMBER_PER_STEP = 5;

export default class MoviePresenter {
  #siteBodyElement = null;
  #siteMainElement = null;
  #siteHeaderElement = null;
  #siteFooterElement = null;
  #filmsModel = null;
  #showMoreButtonComponent = null;

  #filmsListComponent = new FilmsListView();
  #filmsContainer = this.#filmsListComponent.element.querySelector('.films-list__container');
  #filmsList = this.#filmsListComponent.element.querySelector('.films-list');

  #loadedFilms = [];
  #loadedComments = null;

  #renderFilmCount = FILMS_NUMBER_PER_STEP;

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

  #showMoreButtonClickHandler = () => {
    this.#loadedFilms
      .slice(this.#renderFilmCount, this.#renderFilmCount + FILMS_NUMBER_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderFilmCount += FILMS_NUMBER_PER_STEP;

    if (this.#renderFilmCount >= this.#loadedFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderPopup(film){

    const closePopup = () => {
      this.#siteBodyElement.classList.remove('hide-overflow');
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    document.addEventListener('keydown', escKeyDownHandler);

    const popupView = new PopupView({film,
      onClosePopup: () =>{
        closePopup.call(this);
      }
    });
    render(popupView, this.#siteBodyElement);

    const genresList = popupView.element.querySelector('.genres');
    render(new DetailsGenreView({genre: film.genre}), genresList);

    const commentList = popupView.element.querySelector('.film-details__comments-list');
    for(let i = 0; i < film.comments.length; i++){
      const tmpComment = this.#loadedComments[film.comments[i]];
      render(new CommentFilmView({comment: tmpComment}), commentList);
    }
  }

  #renderFilm(film){

    const openPopup = () => {
      this.#renderPopup(film);
      this.#siteBodyElement.classList.add('hide-overflow');
    };

    const filmCardView = new FilmCardView({film,
      onFilmPopup: ()=> {
        openPopup.call(this);
      }});

    render(filmCardView, this.#filmsContainer);

  }

  #renderBoard(){
    render(new MenuView, this.#siteMainElement);
    render(new FiltersView, this.#siteMainElement);
    render(this.#filmsListComponent, this.#siteMainElement);
    render(new MoviesCounterView, this.#siteFooterElement);
    render(new ProfileRatingView, this.#siteHeaderElement);


    for (let i = 0; i < Math.min(this.#loadedFilms.length, FILMS_NUMBER_PER_STEP); i++) {
      this.#renderFilm(this.#loadedFilms[i]);
    }

    if (this.#loadedFilms.length > FILMS_NUMBER_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({
        onShowMoreButton: ()=> {
          this.#showMoreButtonClickHandler.call(this);
        }
      });
      render(this.#showMoreButtonComponent, this.#filmsList);


    }else{
      render(new EmptyListView, this.#filmsList);
    }
  }
}
