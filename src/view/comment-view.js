
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeCommentDate} from '../utils.js';
import { UserAction } from '../const.js';

function createCommentTemplate(comment) {
  return (`
  <li class="film-details__comment" id="comment${comment.id}">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-puke">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
      <button class="film-details__comment-delete"  data-id="${comment.id}" ${comment.isDisabled ? 'disabled' : ''}>${comment.isDeleting ? 'Deleting...' : 'Delete'}</button>
    </p>
  </div>
</li>
  `);
}


export default class CommentView extends AbstractStatefulView{
  #updatePopupInfo = null;

  constructor({comment, updatePopupInfo}) {
    super();
    this.#updatePopupInfo = updatePopupInfo;
    this._setState(CommentView.parseCommentToState(comment));
    this._restoreHandlers();
  }


  get template() {
    return createCommentTemplate(this._state);
  }


  #deleteCommentHandler = () => {
    this.#updatePopupInfo(UserAction.DELETE_COMMENT ,
      CommentView.parseStateToComment({...this._state,})
    );
  };


  static parseCommentToState(comment) {
    return {
      ...comment,
      isDisabled: false,
      isDeleting: false,
    };
  }

  static parseStateToComment(state){
    const comment = {...state};
    delete comment.isDeleting;
    delete comment.isDisabled;

    return comment;
  }


  _restoreHandlers() {
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#deleteCommentHandler);
  }
}
