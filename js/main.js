import { generatePhotoElements } from './render.js';
import { checkLength } from './utils.js';

const PHOTO_AMOUNT = 25;
const DESCRIPTIONS = Array.from({length: PHOTO_AMOUNT}, (v, index) => `the ${index + 1} photo`);
const PHOTO_URLS = Array.from({length: PHOTO_AMOUNT}, (V, index) => `photos/${index + 1}.jpg`);

generatePhotoElements(PHOTO_AMOUNT, PHOTO_URLS, DESCRIPTIONS);

checkLength('Hello World!', 12);
