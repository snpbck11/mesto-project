export const renderLoading = (isLoading, evt) => {
  const formButton = evt.target.querySelector('.form__button')
  if (isLoading) {
    formButton.textContent = formButton.dataset.saving;
  } else {
    formButton.textContent = formButton.dataset.save;
  }
}