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
    const filmForReplaceIndex = this.#films.findIndex((element) => element.id === update.film.id);
    if (filmForReplaceIndex === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#filmApiService.updateFilm(update.film);
      const updatedFilm = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, filmForReplaceIndex),
        updatedFilm,
        ...this.#films.slice(filmForReplaceIndex + 1),
      ];
      const comments = await this.getComments(updatedFilm.id);

      this._notify(updateType, {
        film: updatedFilm,
        comments: comments,
        actionType: update.actionType,
      });

    } catch(err) {
      throw new Error('Can\'t update film');
    }
  }

  async addComment(updateType, update){
    try {
      const response = await this.#filmApiService.addNewComment(update.newComment,update.film);
      const updatedFilm = this.#adaptToClient(response.movie);
      const filmForReplaceIndex = this.#films.findIndex((element) => element.id === updatedFilm.id);
      this.#films = [
        ...this.#films.slice(0, filmForReplaceIndex),
        updatedFilm,
        ...this.#films.slice(filmForReplaceIndex + 1),
      ];
      const comments = await this.getComments(updatedFilm.id);
      this._notify(updateType, {
        film: updatedFilm,
        comments: comments,
        actionType: update.actionType,
      });

    } catch(err) {
      throw new Error('Can\'t add new comment');
    }
  }

  async deleteComment(updateType, update){
    try {
      await this.#filmApiService.deleteComment(update.commentId);
      this.updateFilmDetails(updateType, update);

    } catch(err) {
      throw new Error('Can\'t delet comment');
    }

  }

}
