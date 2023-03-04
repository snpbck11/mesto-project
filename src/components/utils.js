import { closePopup } from "./modals";

export const renderLoading = (isLoading, button, buttonText, loadingText='Сохранение...' ) => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

export const handleSubmit = (request, evt, popup, loadingText = 'Сохранение...') => {
 evt.preventDefault();

 const submitButton = evt.submitter;
 const initialText = submitButton.textContent;

 renderLoading(true, submitButton, initialText, loadingText);
 
 request()
  .then(() => {
    evt.target.reset();
    closePopup(popup);
  })
  .catch(checkError)
  .finally(() => {
    renderLoading(false, submitButton, initialText);
  })
}

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`)
}

export const checkError = (err) => {
  console.error(err)
}