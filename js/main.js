import { generatePhotos } from './data.js';
import { checkLength } from './utils.js';

const PHOTOS_AMOUNT = 25;
const DESCRIPTIONS = Array.from({length: PHOTOS_AMOUNT}, (v, index) => `the ${index + 1} photo`);

generatePhotos(PHOTOS_AMOUNT, DESCRIPTIONS);

checkLength('Hello World!', 12);
