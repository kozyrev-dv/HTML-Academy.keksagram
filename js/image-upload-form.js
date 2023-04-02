const HIDDEN_CSS_CLASS = 'hidden';

const IMAGE_SIZE_MAX = 100;
const IMAGE_SIZE_MIN = 25;
const IMAGE_SIZE_INIT = 50;
const IMAGE_RESIZE_STEP = 25;

const fileSelectInputElement = document.querySelector('#upload-file');
const imageUploadContainer = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('#upload-cancel');
const imageUploadSubmitButton = document.querySelector('#upload-cancel');
const imageUploadPreview = document.querySelector('.img-upload__preview');

const scaleControlValueElement = document.querySelector('.scale__control--value');

let imageScaleValue = IMAGE_SIZE_INIT;

const setScaleControlValue = (value) => {
  imageScaleValue = imageScaleValue = Math.min(IMAGE_SIZE_MAX, Math.max(IMAGE_SIZE_MIN, value));
  scaleControlValueElement.value = `${imageScaleValue}%`;
  imageUploadPreview.style.transform = `scale(${imageScaleValue / 100.0})`;
};

const showImagePreviewContainer = () => {
  imageScaleValue = IMAGE_SIZE_INIT;

  imageUploadContainer.classList.remove(HIDDEN_CSS_CLASS);
};

const hideImagePreviewContainer = () => {
  imageUploadContainer.classList.add(HIDDEN_CSS_CLASS);
  fileSelectInputElement.value = '';
};

fileSelectInputElement.addEventListener('input', showImagePreviewContainer);
uploadCancelButton.addEventListener('click', hideImagePreviewContainer);

imageUploadSubmitButton.addEventListener('submit', () => {
  hideImagePreviewContainer();
});

document.querySelector('.scale__control--smaller').addEventListener('click', () => {
  setScaleControlValue(imageScaleValue - IMAGE_RESIZE_STEP);
});

document.querySelector('.scale__control--bigger').addEventListener('click', () => {
  setScaleControlValue(imageScaleValue + IMAGE_RESIZE_STEP);
});

setScaleControlValue(IMAGE_SIZE_INIT);
