function randInt(min, max) {
  if (max < min) {
    const error = new Error('Max value can not be less than min value.');
    error.code = 'ERR_INVALID_ARG_VALUE';
    throw error;
  }
  return Math.floor(Math.random() * (max - min) + min);
}

const checkLength = (message, maxLength) => String(message).length <= maxLength;

randInt(2, 4);
checkLength('Hello World!', 12);
