import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeDate} from '../utils.js';

function createDetailsGenreTemplate(genre) {
  return (`<span class="film-details__genre">${genre}</span>`);
}

function createPopupTemplate(film) {
  const genreTemplate = createDetailsGenreTemplate(film.genre);
  return (`
  <section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${film.poster}" alt="">

          <p class="film-details__age">${film.ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.title}</h3>
              <p class="film-details__title-original">${film.title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${film.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${film.writers.join()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${film.stars}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeDate(film.release, 'DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${film.runningTime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${film.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell genres">
              ${genreTemplate}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${film.description};
          </p>
        </div>
      </div>

      
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">

        <ul class="film-details__comments-list">
        </ul>

        
      </section>
    </div>
  </div>
</section>
  `);
}

export default class PopupView extends AbstractStatefulView{
  #handlerClosePopup = null;

  constructor({film, onClosePopup}) {
    super();
    this.#handlerClosePopup = onClosePopup;
    this._setState({...film});
    this._restoreHandlers();
  }


  get template() {
    return createPopupTemplate(this._state);
  }

  #keyButtonHandler = (evt)=> {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#closePopupHandler(evt);
      document.removeEventListener('keydown', this.#keyButtonHandler);
    }
  };

  #closePopupHandler = (evt) => {
    evt.preventDefault();
    this.element.remove();
    this.removeElement();
    this.#handlerClosePopup();
  };


  _restoreHandlers() {
    document.addEventListener('keydown', this.#keyButtonHandler);
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupHandler);
  }
}
