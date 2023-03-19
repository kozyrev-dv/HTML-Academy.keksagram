function randInt(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

const checkLength = (message, maxLength) => String(message).length <= maxLength;

const generatePhoto = (id, description) => ({
  id: id,
  url: `photos/${id + 1}.jpg`,
  description: description,
  likes: randInt(15, 200),
  comments: randInt(0, 200)
});

const generatePhotos = (amount, descriptions) => Array.from({length: amount}, (v, index) => generatePhoto(index, descriptions[index]));

const PHOTOS_AMOUNT = 25;

generatePhotos(PHOTOS_AMOUNT, Array.from({length: PHOTOS_AMOUNT}, () => ''));

checkLength('Hello World!', 12);
