import AbstractView from '../framework/view/abstract-view.js';

function createMostRatedTemplate() {
  return (`
        <section class="films-list films-list--extra" >
          <h2 class="films-list__title">Top rated</h2>
          <div class="films-list__container">
          <div>
        <section>
  `);
}

export default class MostRatedView extends AbstractView{

  get template() {
    return createMostRatedTemplate();
  }
}
