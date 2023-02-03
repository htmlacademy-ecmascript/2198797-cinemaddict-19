
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';
import { UserAction } from '../const.js';

const EMOJIS = ['angry','puke','sleeping','smile'];

function createEmojiListTemplate(data) {
  return((EMOJIS.map((emotion) => `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${data.emotion === emotion ? 'checked' : ''} ${data.isDisabled ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-${emotion}" data-emoji-name="${emotion}">
                <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
              </label>
    </input>
    `)).join('')
  );
}

function createCommentFormTemplate(data) {

  const emojiListTemplate = createEmojiListTemplate(data);
  return (`
  <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label">${data.emotion ? `<img src="./images/emoji/${data.emotion}.png" width="60" height="60" >` : ''}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${data.isDisabled ? 'disabled' : ''}></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiListTemplate}
          </div>
    </form>
  `);
}


export default class NewCommentView extends AbstractStatefulView{
  #updatePopupInfo = null;
  #previousKeyDown = null;

  constructor({updatePopupInfo}) {
    super();
    this.#updatePopupInfo = updatePopupInfo;
    this._setState(NewCommentView.parseCommentToState());
    this._restoreHandlers();
  }


  get template() {
    return createCommentFormTemplate(this._state);
  }

  #emojiHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      emotion: evt.target.parentElement.dataset.emojiName,
    });
  };

  #keyButtonHandler = (evt)=> {
    if((this.#previousKeyDown === 'Control' || this.#previousKeyDown === 'Meta') && evt.key === 'Enter'){
      this._state.comment = this.element.querySelector('textarea').value;
      if(this._state.comment === '' || this._state.emotion === null){
        return;
      }
      this.#updatePopupInfo(UserAction.ADD_COMMENT ,
        NewCommentView.parseStateToComment({...this._state,})
      );
    }
    this.#previousKeyDown = evt.key;
  };

  static parseCommentToState() {
    return {
      emotion: null,
      comment: null,
      isDisabled: false,
    };
  }

  static parseStateToComment(state){
    const comment = {...state};
    delete comment.isDisabled;
    comment.comment = he.encode(comment.comment);

    return comment;
  }


  _restoreHandlers() {
    document.addEventListener('keydown', this.#keyButtonHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiHandler);
  }
}
