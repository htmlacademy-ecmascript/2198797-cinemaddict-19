import {getRandomArrayElement} from '../utils.js';
import { COMMENTS_AUTHORS, COMMENTS_TEXT, EMOJIS} from '../const.js';

export const MAX_COMMENTS_NUMBER = 20;
export const MOCK_COMMENTS = [];

const makeComment = () => ({
  text: getRandomArrayElement(COMMENTS_TEXT),
  author: getRandomArrayElement(COMMENTS_AUTHORS),
  emoji: getRandomArrayElement(EMOJIS),
  date: new Date('1996-02-14'),
});

for (let i = 0; i < MAX_COMMENTS_NUMBER; i++){
  MOCK_COMMENTS.push(makeComment());
}


