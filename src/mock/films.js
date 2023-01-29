import {getRandomArrayElement, getRandomPositiveInteger, convertMinutesToHours} from '../utils.js';
import {GENRES, DESCRIPTIONS, DIRECTORS, STARS, COUNTRIES,AGE_RATINGS, POSTERS} from '../const.js';
import {MAX_COMMENTS_NUMBER} from './comments.js';

const FILMS_COUNT = 14;

const getRandomUniqNumber = () => {
  const comments = [];
  return function(){
    let tmpComment = 0;
    do{
      tmpComment = getRandomPositiveInteger(0, MAX_COMMENTS_NUMBER - 1);
    }while(comments.includes(tmpComment));
    comments.push(tmpComment);
    return tmpComment;
  };
};

const getMockFilm = () =>
{
  let counter = -1;

  return function(){
    counter += 1;
    const commentsGenerator = getRandomUniqNumber();
    return{
      id: counter,
      poster: getRandomArrayElement(POSTERS),
      title: 'Сделать домашку',
      alternativeTitle: 'Рабочий процесс',
      director: getRandomArrayElement(DIRECTORS),
      writers: ['Lelik', 'Bolik'],
      stars: getRandomArrayElement(STARS),
      rating: getRandomPositiveInteger(0, 10),
      release: new Date(getRandomPositiveInteger(0, 2028021800000)),
      runningTime: convertMinutesToHours(getRandomPositiveInteger(30, 240)),
      genre: getRandomArrayElement(GENRES),
      description: getRandomArrayElement(DESCRIPTIONS),
      country: getRandomArrayElement(COUNTRIES),
      ageRating: getRandomArrayElement(AGE_RATINGS),
      comments: Array.from({length: getRandomPositiveInteger(0, MAX_COMMENTS_NUMBER - 1)},commentsGenerator),
      userDetails: {
        isWatched: getRandomPositiveInteger(0,1) === 1,
        isWhantToWatch: getRandomPositiveInteger(0,1) === 1,
        isFavorite: getRandomPositiveInteger(0,1) === 1,
      }
    };
  };
};


export {getMockFilm, FILMS_COUNT};
