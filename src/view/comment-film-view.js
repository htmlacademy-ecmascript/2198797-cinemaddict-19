import {createElement} from '../render.js';
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

export default class CommentFilmView {

  constructor({comment}){
    this.comment = comment;
  }

  getTemplate() {
    return createCommentFilmTemplate(this.comment);
  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
