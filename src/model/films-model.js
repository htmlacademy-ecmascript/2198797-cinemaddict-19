import Observable from '../framework/observable.js';
import {getMockFilm, FILMS_COUNT} from '../mock/films.js';
import {makeComment, MAX_COMMENTS_NUMBER} from '../mock/comments.js';

const generateFilm = getMockFilm();
const generateComment = makeComment();

export default class FilmsModel extends Observable {

  #films = null;
  #comments = null;
  #userToFilmMap = new Map();

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
    const filmForRrplaceIndex = this.#films.findIndex((element) => element.id === update.id);
    this.#films[filmForRrplaceIndex] = update;
    this._notify(updateType, update);
  }

}
