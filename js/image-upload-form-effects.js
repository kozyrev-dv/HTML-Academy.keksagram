const effectRadioButtons = document.querySelectorAll('.effects__radio');
const genEffectClass = (effectName) => `effects__preview--${effectName}`;
const imageUploadPreviewImage = document.querySelector('.img-upload__preview').children[0];

let prevEffect = genEffectClass('none');

for (const radioButton of effectRadioButtons) {
  radioButton.addEventListener('click',(evt) => {
    imageUploadPreviewImage.classList.remove(prevEffect);
    prevEffect = genEffectClass(evt.target.value);
    imageUploadPreviewImage.classList.add(prevEffect);
  });
}
