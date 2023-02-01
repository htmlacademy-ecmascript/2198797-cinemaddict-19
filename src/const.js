export const GENRES = ['Drama', 'Comedy', 'Crime', 'Horror', 'Sci-Fi', 'Western'];
export const DIRECTORS = ['George Lucas', 'Christopher Nolan', 'Steven Spielberg', 'James Cameron', 'Ridley Scott'];
export const STARS = ['Leonardo DiCaprio', 'Brad Pitt', 'Tom Cruise', 'Zendaya', 'Chloë Grace Moretz'];
export const DESCRIPTIONS = [
  'The incredible story of the adventures of two Murziks',
  'Tragic love story',
  'Detective story with paranormal logic',
  'Solitaire kerchief of shame and conscience',
  'The story of growing up cat Cupcake'
];
export const COUNTRIES = ['US', 'RU', 'ID', 'ME', 'THA'];
export const AGE_RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
export const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

export const COMMENTS_AUTHORS = ['John Doe', 'Tim Macoveev', 'Ivan Ivanov', 'Hermiona Granger'];
export const COMMENTS_TEXT = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?'
];

export const EMOJIS = ['angry.png', 'puke.png', 'puke.png', 'smile.png'];

export const PROFILE_RATINGS = ['Novice', 'Fan', ' Movie Buff'];

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'watched',
  FAVORITES: 'favorite',
};

export const SortType = {
  DEFAULT: 'default',
  BY_DATE: 'by-date',
  BY_RATING: 'by-rating',
};

export const UserAction = {
  UPDATE_FILM_DETAILS: 'UPDATE_FILM_DETAILS',
  UPSATE_SORT_VIEW: 'UPDATE_SORT_VIEW',
  ADD_COMMENT: 'ADD_COMMENT'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};


//export {GENRES, DESCRIPTIONS, DIRECTORS, STARS, COUNTRIES, AGE_RATINGS, POSTERS, COMMENTS_AUTHORS, COMMENTS_TEXT, EMOJIS, PROFILE_RATINGS, FilterType, SortType};
