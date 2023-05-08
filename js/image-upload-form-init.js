import { sendData } from './api.js';

const HIDDEN_CSS_CLASS = 'hidden';
const MODAL_OPEN_CSS_CLASS = 'modal-open';

const IMAGE_SIZE_MAX = 100;
const IMAGE_SIZE_MIN = 25;
const IMAGE_SIZE_INIT = 100;
const IMAGE_RESIZE_STEP = 25;

const imageUploadContainer = document.querySelector('.img-upload__overlay');
const imageUploadPreviewElement = document.querySelector('.img-upload__preview');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const uploadCancelButton = document.querySelector('#upload-cancel');

const descriptionTextAreaElement = document.querySelector('.text__description');
const effectNoneRadioButton = document.querySelector('#effect-none');
const fileSelectInputElement = document.querySelector('#upload-file');
const hashtagTextElement = document.querySelector('.text__hashtags');
const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadSubmitButton = document.querySelector('#upload-submit');

const UPLOAD_SUBMIT_BUTTON_TEXT = imageUploadSubmitButton.textContent;

let imageScaleValue = IMAGE_SIZE_INIT;
let isPreviewContainerHidden = true;

//----- setting Prestine validation

const pristine = new Pristine(imageUploadForm, {
  classTo: 'image-description__field-label',
  errorTextParent: 'image-description__field-label'
});


const setScaleControlValue = (value) => {
  imageScaleValue = imageScaleValue = Math.min(IMAGE_SIZE_MAX, Math.max(IMAGE_SIZE_MIN, value));
  scaleControlValueElement.value = `${imageScaleValue}%`;
  imageUploadPreviewElement.style.transform = `scale(${imageScaleValue / 100.0})`;
};

const showImagePreviewContainer = () => {
  if (isPreviewContainerHidden) {
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
    descriptionTextAreaElement.value = '';
    hashtagTextElement.value = '';
    effectNoneRadioButton.checked = true;
    imageUploadPreviewElement.children[0].classList = '';
    setScaleControlValue(IMAGE_SIZE_INIT);
  }
};


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


const blockUploadSubmitButtonLoad = () => {
  imageUploadSubmitButton.disabled = true;
  imageUploadSubmitButton.textContent = 'Отправка...';
};

const unblockUploadSubmitButtonLoad = () => {
  imageUploadSubmitButton.disabled = !pristine.validate();
  imageUploadSubmitButton.textContent = UPLOAD_SUBMIT_BUTTON_TEXT;
};

const showError = () => {

  console.error('ERROR');

};

imageUploadSubmitButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  blockUploadSubmitButtonLoad();
  sendData(
    () => {
      unblockUploadSubmitButtonLoad();
      hideImagePreviewContainer();
    },
    () => {
      unblockUploadSubmitButtonLoad();
      showError();
    }, new FormData(imageUploadForm));

});

descriptionTextAreaElement.addEventListener('input', () => {
  imageUploadSubmitButton.disabled = !pristine.validate();
});


setScaleControlValue(IMAGE_SIZE_INIT);
imageUploadSubmitButton.disabled = true;
