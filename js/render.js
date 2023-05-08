const generatePhotoElements = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  const picturesFragment = document.createDocumentFragment();

  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  for(const photo of photos) {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    picturesFragment.appendChild(photoElement);
  }
  picturesContainer.appendChild(picturesFragment);
};

//Задание 7 часть 2

export {generatePhotoElements};

