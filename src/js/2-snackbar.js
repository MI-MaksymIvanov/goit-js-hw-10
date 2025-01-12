import iziToast from 'izitoast';

const formEl = document.querySelector('.js-form');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  if (delay < 0 || isNaN(delay)) {
    iziToast.error({
      message: '❌ Please enter a valid delay (positive number).',
      position: 'topRight',
    });
    return;
  }

  const submitButton = formEl.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .finally(() => {
      submitButton.disabled = false;
    });

  event.target.reset();
});
