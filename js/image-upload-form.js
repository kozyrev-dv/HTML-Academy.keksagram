const HIDDEN_CSS_CLASS = 'hidden';
const MODAL_OPEN_CSS_CLASS = 'modal-open';

const IMAGE_SIZE_MAX = 100;
const IMAGE_SIZE_MIN = 25;
const IMAGE_SIZE_INIT = 100;
const IMAGE_RESIZE_STEP = 25;

const imageUploadForm = document.querySelector('#upload-select-image');
const fileSelectInputElement = document.querySelector('#upload-file');
const imageUploadContainer = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('#upload-cancel');
//const imageUploadSubmitButton = document.querySelector('#upload-cancel');
const imageUploadPreview = document.querySelector('.img-upload__preview');

const scaleControlValueElement = document.querySelector('.scale__control--value');

let imageScaleValue = IMAGE_SIZE_INIT;
let isPreviewContainerHidden = true;

const setScaleControlValue = (value) => {
  imageScaleValue = imageScaleValue = Math.min(IMAGE_SIZE_MAX, Math.max(IMAGE_SIZE_MIN, value));
  scaleControlValueElement.value = `${imageScaleValue}%`;
  imageUploadPreview.style.transform = `scale(${imageScaleValue / 100.0})`;
};

const showImagePreviewContainer = () => {
  if (isPreviewContainerHidden) {
    setScaleControlValue(IMAGE_SIZE_INIT);
    isPreviewContainerHidden = false;

    document.body.classList.add(MODAL_OPEN_CSS_CLASS);
    imageUploadContainer.classList.remove(HIDDEN_CSS_CLASS);
  }
};

const hideImagePreviewContainer = () => {
  if (!isPreviewContainerHidden) {
    imageUploadContainer.classList.add(HIDDEN_CSS_CLASS);
    document.body.classList.remove(MODAL_OPEN_CSS_CLASS);

    isPreviewContainerHidden = true;
    fileSelectInputElement.value = '';
  }
};

//----- setting EventListeners

fileSelectInputElement.addEventListener('input', showImagePreviewContainer);
uploadCancelButton.addEventListener('click', hideImagePreviewContainer);
document.addEventListener('keydown', (evt) => {
  if (!isPreviewContainerHidden && (evt.key === 'Esc' || evt.key === 'Escape')) {
    hideImagePreviewContainer();
  }
});

document.querySelector('.scale__control--smaller').addEventListener('click', () => {
  setScaleControlValue(imageScaleValue - IMAGE_RESIZE_STEP);
});

document.querySelector('.scale__control--bigger').addEventListener('click', () => {
  setScaleControlValue(imageScaleValue + IMAGE_RESIZE_STEP);
});

//----- setting Prestine validation

const pristine = new Pristine(imageUploadForm);

// imageUploadForm.addEventListener('submit', () => {
//   hideImagePreviewContainer();
// });

setScaleControlValue(IMAGE_SIZE_INIT);
