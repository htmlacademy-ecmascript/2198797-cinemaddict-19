import Observable from '../framework/observable.js';
import {getMockFilm, FILMS_COUNT} from '../mock/films.js';
import {MOCK_COMMENTS} from '../mock/comments.js';
import {getUserInfo} from '../mock/user.js';

const generateFilm = getMockFilm();

export default class FilmsModel extends Observable {

  #films = null;
  #comments = null;
  #userToFilmMap = new Map();

  constructor() {
    super();
    this.#films = Array.from({length: FILMS_COUNT}, generateFilm);
    this.#films.forEach((element) => this.#userToFilmMap.set(element.id, getUserInfo()));
    this.#comments = MOCK_COMMENTS;
  }

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }

  get userToFilmMap() {
    return this.#userToFilmMap;
  }

  getFilmsCount(){
    return FILMS_COUNT;
  }

  updateFilmDetails(updateType, update){
    this.#userToFilmMap.delete(update.film.id);
    this.#userToFilmMap.set(update.film.id, update.dataMap);
    this._notify(updateType, update);
  }
}
