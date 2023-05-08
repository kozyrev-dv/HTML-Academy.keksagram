import {randInt} from './utils.js';

const generatePhoto = (id, url, description) => ({
  id: id,
  url: url,
  description: description,
  likes: randInt(15, 200),
  comments: randInt(0, 200)
});

const generatePhotos = (amount, urls, descriptions) => Array.from({length: amount},
  (v, index) => generatePhoto(index, urls[index], descriptions[index]));

export {generatePhotos};
