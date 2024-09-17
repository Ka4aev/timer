const inputHours = document.querySelector('.timer__input-hour');// инпут для часов
const inputMinutes = document.querySelector('.timer__input-min');//инпут для минут

const button = document.querySelector('.timer__button');//для работы с кнопкой
const buttonReset = document.querySelector('.timer__reset-button')// для работы с кнопкой сброса
const dateNow = document.querySelector('.date__now');//для работы с текущем временем

const displayHours = document.querySelector('.timer__hours');//Вывод часов
const displayMinutes = document.querySelector('.timer__min');//вывод минут

const myAudio = document.getElementById('budilnikAudio');//Получение звука
const audioButton = document.getElementById('sound-button');//для работы со звуком

let isSoundOn = true;
let isRunning = false;


// Функция для отображения текущего времени, которое установленно на компьютерe
const date = new Date();
dateNow.innerHTML = (String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0"));
let time = setInterval(function(){
    const date = new Date();
    dateNow.innerHTML = (String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, 0));
}, 1000);


//Функция для установки будильника
inputHours.addEventListener('input', function(){
    let valueHours = inputHours.value;
    if(valueHours > 23){
        inputHours.value = 23;
    }else if(valueHours < 0){
        inputHours.value = 0;
    }
    displayHours.textContent = String(inputHours.value).padStart(2, "0");
});
inputMinutes.addEventListener('input', function(){
    let valueMinutes = inputMinutes.value;
    if(valueMinutes > 59){
        inputMinutes.value = 59;
    }else if(valueMinutes < 0){
        inputMinutes.value = 0;
    }
    displayMinutes.textContent = String(inputMinutes.value).padStart(2, "0");
});

//Функция для запуска будильника


buttonReset.addEventListener("click", function(){
    isRunning = false;
    flag = false;
    displayHours.textContent = "00";
    displayMinutes.textContent = "00";
    inputHours.value = '';
    inputMinutes.value = '';
})

button.addEventListener('click', function(){
    if(isRunning) return;

    if(!inputHours.value && !inputMinutes.value){
        alert('Введите время для будильника!!')
        return;
    }

    isRunning = true;
    let setDate = 0;//усстановленное время
    let nowDate = 0;//текущее время на компьютере
    let flag = true;

    buttonReset.addEventListener("click", function(){
        isRunning = false;
        flag = false;
        displayHours.textContent = "00";
        displayMinutes.textContent = "00";
        inputHours.value = '';
        inputMinutes.value = '';
    })

    let date = new Date();

    nowDate += date.getHours() * 3600 || 0;
    nowDate += date.getMinutes() * 60 || 0;
    nowDate += date.getSeconds() || 0;

    setDate += inputHours.value * 3600 || 0;
    setDate += inputMinutes.value * 60 || 0;

    const decTime = function(){
        if(flag){
            if(setDate != nowDate){
                setDate--;
                console.log(setDate + " До звонка будильника");
                console.log(nowDate + " В это время будильник запущен")
                console.log(flag);
                setTimeout(decTime, 1000);
            }else{
                myAudio.play();
                displayHours.textContent = "00";
                displayMinutes.textContent = "00";
                inputHours.value = '';
                inputMinutes.value = '';
                return;
            }
        }

    }

    const incTime = function(){
        if(flag){
            if(setDate != nowDate){
                setDate++;
                console.log(setDate + " До звонка будильника");
                console.log(nowDate + " В это время будильник запущен")
                console.log(flag);
                setTimeout(incTime, 1000);
            }else{
                myAudio.play();
                displayHours.textContent = "00";
                displayMinutes.textContent = "00";
                inputHours.value = '';
                inputMinutes.value = '';
                return;
            }
        }

    }

    if(setDate > nowDate){
        setTimeout(decTime, 1000);
    }else if(setDate <= nowDate){
        let buff = 86400 - nowDate;
        setDate = 0;
        setDate -= buff;
        setTimeout(incTime, 1000);
    }

});

// Вкл/выкл звук;

audioButton.addEventListener('click', function(){
    isSoundOn = !isSoundOn;
    if(isSoundOn){
        audioButton.src = '../../images/timer/sound-on.svg';
    }else{
        audioButton.src = '../../images/timer/sound-off.svg';
        myAudio.pause();
    }
})

document.addEventListener('keydown', function(event){
    if(event.key === 'Escape'){
        window.history.back();
    }
})






