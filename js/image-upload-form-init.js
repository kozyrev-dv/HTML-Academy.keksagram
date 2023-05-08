import { sendData } from './api.js';
import { MODAL_OPEN_CSS_CLASS, HIDDEN_CSS_CLASS } from './utils.js';

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
let isMessageElementHidden = true;


//----- setting Prestine validation

const pristine = new Pristine(imageUploadForm, {
  classTo: 'image-description__field-label',
  errorTextParent: 'image-description__field-label'
});

//----- close section

const showMessageElement = (messageElement) => {
  document.body.appendChild(messageElement);
  isMessageElementHidden = false;
};

const hideMessageElement = (messageElement) => {
  messageElement.parentNode.removeChild(messageElement);
  isMessageElementHidden = true;
};

const setScaleControlValue = (value) => {
  imageScaleValue = imageScaleValue = Math.min(IMAGE_SIZE_MAX, Math.max(IMAGE_SIZE_MIN, value));
  scaleControlValueElement.value = `${imageScaleValue}%`;
  imageUploadPreviewElement.style.transform = `scale(${imageScaleValue / 100.0})`;
};

const showImagePreviewContainer = () => {
  setScaleControlValue(IMAGE_SIZE_INIT);
  imageUploadSubmitButton.disabled = true;

  document.body.classList.add(MODAL_OPEN_CSS_CLASS);
  imageUploadContainer.classList.remove(HIDDEN_CSS_CLASS);
  isPreviewContainerHidden = false;
};

const resetFields = () => {
  fileSelectInputElement.value = '';
  descriptionTextAreaElement.value = '';
  hashtagTextElement.value = '';
  effectNoneRadioButton.checked = true;
  imageUploadPreviewElement.children[0].classList = '';
  setScaleControlValue(IMAGE_SIZE_INIT);
};

const hideImagePreviewContainer = () => {
  imageUploadContainer.classList.add(HIDDEN_CSS_CLASS);
  document.body.classList.remove(MODAL_OPEN_CSS_CLASS);
  isPreviewContainerHidden = true;
};

//----- setting success and error message blocks
const successMessageElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
successMessageElement.style.zIndex = '5';
successMessageElement.querySelector('.success__button').addEventListener('click', () => {
  successMessageElement.parentNode.removeChild(successMessageElement);
});
successMessageElement.addEventListener('click', (evt) => {
  if (evt.target === successMessageElement) {
    hideMessageElement(successMessageElement);
  }
});


const errorMessageElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
errorMessageElement.style.zIndex = '5';
errorMessageElement.querySelector('.error__button').addEventListener('click', () => {
  errorMessageElement.parentNode.removeChild(errorMessageElement);
  const imageScale = imageScaleValue;
  showImagePreviewContainer();
  imageUploadSubmitButton.disabled = !pristine.validate();
  setScaleControlValue(imageScale);
});
errorMessageElement.addEventListener('click', (evt) => {
  if (evt.target === errorMessageElement) {
    hideMessageElement(errorMessageElement);
    hideImagePreviewContainer();
    resetFields();
  }
});

//----- close section

const blockUploadSubmitButtonLoad = () => {
  imageUploadSubmitButton.disabled = true;
  imageUploadSubmitButton.textContent = 'Отправка...';
};

const unblockUploadSubmitButtonLoad = () => {
  imageUploadSubmitButton.disabled = !pristine.validate();
  imageUploadSubmitButton.textContent = UPLOAD_SUBMIT_BUTTON_TEXT;
};

imageUploadSubmitButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  blockUploadSubmitButtonLoad();
  sendData(
    () => {
      unblockUploadSubmitButtonLoad();
      hideImagePreviewContainer();
      resetFields();
      showMessageElement(successMessageElement);
    },
    () => {
      unblockUploadSubmitButtonLoad();
      imageUploadContainer.classList.add(HIDDEN_CSS_CLASS);
      document.body.classList.remove(MODAL_OPEN_CSS_CLASS);
      showMessageElement(errorMessageElement);
    }, new FormData(imageUploadForm));

});

descriptionTextAreaElement.addEventListener('input', () => {
  imageUploadSubmitButton.disabled = !pristine.validate();
});

fileSelectInputElement.addEventListener('input', showImagePreviewContainer);
uploadCancelButton.addEventListener('click', () => {
  hideImagePreviewContainer();
  resetFields();
});

const hideMessageElementEventHandler = () => {
  if (!isMessageElementHidden) {
    if (successMessageElement.parentNode !== null) {
      hideMessageElement(successMessageElement);
    } else {
      hideMessageElement(errorMessageElement);
    }
  }
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    if (!isPreviewContainerHidden) {
      hideImagePreviewContainer();
      resetFields();
    }
    hideMessageElementEventHandler();
  }
});

document.querySelector('.scale__control--smaller').addEventListener('click', () => {
  setScaleControlValue(imageScaleValue - IMAGE_RESIZE_STEP);
});

document.querySelector('.scale__control--bigger').addEventListener('click', () => {
  setScaleControlValue(imageScaleValue + IMAGE_RESIZE_STEP);
});
