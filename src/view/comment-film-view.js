import AbstractView from '../framework/view/abstract-view.js';
import {humanizeCommentDate} from '../utils.js';

function createCommentFilmTemplate(comment) {
  return (`
  <li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emoji}" width="55" height="55" alt="emoji-puke">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>
  `);
}

export default class CommentFilmView extends AbstractView{
  #comment = null;

  constructor({comment}) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createCommentFilmTemplate(this.#comment);
  }
}
