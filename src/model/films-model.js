import Observable from '../framework/observable.js';

import {UpdateType} from '../const.js';

export default class FilmsModel extends Observable {

  #films = [];
  #filmApiService = null;

  constructor({filmApiService}) {
    super();

    this.#filmApiService = filmApiService;

  }

  #adaptToClient(film) {
    const adaptedFilm = {};
    adaptedFilm.id = film.id;
    adaptedFilm.poster = film.film_info.poster;
    adaptedFilm.title = film.film_info.title;
    adaptedFilm.alternativeTitle = film.film_info.alternative_title;
    adaptedFilm.director = film.film_info.director;
    adaptedFilm.writers = film.film_info.writers;
    adaptedFilm.stars = film.film_info.actors;
    adaptedFilm.rating = film.film_info.total_rating;
    adaptedFilm.release = film.film_info.release.date;
    adaptedFilm.runningTime = film.film_info.duration;
    adaptedFilm.genre = film.film_info.genre;
    adaptedFilm.description = film.film_info.description;
    adaptedFilm.country = film.film_info.release.release_country;
    adaptedFilm.ageRating = film.film_info.age_rating;
    adaptedFilm.comments = film.comments;
    adaptedFilm.userDetails = {
      isWatched: film.user_details.already_watched,
      isWhantToWatch: film.user_details.watchlist,
      isFavorite: film.user_details.favorite,
      watchingDate: film.user_details.watching_date,
    };

    return adaptedFilm;
  }

  async init() {
    try {
      const films = await this.#filmApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch(err) {
      this.#films = [];
    }
    this._notify(UpdateType.INIT);
  }

  get films() {
    return this.#films;
  }

  async getComments(id) {
    try {
      const comments = await this.#filmApiService.getComments(id);
      return comments;
    } catch(err) {
      return [];
    }

  }

  getFilmsCount(){
    return this.#films.length;
  }

  async updateFilmDetails(updateType, update){
    const filmForReplaceIndex = this.#films.findIndex((element) => element.id === update.id);

    if (filmForReplaceIndex === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#filmApiService.updateFilm(update);
      const updatedFilm = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, filmForReplaceIndex),
        updatedFilm,
        ...this.#films.slice(filmForReplaceIndex + 1),
      ];
      this._notify(updateType, updatedFilm);

    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  addComment(updateType, update){

    /*const newComment = generateComment();
    newComment.text = update.comment.text;
    newComment.emoji = update.comment.emoji;
    this.#comments.push(newComment);
    const filmForReplaceIndex = this.#films.findIndex((element) => element.id === update.id);
    this.#films[filmForReplaceIndex].comments.push(newComment.id);
    this._notify(updateType, this.#films[filmForReplaceIndex]);*/
  }

}
