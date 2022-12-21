import {getMockFilm} from '../mock/films.js';
import {MOCK_COMMENTS} from '../mock/comments.js';

const FILMS_COUNT = 5;

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, getMockFilm);
  #comments = MOCK_COMMENTS;

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }
}
