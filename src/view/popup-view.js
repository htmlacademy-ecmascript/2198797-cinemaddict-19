import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeDate, humanizeCommentDate} from '../utils.js';

const EMOJIS = {
  'angry': 'angry.png',
  'puke': 'puke.png',
  'sleeping': 'sleeping.png',
  'smile': 'smile.png'
};

function createCommentListTemplate(comment) {
  return (`
  <li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emoji}" width="55" height="55" alt="emoji-puke">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>
  `);
}

function createDetailsGenreTemplate(genre) {
  return (`<span class="film-details__genre">${genre}</span>`);
}

function createEmojiListTemplate(file) {
  return(Object.entries(EMOJIS).map(([emoji, fileName]) => `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${file.emoji === fileName ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-${emoji}" data-emoji-file=${fileName}>
              <img src="./images/emoji/${fileName}" width="30" height="30" alt="emoji">
            </label>
  `).join('')
  );
}

function createPopupTemplate(film) {
  const tempArrayForTemplates = [];
  film.comments.forEach((element) => {
    tempArrayForTemplates.push(createCommentListTemplate(element));
  });
  const commentsTemlate = tempArrayForTemplates.join('');
  const genreTemplate = createDetailsGenreTemplate(film.genre);
  const emojiListTemplate = createEmojiListTemplate(film);
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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${commentsTemlate}
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label">${film.emoji ? `<img src="./images/emoji/${film.emoji}" width="60" height="60" >` : ''}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiListTemplate}
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
  #comments = null;
  #handlerClosePopup = null;
  #rerenderPopup = null;


  constructor({film, comments, onClosePopup, rerenderPopup}) {
    super();
    this.#film = film;
    this.#comments = comments;
    this.#handlerClosePopup = onClosePopup;
    this.#rerenderPopup = rerenderPopup;
    this._setState(PopupView.parseFilmToState(film, comments));
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
    this.updateElement({
      emoji: evt.target.parentElement.dataset.emojiFile,
    });
    this.#rerenderPopup();
    this.element.querySelector('.film-details__emoji-list').scrollIntoView();
  };

  static parseFilmToState(task, comments) {
    return {
      ...task,
      comments,
      emoji: null
    };
  }

  _restoreHandlers() {
    document.addEventListener('keydown', this.#escButtonHandler);
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiHandler);
  }

}
