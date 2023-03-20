import {randInt} from './utils.js';

const generatePhoto = (id, description) => ({
  id: id,
  url: `photos/${id + 1}.jpg`,
  description: description,
  likes: randInt(15, 200),
  comments: randInt(0, 200)
});

const generatePhotos = (amount, descriptions) => Array.from({length: amount}, (v, index) => generatePhoto(index, descriptions[index]));

export {generatePhotos};
