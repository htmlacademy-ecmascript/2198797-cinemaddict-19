import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeDate} from '../utils.js';

function createPopupTemplate(film) {
  return (`
  <section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${film.poster}" alt="">

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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

        <ul class="film-details__comments-list">
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label">${film.emoji ? `<img src="./images/emoji/${film.emoji}" width="60" height="60" >` : ``}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" >
            <label class="film-details__emoji-label" for="emoji-smile" data-emoji-file="smile.png">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" >
            <label class="film-details__emoji-label" for="emoji-sleeping" data-emoji-file="sleeping.png">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" >
            <label class="film-details__emoji-label" for="emoji-puke" data-emoji-file="puke.png">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" >
            <label class="film-details__emoji-label" for="emoji-angry" data-emoji-file="angry.png">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </form>
      </section>
    </div>
  </div>
</section>
  `);
}

export default class PopupView extends AbstractStatefulView{
  #film = null;
  #handlerClosePopup = null;
  #rerenderPopup = null;


  constructor({film, onClosePopup, rerenderPopup}) {
    super();
    this.#film = film;
    this.#handlerClosePopup = onClosePopup;
    this.#rerenderPopup = rerenderPopup;
    this._setState(PopupView.parseFilmToState(film));

    this._restoreHandlers();
  }


  get template() {
    return createPopupTemplate(this._state);
  }

  #escButtonHandler = (evt)=> {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#closePopupHandler(evt);
      document.removeEventListener('keydown', this.#escButtonHandler);
    }
  };

  #closePopupHandler = (evt) => {
    evt.preventDefault();
    this.element.remove();
    this.removeElement();
    this.#handlerClosePopup();
  };

  #emojiHandler = (evt) => {
    evt.preventDefault();
    console.log(this._state);
    this.updateElement({
      emoji: evt.target.parentElement.dataset.emojiFile,
    });
    console.log(this._state);
    this.#rerenderPopup();
  };

  static parseFilmToState(task, comment) {
    return {
      ...task,
      emoji: null
    };
  }

  _restoreHandlers() {
    document.addEventListener('keydown', this.#escButtonHandler);
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiHandler);
  }

}
