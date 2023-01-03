import AbstractView from '../framework/view/abstract-view.js';

function createProfileRatingTemplate(profileRating) {
  return (`
  <section class="header__profile profile">
  <p class="profile__rating">${profileRating !== null ? profileRating : ''}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>
  `);
}

export default class ProfileRatingView extends AbstractView{

  #profileRating = null;

  constructor({profileRating}) {
    super();
    this.#profileRating = profileRating;
  }

  get template() {
    return createProfileRatingTemplate(this.#profileRating);
  }

}
