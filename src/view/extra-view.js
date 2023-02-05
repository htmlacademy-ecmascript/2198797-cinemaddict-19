import AbstractView from '../framework/view/abstract-view.js';

function createExtraTemplate(sectionName) {
  return (`
        <section class="films-list films-list--extra" >
          <h2 class="films-list__title">${sectionName === 'rating' ? 'Top Rated' : 'Most Commented'}</h2>
          <div class="films-list__container">
          <div>
        <section>
  `);
}

export default class ExtraView extends AbstractView{

  #sectionName = null;

  constructor({sectionName}){
    super();
    this.#sectionName = sectionName;
  }

  get template() {
    return createExtraTemplate(this.#sectionName);
  }
}
