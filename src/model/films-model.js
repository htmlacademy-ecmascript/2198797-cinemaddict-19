import Observable from '../framework/observable.js';
import {getMockFilm, FILMS_COUNT} from '../mock/films.js';
import {makeComment, MAX_COMMENTS_NUMBER} from '../mock/comments.js';

const generateFilm = getMockFilm();
const generateComment = makeComment();

export default class FilmsModel extends Observable {

  #films = null;
  #comments = null;

  constructor() {
    super();
    this.#films = Array.from({length: FILMS_COUNT}, generateFilm);
    this.#comments = Array.from({length: MAX_COMMENTS_NUMBER}, generateComment);
  }

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }

  getFilmsCount(){
    return FILMS_COUNT;
  }

  updateFilmDetails(updateType, update){
    const filmForReplaceIndex = this.#films.findIndex((element) => element.id === update.id);
    this.#films[filmForReplaceIndex] = update;
    this._notify(updateType, update);
  }

  addComment(updateType, update){

    const newComment = generateComment();
    newComment.text = update.comment.text;
    newComment.emoji = update.comment.emoji;
    this.#comments.push(newComment);
    const filmForReplaceIndex = this.#films.findIndex((element) => element.id === update.id);
    this.#films[filmForReplaceIndex].comments.push(newComment.id);
    this._notify(updateType, this.#films[filmForReplaceIndex]);
  }

}
