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

export default class MoviePresenter {
  filmsListComponent = new FilmsListView();

  constructor({siteBodyElement, siteMainElement, siteHeaderElement, siteFooterElement, filmsModel}) {
    this.siteBodyElement = siteBodyElement;
    this.siteMainElement = siteMainElement;
    this.siteHeaderElement = siteHeaderElement;
    this.siteFooterElement = siteFooterElement;
    this.filmsModel = filmsModel;
  }

  init() {
    render(new MenuView, this.siteMainElement);
    render(new FiltersView, this.siteMainElement);
    render(this.filmsListComponent, this.siteMainElement);
    render(new MoviesCounterView, this.siteFooterElement);
    render(new ProfileRatingView, this.siteHeaderElement);

    const filmsContainer = document.querySelector('.films-list__container');
    const filmsList = document.querySelector('.films-list');

    this.boardFilms = [...this.filmsModel.getFilms()];
    this.boardComments = this.filmsModel.getComments();
    for(let i = 0; i < 5; i++){
      render(new FilmCardView({film: this.boardFilms[i]}), filmsContainer);
    }

    render(new ShowMoreButtonView, filmsList);

    render(new PopupView({film: this.boardFilms[0]}), this.siteBodyElement);

    const genresList = document.querySelector('.genres');
    render(new DetailsGenreView({genre: this.boardFilms[0].genre}), genresList);

    const commentList = document.querySelector('.film-details__comments-list');
    for(let i = 0; i < this.boardFilms[0].comments.length; i++){
      const tmpComment = this.boardComments[this.boardFilms[0].comments[i]];
      render(new CommentFilmView({comment: tmpComment}), commentList);
    }
  }
}
