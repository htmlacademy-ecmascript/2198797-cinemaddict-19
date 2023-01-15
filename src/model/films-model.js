import {getMockFilm, FILMS_COUNT} from '../mock/films.js';
import {MOCK_COMMENTS} from '../mock/comments.js';
import {getUserInfo} from '../mock/user.js';

const generateFilm = getMockFilm();

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, generateFilm);
  #comments = MOCK_COMMENTS;
  #userToFilmMap = new Map();

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }

  get userToFilmMap() {
    this.#films.forEach((element) => this.#userToFilmMap.set(element.id, getUserInfo()));
    return this.#userToFilmMap;
  }

  getFilmsCount(){
    return FILMS_COUNT;
  }
}
