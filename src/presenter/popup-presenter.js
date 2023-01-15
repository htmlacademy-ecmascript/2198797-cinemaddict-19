import CommentFilmView from '../view/comment-film-view.js';
import DetailsGenreView from '../view/details-genre-view.js';
import FilmDetailsControlView from '../view/film-details-control-view.js';
import PopupView from '../view/popup-view.js';
import {render, RenderPosition, replace, remove} from '../framework/render.js';


export default class PopupPresenter{
  #updateUserToFilmMapHandler = null;
  #popupView = null;
  #closePopupHandler = null;

  #film = null;
  #comments = null;
  #dataMap = null;
  #filmDetailsControlView = null;
  #siteBodyElement = null;

  constructor({siteBodyElement, updateUserToFilmMapHandler, closePopupHandler}) {
    this.#siteBodyElement = siteBodyElement;
    this.#updateUserToFilmMapHandler = updateUserToFilmMapHandler;
    this.#closePopupHandler = closePopupHandler;
  }


  init(film, dataMap, comments) {
    this.#film = film;
    this.#comments = comments;
    this.#dataMap = dataMap;

    this.#renderPopup();
  }

  #renderGenresList(){
    const genresList = this.#popupView.element.querySelector('.genres');
    render(new DetailsGenreView({genre: this.#film.genre}), genresList);
  }

  #renderCommentsList(){
    const commentList = this.#popupView.element.querySelector('.film-details__comments-list');
    for(let i = 0; i < this.#comments.length ; i++){
      render(new CommentFilmView({comment: this.#comments[i]}), commentList);
    }
  }

  #renderFilmDetailsControlElement(){
    const containerForControlView = this.#popupView.element.querySelector('.film-details__top-container');
    const preveusFilmDetailsControlView = this.#filmDetailsControlView;

    this.#filmDetailsControlView = new FilmDetailsControlView({
      dataMap:this.#dataMap,
      onFilmControlButton: this.#updateMap});

    if(preveusFilmDetailsControlView === null){
      render(this.#filmDetailsControlView, containerForControlView, RenderPosition.BEFOREEND);
      return;
    }
    if (containerForControlView.contains(preveusFilmDetailsControlView.element)) {
      replace(this.#filmDetailsControlView, preveusFilmDetailsControlView);
    }
    remove(preveusFilmDetailsControlView);
  }

  #renderPopup(){
    this.#siteBodyElement.classList.add('hide-overflow');

    const closePopup = () => {
      this.#siteBodyElement.classList.remove('hide-overflow');
      this.#closePopupHandler();
    };

    this.#popupView = new PopupView({
      film: this.#film,
      dataMap: this.#dataMap,
      onClosePopup: () =>{
        closePopup.call(this);
      },
      onFilmControlButton: this.#updateMap,
    });
    render(this.#popupView, this.#siteBodyElement);

    this.#renderGenresList();
    this.#renderCommentsList();
    this.#renderFilmDetailsControlElement();
  }


  #updateMap = (dataMap) => {
    this.#updateUserToFilmMapHandler(this.#film, dataMap);
    this.#renderFilmDetailsControlElement();
  };

}
