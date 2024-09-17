let timerInterval;
let totalSeconds = 0;
let isPaused = false;
let isSoundOn = true;

const displayTimer = document.querySelector('.timer__display');

const alertSound = document.getElementById('alert-sound');
const tickSound = document.getElementById('tick-sound');
const soundButton = document.getElementById('sound-button')
/**
 * Эта функция обновляет отображение таймера на экране.
 * Форматирует часы, минуты и секунды с ведущими нулями и обновляет текстовое
 * содержимое соответствующих элементов.
 * @param hours
 * @param minutes
 * @param seconds
 */
function updateDisplay(hours, minutes, seconds) {
    displayTimer.innerHTML = `
        <span class="timer__hours">${String(hours).padStart(2, '0')}:</span>
        <span class="timer__min">${String(minutes).padStart(2, '0')}:</span>
        <span class="timer__sec">${String(seconds).padStart(2, '0')}</span>         
    `;
}

/**
 * Эта функция уменьшается на 1 секунду каждую итерацию
 * (то есть каждую секунду, когда запущен интервал).
 * Она также обновляет отображение таймера и останавливает его, если время вышло
 * (то есть totalSeconds стало меньше или равно нулю).
 */
function countdown() {

    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        displayTimer.innerHTML = `<h2 class="timer-expired">Время вышло</h2>`
        if (isSoundOn) alertSound.play();
        tickSound.pause()
        return;
    }

    totalSeconds--;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    updateDisplay(hours, minutes, seconds);

    if (isSoundOn) {
        tickSound.play();
        tickSound.currentTime = 1;
    }
}


//кнопка запуска таймера
document.querySelector('.timer__form').addEventListener('submit', function(event) {

    event.preventDefault();

    const hoursInput = document.querySelector('.timer__input-hour').value || 0;
    const minutesInput = document.querySelector('.timer__input-min').value || 0;
    const secondsInput = document.querySelector('.timer__input-sec').value || 0;

    totalSeconds = (+hoursInput * 3600) + (+minutesInput * 60) + (+secondsInput);
    if (totalSeconds <= 0) return
    updateDisplay(Math.floor(totalSeconds / 3600), Math.floor((totalSeconds % 3600) / 60), totalSeconds % 60);

    //если таймер уже был запущен, он очищает текущий интервал.
    if (timerInterval){
        clearInterval(timerInterval);
        document.querySelector('.timer__stop-button').innerHTML = '<img src="../../images/timer/Group%204.png" class="stop" alt>'
    } 
    isPaused = false;
    timerInterval = setInterval(countdown, 1000);

});

// кнопка остановки/продолжения таймера
document.querySelector('.timer__stop-button').addEventListener('click', function() {
    if (totalSeconds === 0) return

    if (isPaused) {
        isPaused = false;
        timerInterval = setInterval(countdown, 1000);
        this.textContent = 'Стоп';
    }
    else {
        clearInterval(timerInterval);
        isPaused = true;
        this.textContent = 'Продолжить';
    }
    tickSound.pause();
});


//кнопка сброса таймера
document.querySelector('.timer__reset-button').addEventListener('click', function() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    isPaused = false;
    updateDisplay(0, 0, 0);
    document.querySelector('.timer__input-hour').value = '';
    document.querySelector('.timer__input-min').value = '';
    document.querySelector('.timer__input-sec').value = '';
    document.querySelector('.timer__stop-button').innerHTML = `<img src="../../images/timer/Group%204.png" class="stop" alt="">` //возвращаем иконку кнопки "Пауза".
    tickSound.pause();
});

// Переход на предыдущую страницу при нажатии Escape
document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape') window.history.back();
});

// вкл. выкл звук
soundButton.addEventListener('click', function() {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        soundButton.src = '../../images/timer/sound-on.svg';
    } else {
        soundButton.src = '../../images/timer/sound-off.svg';
        tickSound.pause();
    }
});