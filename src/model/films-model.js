import {getMockFilm} from '../mock/films.js';
import {MOCK_COMMENTS} from '../mock/comments.js';

const FILMS_COUNT = 5;

export default class FilmsModel {
  films = Array.from({length: FILMS_COUNT}, getMockFilm);
  comments = MOCK_COMMENTS;

  getFilms() {
    return this.films;
  }

  getComments() {
    return this.comments;
  }
}
