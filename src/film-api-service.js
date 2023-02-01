
import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
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

  #adaptToServer(film){
    const adaptedFilm = {};
    adaptedFilm.film_info = {};
    adaptedFilm.id = film.id;
    adaptedFilm.film_info.poster = film.poster;
    adaptedFilm.film_info.title = film.title;
    adaptedFilm.film_info.alternative_title = film.alternativeTitle;
    adaptedFilm.film_info.director = film.director;
    adaptedFilm.film_info.writers = film.writers;
    adaptedFilm.film_info.actors = film.stars;
    adaptedFilm.film_info.total_rating = film.rating;
    adaptedFilm.film_info.duration = film.runningTime;
    adaptedFilm.film_info.genre = film.genre;
    adaptedFilm.film_info.description = film.description;
    adaptedFilm.film_info.age_rating = film.ageRating;
    adaptedFilm.comments = film.comments;
    adaptedFilm.film_info.release = {
      date: film.release,
      release_country: film.country,
    };
    adaptedFilm.user_details = {
      already_watched: film.userDetails.isWatched,
      watchlist: film.userDetails.isWhantToWatch,
      favorite: film.userDetails.isWhantToWatch,
      watching_date: film.userDetails. watchingDate,
    };
    return adaptedFilm;
  }
}
