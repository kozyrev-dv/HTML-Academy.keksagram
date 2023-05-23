
const effectRadioButtons = document.querySelectorAll('.effects__radio');
const imageUploadPreviewImage = document.querySelector('.img-upload__preview').children[0];

const effectLevelInputElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectNoneRadioButton = document.querySelector('#effect-none');

const genEffectClass = (effectName) => `effects__preview--${effectName}`;
let currentEffect = genEffectClass('none');
let currentFilterStyle = [];

effectLevelInputElement.style.zIndex = -100;

for (const radioButton of effectRadioButtons) {
  radioButton.addEventListener('click',(evt) => {

    effectLevelInputElement.style.zIndex = 0;
    imageUploadPreviewImage.style.filter = '';
    imageUploadPreviewImage.classList.remove(currentEffect);
    currentEffect = genEffectClass(evt.target.value);
    imageUploadPreviewImage.classList.add(currentEffect);
    currentFilterStyle = getComputedStyle(imageUploadPreviewImage).filter.split(/\(\d+/);

    switch(currentFilterStyle[0]){
      case 'grayscale': effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1,
        },
        step: 0.1,
        start: 1
      });
        break;
      case 'sepia': effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1,
        },
        step: 0.1,
        start: 1
      });
        break;
      case 'invert': effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 100,
        },
        step: 1,
        start: 100
      });
        break;
      case 'blur': effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 3,
        },
        step: 0.1,
        start:3
      });
        break;
      case 'brightness': effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          'min': 1,
          'max': 3,
        },
        step: 0.1,
        start:3
      });
        break;
      default:
        effectLevelInputElement.style.zIndex = -100;

    }

  });
}

noUiSlider.create(effectLevelSliderElement, {
  range: {
    'min': 0,
    'max': 1.0
  },
  start: 1
});

effectLevelSliderElement.noUiSlider.on('update', (value) => {
  let val = value;
  if (currentFilterStyle[0] === 'invert'){
    val = value / 100.0;
  }
  effectLevelInputElement.value = `${value}%`;
  imageUploadPreviewImage.style.filter = `${currentFilterStyle[0]}(${val}${currentFilterStyle[1]}`;
});

const resetEffects = () => {

  effectNoneRadioButton.checked = true;
  effectLevelInputElement.style.zIndex = -100;
  imageUploadPreviewImage.style.filter = '';
  if (currentEffect.search(/none/) < 0) {
    imageUploadPreviewImage.classList.remove(currentEffect);
  }
  currentEffect = genEffectClass('none');
  imageUploadPreviewImage.classList.add(currentEffect);

};

export {resetEffects};
