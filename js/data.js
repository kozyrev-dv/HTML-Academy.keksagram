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

const createLoader = (onSuccess, onError) => () => fetch(
  'https://26.javascript.pages.academy/code-and-magick/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

export {createLoader};
export {generatePhotos};
