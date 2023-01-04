import {getMockFilm, FILMS_COUNT} from '../mock/films.js';
import {MOCK_COMMENTS} from '../mock/comments.js';
import {getMockUser} from '../mock/user.js';

const generateFilm = getMockFilm();

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, generateFilm);
  #comments = MOCK_COMMENTS;
  #user = getMockUser();

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }

  get user() {
    return this.#user;
  }

  getFilmsCount(){
    return FILMS_COUNT;
  }
}
