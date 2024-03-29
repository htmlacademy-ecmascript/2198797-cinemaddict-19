
import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
};

export default class FilmApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  getComments(id) {
    return this._load({url: `comments/${id}`})
      .then(ApiService.parseResponse);
  }


  async updateFilm(film) {
    const adaptedFilm = this.#adaptToServer(film);
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptedFilm),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteComment(commentId) {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return response;
  }

  async addNewComment(comment, film) {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }


  #adaptToServer(film){
    const adaptedFilm = {};
    // eslint-disable-next-line camelcase
    adaptedFilm.film_info = {};
    adaptedFilm.id = film.id;
    adaptedFilm.film_info.poster = film.poster;
    adaptedFilm.film_info.title = film.title;
    // eslint-disable-next-line camelcase
    adaptedFilm.film_info.alternative_title = film.alternativeTitle;
    adaptedFilm.film_info.director = film.director;
    adaptedFilm.film_info.writers = film.writers;
    adaptedFilm.film_info.actors = film.stars;
    // eslint-disable-next-line camelcase
    adaptedFilm.film_info.total_rating = film.rating;
    adaptedFilm.film_info.duration = film.runningTime;
    adaptedFilm.film_info.genre = film.genre;
    adaptedFilm.film_info.description = film.description;
    // eslint-disable-next-line camelcase
    adaptedFilm.film_info.age_rating = film.ageRating;
    adaptedFilm.comments = film.comments;
    adaptedFilm.film_info.release = {
      date: film.release,
      // eslint-disable-next-line camelcase
      release_country: film.country,
    };
    // eslint-disable-next-line camelcase
    adaptedFilm.user_details = {
      // eslint-disable-next-line camelcase
      already_watched: film.userDetails.isWatched,
      watchlist: film.userDetails.isWhantToWatch,
      favorite: film.userDetails.isFavorite,
      // eslint-disable-next-line camelcase
      watching_date: film.userDetails.watchingDate,
    };
    return adaptedFilm;
  }
}
