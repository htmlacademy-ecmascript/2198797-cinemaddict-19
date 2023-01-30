import {getRandomArrayElement} from '../utils.js';
import { COMMENTS_AUTHORS, COMMENTS_TEXT, EMOJIS} from '../const.js';

export const MAX_COMMENTS_NUMBER = 20;


export const makeComment = () => {
  let commentsCounter = -1;
  return function(){
    commentsCounter += 1;
    return{
      id: commentsCounter,
      text: getRandomArrayElement(COMMENTS_TEXT),
      author: getRandomArrayElement(COMMENTS_AUTHORS),
      emoji: getRandomArrayElement(EMOJIS),
      date: new Date('1996-02-14'),
    };
  };
};

