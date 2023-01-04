import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const MINUTES_IN_HOUR = 60;

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const createUniqRandomArray = (min, max, amount) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (amount > max || min > max) {
    return NaN;
  }
  const values = [];

  while (values.length < amount) {
    const value = getRandomPositiveInteger(min, max);
    if(!values.includes(value)){
      values.push(value);
    }
  }
  return values;
};

const padTo2Digits = (num) => num.toString().padStart(1, '0');

const convertMinutesToHours = (totalMinutes) => {
  const minutes = totalMinutes % MINUTES_IN_HOUR;
  const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);

  return `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
};

dayjs.extend(relativeTime);
const humanizeDate = (dueDate, format) => dueDate ? dayjs(dueDate).format(format) : '';
const humanizeCommentDate = (dueDate) => dueDate ? dayjs(dueDate).fromNow() : '';

export {getRandomArrayElement, getRandomPositiveInteger, createUniqRandomArray, convertMinutesToHours, humanizeDate, humanizeCommentDate};


