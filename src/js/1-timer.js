import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const startBtnEl = document.querySelector('button[data-start]');
startBtnEl.setAttribute('disabled', true);

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtnEl.setAttribute('disabled', true);
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      startBtnEl.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => String(value).padStart(2, '0');

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const updateTimeInfo = ({ days, hours, minutes, seconds }) => {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
};

const onBtnStartClick = () => {
  document.querySelector('#datetime-picker').setAttribute('disabled', true);
  startBtnEl.setAttribute('disabled', true);

  const intervalId = setInterval(() => {
    const timeDiff = userSelectedDate - new Date();

    if (timeDiff <= 0) {
      clearInterval(intervalId);
      iziToast.success({
        title: 'Complete',
        message: 'The countdown has ended!',
        position: 'topRight',
      });
      document.querySelector('#datetime-picker').removeAttribute('disabled');
      return;
    }

    const timeLeft = convertMs(timeDiff);
    updateTimeInfo(timeLeft);
  }, 1000);
};

startBtnEl.addEventListener('click', onBtnStartClick);
