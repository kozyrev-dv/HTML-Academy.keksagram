import { generatePhotoElements } from './render.js';
import { getData } from './api.js';
import { MODAL_OPEN_CSS_CLASS } from './utils.js';

const errorLoadPostsMessageElement = document.querySelector('#error-posts').content.querySelector('.error').cloneNode(true);
errorLoadPostsMessageElement.querySelector('.error__button').onclick =  () => {
  document.location.reload();
  return false;
};

getData('https://27.javascript.pages.academy/kekstagram-simple/data', generatePhotoElements, () => {
  document.body.classList.add(MODAL_OPEN_CSS_CLASS);
  document.body.appendChild(errorLoadPostsMessageElement);
});
