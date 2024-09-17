let timerInterval;
let totalSeconds = 0;
let isPaused = true;
let isSoundOn = true;


const displayHours = document.querySelector('.timer__hours');
const displayMinutes = document.querySelector('.timer__min');
const displaySeconds = document.querySelector('.timer__sec');
const displayMiliseconds = document.querySelector('.timer__milisec')

const tickSound = document.getElementById('tick-sound');
const soundButton = document.getElementById('sound-button');

/**
 * Эта функция обновляет отображение секундомера на экране.
 * Форматирует часы, минуты и секунды с ведущими нулями и обновляет текстовое
 * содержимое соответствующих элементов.
 */
function updateDisplay() {
    const hours = Math.floor(totalSeconds / 360000);
    const minutes = Math.floor(totalSeconds / 6000) % 60;
    const seconds = Math.floor(totalSeconds / 100) % 60;
    const miliseconds = totalSeconds % 100;
    displayHours.textContent = `${String(hours).padStart(2, '0')}:`;
    // это метод, который добавляет ведущие нули к строке, если её длина меньше 2 символов. Например, если hours равно 5, то результат будет "05".
    displayMinutes.textContent = `${String(minutes).padStart(2, '0')}:`;
    displaySeconds.textContent = `${String(seconds).padStart(2, '0')}.`;
    displayMiliseconds.textContent = `${String(miliseconds).padStart(2, '0')}`;
}

function runStopwatch(event) {
    event.preventDefault();
    isPaused = !isPaused

    if (!isPaused){
        document.querySelector('.timer__button').innerHTML = `<img src="../../images/timer/Group%204.png" class="stop" alt="">`
    }else{
        document.querySelector('.timer__button').innerHTML = `<img src="../../images/timer/Polygon%201.png" class="start">`
    }


    //если секундомер уже был запущен, он очищает текущий интервал.
    if (timerInterval) clearInterval(timerInterval);
    if (!isPaused){
        tickSound.currentTime = 1; //устанавливаем позицию, с которой будет начинаться звук
        tickSound.play();
        timerInterval = setInterval(countdown, 10);
    }else{
        tickSound.pause();
    }
}

/**
 * Эта функция увеличивает на 1 секунду каждую итерацию
 * (то есть каждую секунду, когда запущен интервал).
 * Она также обновляет отображение секундомера
 */
function countdown() {

    totalSeconds++;
    updateDisplay();

}

//запуск секундомера по нажатию кнопки
document.querySelector('.timer__button').addEventListener('click', runStopwatch)

// запуск секундомера по нажатию пробела
document.addEventListener('keydown', function(event) {

    if(event.code !== 'Space') return;
    runStopwatch(event);

})

// Переход на предыдущую страницу при нажатии Escape
document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape') window.history.back();
});

//кнопка сброса секундомера
document.querySelector('.timer__reset-button').addEventListener('click', function() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    isPaused = true;
    updateDisplay();
    tickSound.pause();
    document.querySelector('.timer__button').innerHTML = `<img src="../../images/timer/Polygon%201.png" class="start">`
});

// вкл. выкл звук
soundButton.addEventListener('click', function() {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        soundButton.src = '../../images/timer/sound-on.svg';
        tickSound.play();
    } else {
        soundButton.src = '../../images/timer/sound-off.svg';
        tickSound.pause();
    }
});