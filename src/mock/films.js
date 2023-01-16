import {getRandomArrayElement, getRandomPositiveInteger, convertMinutesToHours} from '../utils.js';
import {GENRES, DESCRIPTIONS, DIRECTORS, STARS, COUNTRIES,AGE_RATINGS, POSTERS} from '../const.js';
import {MAX_COMMENTS_NUMBER} from './comments.js';

const FILMS_COUNT = 14;

const getRandomNumber = () => getRandomPositiveInteger(0, MAX_COMMENTS_NUMBER - 1);

const getMockFilm = () =>
{
  let counter = -1;

  return function(){
    counter += 1;
    return{
      id: counter,
      poster: getRandomArrayElement(POSTERS),
      title: 'Сделать домашку',
      director: getRandomArrayElement(DIRECTORS),
      writers: ['Lelik', 'Bolik'],
      stars: getRandomArrayElement(STARS),
      rating: '9.2',
      release: new Date('1985-02-14'),
      runningTime: convertMinutesToHours(getRandomPositiveInteger(30, 240)),
      genre: getRandomArrayElement(GENRES),
      description: getRandomArrayElement(DESCRIPTIONS),
      country: getRandomArrayElement(COUNTRIES),
      ageRating: getRandomArrayElement(AGE_RATINGS),
      comments: Array.from({length: getRandomPositiveInteger(0, MAX_COMMENTS_NUMBER)},getRandomNumber),
    };
  };
};


export {getMockFilm, FILMS_COUNT};
