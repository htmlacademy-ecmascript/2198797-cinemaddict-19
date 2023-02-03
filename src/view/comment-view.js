
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const EMOJIS = {
  'angry': 'angry.png',
  'puke': 'puke.png',
  'sleeping': 'sleeping.png',
  'smile': 'smile.png'
};

function createCommentTemplate(comment) {
  return (`
  <li class="film-details__comment" id="comment${comment.id}">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${EMOJIS[comment.emotion]}" width="55" height="55" alt="emoji-puke">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
      <button class="film-details__comment-delete"  data-id="${comment.id}" ${isDisabled ? 'disabled' : ''}>${comment.isDeleting ? 'Deleting...' : 'Delete'}</button>
    </p>
  </div>
</li>
  `);
}


export default class CommentView extends AbstractStatefulView{
  #handlerDeleteComment = null;

  constructor({comment}) {
    super();
    this._setState(PopupView.parseFilmAndCommentsToState(comment));
    this._restoreHandlers();
  }


  get template() {
    return createCommentTemplate(this._state);
  }


  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    this.#previousComment = evt.target.parentElement.parentElement.parentElement.previousElementSibling;
    const index = this._state.comments.findIndex((element) => element.id === evt.target.dataset.id);
    this._state.comments[index].isDeleting = true;
    this.#updatePopupInfo(UserAction.DELETE_COMMENT ,{
      film: PopupView.parseStateToFilm({...this._state,}),
      commentId: Number(evt.target.dataset.id),
    });
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
  }


  _restoreHandlers() {
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#deleteCommentHandler);
  }
}