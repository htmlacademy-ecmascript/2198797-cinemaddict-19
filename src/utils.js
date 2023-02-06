import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const MINUTES_IN_HOUR = 60;

const padTo2Digits = (num) => num.toString().padStart(1, '0');

const convertMinutesToHours = (totalMinutes) => {
  const minutes = totalMinutes % MINUTES_IN_HOUR;
  const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);

  return `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
};


dayjs.extend(relativeTime);
const humanizeDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';
const humanizeCommentDate = (dueDate) => dueDate ? dayjs(dueDate).fromNow() : '';

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortByDate(filmA, filmB) {
  const weight = getWeightForNullDate(filmA.release, filmB.release);

  return weight ?? dayjs(filmB.release).diff(dayjs(filmA.release));
}

function sortByRating(filmA, filmB) {
  if (filmA.rating > filmB.rating) {
    return -1;
  }
  if (filmA.rating < filmB.rating) {
    return 1;
  }
  return 0;
}

function sortByComments(filmA, filmB) {
  if (filmA.comments.length > filmB.comments.length) {
    return -1;
  }
  if (filmA.comments.length < filmB.comments.length) {
    return 1;
  }
  return 0;
}

export {convertMinutesToHours, humanizeDate, humanizeCommentDate, sortByDate, sortByRating, sortByComments};


