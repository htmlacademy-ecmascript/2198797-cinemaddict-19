import FilmDetailsControlView from '../view/film-details-control-view.js';
import PopupView from '../view/popup-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import CommentsCounterView from '../view/comments-counter-view.js';
import {render, RenderPosition} from '../framework/render.js';
import {FilterType, UserAction, UpdateType} from '../const.js';

export default class PopupPresenter{
  #updateFilmDetails = null;
  #popupView = null;
  #closePopupHandler = null;

  #commentsViewCollection = new Map();
  #containerForCommentsView = null;
  #currentDeletingComment = null;

  #newCommentViewForm = null;
  #containerForNewCommentForm = null;

  #commentsCounterView = null;

  #filmDetailsControlView = null;


  #film = null;
  #comments = null;
  #siteBodyElement = null;

  constructor({siteBodyElement, updateFilmDetails, closePopupHandler}) {
    this.#siteBodyElement = siteBodyElement;
    this.#updateFilmDetails = updateFilmDetails;
    this.#closePopupHandler = closePopupHandler;
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
      onClosePopup: () =>{
        closePopup.call(this);
      },
    });
    render(this.#popupView, this.#siteBodyElement);

    this.#containerForCommentsView = this.#popupView.element.querySelector('.film-details__comments-list');
    this.#containerForNewCommentForm = this.#popupView.element.querySelector('.film-details__comments-wrap');

    this.#renderFilmDetailsControlElement();
    this.#renderCommentsCounter();
    this.#renderComments();
    this.#renderNewCommentForm();
  }


  updatePopupView(data){
    this.#film = data.film;
    this.#comments = data.comments;
    switch(data.actionType){
      case UserAction.DELETE_COMMENT:
        this.#rerenderCommentsCounter();
        this.#commentsViewCollection.get(this.#currentDeletingComment).element.remove();
        this.#commentsViewCollection.get(this.#currentDeletingComment).removeElement();
        this.#currentDeletingComment = null;
        break;

      case UserAction.ADD_COMMENT:
        this.#commentsViewCollection.forEach((comment) => {
          comment.element.remove();
          comment.removeElement();
        });
        this.#rerenderCommentsCounter();
        this.#renderComments();
        this.#newCommentViewForm.updateElement({
          isDisabled: false,
        });
        break;

      default:
        this.#rerenderControlView();
        break;
    }
  }

  setAborting(data){
    const resetDeleteState = () => {
      this.#commentsViewCollection.get(this.#currentDeletingComment).updateElement({
        isDisabled: false,
        isDeleting: false
      });
    };

    const resetNewCommentState = () => {
      this.#newCommentViewForm.updateElement({
        isDisabled: false,
        isDeleting: false
      });
    };

    switch(data){
      case UserAction.DELETE_COMMENT:
        this.#commentsViewCollection.get(this.#currentDeletingComment).shake(resetDeleteState);
        break;
      case UserAction.ADD_COMMENT:
        this.#newCommentViewForm.shake(resetNewCommentState);
        break;
      default:
        this.#filmDetailsControlView.shake();
        break;
    }
  }

  #renderFilmDetailsControlElement(){
    const containerForControlView = this.#popupView.element.querySelector('.film-details__top-container');
    this.#filmDetailsControlView = new FilmDetailsControlView({
      film:this.#film,
      onFilmControlButton: this.#updateUserDetails});
    render(this.#filmDetailsControlView, containerForControlView, RenderPosition.BEFOREEND);
  }

  #rerenderControlView = () => {
    this.#filmDetailsControlView.element.remove();
    this.#filmDetailsControlView.removeElement();
    this.#renderFilmDetailsControlElement();
  };

  #renderNewCommentForm(){
    this.#newCommentViewForm = new NewCommentView({
      updatePopupInfo: this.#updatePopupInfo
    });
    render(this.#newCommentViewForm, this.#containerForNewCommentForm, RenderPosition.BEFOREEND);
  }

  #renderComment(comment){
    const commentView = new CommentView({
      comment: comment,
      updatePopupInfo: this.#updatePopupInfo
    });
    this.#commentsViewCollection.set(
      comment.id,
      commentView,
    );
    render(commentView, this.#containerForCommentsView, RenderPosition.BEFOREEND);
  }

  #renderComments(){
    this.#comments.forEach((comment) => this.#renderComment(comment));
  }

  #renderCommentsCounter(){
    this.#commentsCounterView = new CommentsCounterView({
      commentsCounter: this.#comments.length,
    });
    render(this.#commentsCounterView, this.#containerForNewCommentForm, RenderPosition.AFTERBEGIN);
  }

  #rerenderCommentsCounter(){
    this.#commentsCounterView.element.remove();
    this.#commentsCounterView.removeElement();
    this.#renderCommentsCounter();
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
      UserAction.UPDATE_FILM_DETAILS,
      UpdateType.PATCH,
      {film: this.#film});
  };

  #updatePopupInfo = (actionType,update) => {
    let data = null;
    switch(actionType){
      case UserAction.DELETE_COMMENT:
        this.#currentDeletingComment = update.id;
        this.#commentsViewCollection.get(update.id).updateElement(
          {
            isDisabled: true,
            isDeleting: true
          }
        );
        data = {
          film: this.#film,
          commentId: update.id
        };
        break;
      case UserAction.ADD_COMMENT:
        this.#newCommentViewForm.updateElement({
          isDisabled: true,
        });
        data = {
          film: this.#film,
          newComment: update
        };
        break;
    }
    this.#updateFilmDetails(
      actionType,
      UpdateType.PATCH,
      data,
    );
  };

}
