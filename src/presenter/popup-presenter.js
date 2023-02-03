import FilmDetailsControlView from '../view/film-details-control-view.js';
import PopupView from '../view/popup-view.js';
import {render, RenderPosition} from '../framework/render.js';
import {FilterType, UserAction, UpdateType} from '../const.js';

export default class PopupPresenter{
  #updateFilmDetails = null;
  #popupView = null;
  #closePopupHandler = null;
  #submitNewComment = null;

  #film = null;
  #comments = null;
  #filmDetailsControlView = null;
  #siteBodyElement = null;

  constructor({siteBodyElement, updateFilmDetails, closePopupHandler, submitNewComment}) {
    this.#siteBodyElement = siteBodyElement;
    this.#updateFilmDetails = updateFilmDetails;
    this.#closePopupHandler = closePopupHandler;
    this.#submitNewComment = submitNewComment;
  }


  init(film, comments) {
    this.#film = film;
    this.#comments = comments;
    this.#siteBodyElement.classList.add('hide-overflow');

    const closePopup = () => {
      this.#siteBodyElement.classList.remove('hide-overflow');
      this.#closePopupHandler();
    };

    this.#popupView = new PopupView({
      film: this.#film,
      comments: this.#comments,
      onClosePopup: () =>{
        closePopup.call(this);
      },
      updatePopupInfo: this.#updatePopupInfo,
      addNewComment: this.#addNewComment,
      rerenderControlView: this.#rerenderControlView,
    });
    render(this.#popupView, this.#siteBodyElement);
    this.#renderFilmDetailsControlElement();
  }

  updatePopupView(data){
    switch(data.actionType){
      case UserAction.DELETE_COMMENT:
        this.#popupView.updateElement({
          comments: data.comments,
          isDisabled: false,
        });
        this.#rerenderControlView();
        this.#popupView.scrollToViewDelete();
        break;
      case UserAction.UPDATE_FILM:
        this.#rerenderControlView();
        break;
      case UserAction.ADD_COMMENT:
        this.#popupView.updateElement({
          comments: data.comments,
          isDisabled: false,
        });
        this.#rerenderControlView();
        this.#popupView.scrollToViewForma();
        break;
    }
  }


  setDeleting() {
    this.#popupView.updateElement({
      isDisabled: true,
    });
    this.#rerenderControlView();
    this.#popupView.scrollToViewDelete();
  }

  setAddingComment() {
    this.#popupView.updateElement({
      isDisabled: true,
    });
    this.#rerenderControlView();
    this.#popupView.scrollToViewForma();
  }

  setAborting(){
    const resetState = () => {
      this.#popupView.updateElement({
        isDisabled: false,
      });
      this.#rerenderControlView();
    };
    
    this.#popupView.shake(resetState);
  }

  #renderFilmDetailsControlElement(){
    const containerForControlView = this.#popupView.element.querySelector('.film-details__top-container');
    this.#filmDetailsControlView = new FilmDetailsControlView({
      film:this.#film,
      onFilmControlButton: this.#updateUserDetails});
    render(this.#filmDetailsControlView, containerForControlView, RenderPosition.BEFOREEND);
  }

  #updateUserDetails = (element) => {
    switch(element){
      case FilterType.WATCHLIST:
        this.#film.userDetails.isWhantToWatch = !this.#film.userDetails.isWhantToWatch;
        break;
      case FilterType.HISTORY:
        this.#film.userDetails.isWatched = !this.#film.userDetails.isWatched;
        break;
      case FilterType.FAVORITES:
        this.#film.userDetails.isFavorite = !this.#film.userDetails.isFavorite;
        break;
    }
    this.#updateFilmDetails(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {film: this.#film});
  };

  #rerenderControlView = () => {
    this.#filmDetailsControlView.element.remove();
    this.#filmDetailsControlView.removeElement();
    this.#renderFilmDetailsControlElement();
  };

  #updatePopupInfo = (actionType,update) => {
    this.#updateFilmDetails(
      actionType,
      UpdateType.PATCH,
      update);
  };

  #addNewComment = (actionType, update) => {
    this.#submitNewComment(
      actionType,
      UpdateType.PATCH,
      update
    );
  };

}
