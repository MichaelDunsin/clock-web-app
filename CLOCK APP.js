// general control
let mother = document.getElementsByTagName("body");
let container = document.getElementById("container");
let preAppLoadingAnimation = document.getElementById("pre-website-loading-animation-container");
let navbar = document.getElementById("navbar");
let navbarImg1 = document.getElementById("navbar-img1");
let navbarImg2 = document.getElementById("navbar-img2");
let navHeader = document.querySelector("#navbar .navbar-header");
let navHeaderName = document.querySelector("#navbar .navbar-header p");
let navWords = document.querySelectorAll(".navbar-icons div p");
let body = document.getElementById("body");
let slides = document.querySelectorAll(".slide");
let slideIndex = 0;
/* 
So in a way, i just hacked the normal Client side rendering of this webapp and made ith look like Server side rendering
because nothing will actually be displayed in the first 4.5s (apart from the loading animation) to wait for the rest of the page to 
fully load(actually, the time the rest of the app needs to load is very little, but i just wanted the loading animation to show for long). 
Then after 4.5s, the webapp comes to view
*/
window.addEventListener("load", ()=>{
  setTimeout(function(){
    preAppLoadingAnimation.style.display = "none";
    container.style.display = "block";
    setInterval(
      function()
      {container.style.opacity = "1";},
       100)
  }, 4500)
}) 

// collapse navbar
function collapseNavbar(menu){
    if(!menu.hasAttribute("collapseNavbar")){
        menu.setAttribute("collapseNavbar", "true");
        navbar.style.width = "250px";
        navWords.forEach((word) => {
            setTimeout(function(){
                word.style.display = "block";
                navbarImg1.style.display = "none";
                navbarImg2.style.display = "block";
            }, 500)
        
        });
        navHeaderName.style.width = "70%"; 
       navHeaderName.style.scale = "1"; 
       navHeaderName.style.color = "black";
       menu.style.animation = "menu1 0.5s linear";
      
    }

    else{
        menu.removeAttribute("collapseNavbar");
        navbar.style.width = "";
        navWords.forEach((word) => {
            word.style.display = ""
        })
        navHeaderName.style.width = "";     
        navHeaderName.style.scale = "";
        navHeaderName.style.color = "";
        menu.style.animation = "menu2 0.5s linear";
        setTimeout(function(){
            navbarImg1.style.display = "block";
            navbarImg2.style.display = "none";
        }, 500)
    }
}


function changeTheme(theme){
    let html = document.querySelector("html")

    if(!theme.hasAttribute("theme")){
        theme.setAttribute("theme", "true");
        html.classList.add("change-theme")

    }
    else{
        theme.removeAttribute("theme");
        html.classList.remove("change-theme")
    }
}

// navbar controls
let bodyName = document.getElementById("body-name");

function iconClick(icon){
    bodyName = document.getElementById("body-name");
    let name = icon.getAttribute("name");

    bodyName.style.opacity = "0"
    setTimeout(function(){bodyName.style.opacity = "1";
        bodyName.innerHTML = name;
    }, 250)

    let attr = icon.getAttribute("attr");
    slides[attr].classList.add("active");
    if(attr > slideIndex){
        slides[slideIndex].style.animation = 'next1 0.3s ease-in forwards';
        slideIndex = attr;
        slides[slideIndex].style.animation = 'next2 0.3s ease-in forwards';
    }
    if(attr == slideIndex){
        return;
    }
    else{
        slides[slideIndex].style.animation = 'prev1 0.3s ease-in forwards';
        slideIndex = attr;
        slides[slideIndex].style.animation = 'prev2 0.3s ease-in forwards'; 
    }
}

// alarm scroller

let alarmHours = document.querySelectorAll(".hour-numbers p");
let hourNumbers = document.querySelector(".hour-numbers")
let alarmHourValue = 0;
let alarmMinutes = document.querySelectorAll(".minutes-numbers p");
let minutesNumbers = document.querySelector(".minutes-numbers")
let alarmMinuteValue = 0;


function increaseHours(){
alarmHours[alarmHourValue].style.animation = 'increase1 0.2s ease-in forwards';
if(alarmHourValue >= alarmHours.length-1){
    alarmHourValue = 0;
}
else{
    alarmHourValue++;
}
alarmHours[alarmHourValue].classList.add('visible');
alarmHours[alarmHourValue].style.animation = 'increase2 0.2s ease-in forwards';
}
function decreaseHours(){
    alarmHours[alarmHourValue].style.animation = 'decrease1 0.2s ease-in forwards';
    if(alarmHourValue <= 0){
        alarmHourValue = alarmHours.length-1;
    }
    else{
        alarmHourValue--;
    }
    alarmHours[alarmHourValue].classList.add('visible');
    alarmHours[alarmHourValue].style.animation = 'decrease2 0.2s ease-in forwards';
}

hourNumbers.addEventListener("keydown", function(e){
    if(e.key === 'ArrowUp'){
        increaseHours();
    }
    if(e.key === 'ArrowDown'){
        decreaseHours();
    }
})

function increaseMinutes(){
alarmMinutes[alarmMinuteValue].style.animation = 'increase1 0.2s ease-in forwards';
if(alarmMinuteValue >= alarmMinutes.length-1){
    alarmMinuteValue = 0;
}
else{
    alarmMinuteValue++;
}
alarmMinutes[alarmMinuteValue].classList.add('visible');
alarmMinutes[alarmMinuteValue].style.animation = 'increase2 0.2s ease-in forwards';
}
function decreaseMinutes(){
    alarmMinutes[alarmMinuteValue].style.animation = 'decrease1 0.2s ease-in forwards';
    if(alarmMinuteValue <= 0){
        alarmMinuteValue = alarmMinutes.length-1;
    }
    else{
        alarmMinuteValue--;
    }
    alarmMinutes[alarmMinuteValue].classList.add('visible');
    alarmMinutes[alarmMinuteValue].style.animation = 'decrease2 0.2s ease-in forwards';
}

minutesNumbers.addEventListener("keydown", function(e){
    if(e.key === 'ArrowUp'){
        increaseMinutes();
    }
    if(e.key === 'ArrowDown'){
        decreaseMinutes();
    }
})

// first alarm-functions

let alarmToogleCssCounter = 0;
let newAlarm = document.getElementById("new-alarm");
let alarmInvisibleMom = document.querySelector(".alarm-invisible-mom");
let hours =  JSON.parse(localStorage.getItem("hours")) || [];
let minutes = JSON.parse(localStorage.getItem("minutes")) || [];
let repeat = JSON.parse(localStorage.getItem("repeat")) || [];
let ringtone = JSON.parse(localStorage.getItem("ringtone")) || [];
let Daily = document.getElementById("daily");
let Once = document.getElementById("once");
let Country = document.getElementById("country");
let Asmr = document.getElementById("asmr");
let Jazz = document.getElementById("jazz");
let repeatValue = "";
let ringtoneValue = "";

function repeatDaliy(){
     Daily = document.getElementById("daily");
     repeatValue = "";
    if(Daily.checked){
        repeatValue = "daily";
    }};

    function repeatOnce(){
        Once = document.getElementById("once");
        repeatValue = "";
       if(Once.checked){
           repeatValue = "once";
       }};

       function ringtoneCountry(){
        Country = document.getElementById("country");
        ringtoneValue = "";
       if(Country.checked){
        ringtoneValue = "audio/country.mp3";
       }};

       function ringtoneAsmr(){
        Asmr = document.getElementById("asmr");
        ringtoneValue = "";
       if(Asmr.checked){
        ringtoneValue = "audio/asmr.mp3";
       }};

       function ringtoneJazz(){
        Jazz = document.getElementById("jazz");
        ringtoneValue = "";
       if(Jazz.checked){
        ringtoneValue = "audio/jazz.mp3";
       }};

       function showAlarmSetter(){
        newAlarm.style.transform = "translateY(0%)";
    }
    
    function removeAlarmSetter(){
        newAlarm.style.transform = "translateY(-145%)";
    }    

    let alarmSound = document.getElementById("Audio");
    let alarmClick = document.getElementById("Click");
    
    function playAlarmSound(egg){
        function reg(sound){
        alarmSound = document.getElementById("Audio");
            alarmSound.src = sound
            alarmSound.play();
        }
        reg(egg);
    }

// create alarm
let boxes = document.querySelectorAll(".alarm-box-container");
let errorMessage = document.getElementById("error-message");
let noAlarms = document.getElementById("no-alarms");

function createAlarm(){
    if(!Daily.checked && !Once.checked){
        errorMessage.style.color = "red";
        errorMessage.innerText = "Select Repeat";
        return false;
    }
    if(!Country.checked && !Asmr.checked && !Jazz.checked){
        errorMessage.style.color = "red";
        errorMessage.innerText = "Select Ringtone";
        return false;
    }
    else{
    errorMessage.innerText = "";
    alarmToogleCssCounter++;
    hours.push(alarmHourValue);
    minutes.push(alarmMinuteValue);
    repeat.push(repeatValue);
    ringtone.push(ringtoneValue);
    updateAlarmFigures();
    createAlarmElements(alarmHourValue, alarmMinuteValue, alarmToogleCssCounter-1);
    removeAlarmSetter();
    if(alarmToogleCssCounter > 0){
        noAlarms.style.display = "none";    
        } 
     }
}

// cancel alarm

function cancelAlarm(){    
    removeAlarmSetter();
}

// load alarm

function loadAlarms(){
    boxes = document.querySelectorAll(".alarm-box-container");
    boxes.forEach(function(box){
        box.remove();
    })
    alarmToogleCssCounter = hours.length;
    if(hours.length > 0){
        noAlarms.style.display = "none";   
    }
    for (i=0; i<hours.length; i++){
    createAlarmElements(hours[i], minutes[i], i);
    }
}

// create alarm elements

function createAlarmElements(hour, minute, index){
    let alarmBoxContainer = document.createElement("div");
    alarmBoxContainer.className = "alarm-box-container";
   setTimeout( ()=> {alarmBoxContainer.style.opacity = "1"}, 20);
    alarmInvisibleMom.appendChild(alarmBoxContainer);

    let alarmBox = document.createElement("div");
    alarmBox.className = "alarm-box";

    let alarmBoxParagraph = document.createElement("p");
    alarmBox.appendChild(alarmBoxParagraph);

    let alarmBoxParagraphHour = document.createElement("input");
    alarmBoxParagraphHour.className = "alarm-hour-value";
    alarmBoxParagraphHour.type = "text";
    alarmBoxParagraphHour.disabled = true;
    alarmBoxParagraphHour.value = (hour < 10 ? "0" : "") + hour;
    alarmBoxParagraph.appendChild(alarmBoxParagraphHour);

    let alarmBoxParagraphBold = document.createElement("b");
    alarmBoxParagraphBold.innerHTML =":";
    alarmBoxParagraph.appendChild(alarmBoxParagraphBold);

    let alarmBoxParagraphMinute = document.createElement("input");
    alarmBoxParagraphMinute.className = "alarm-minute-value";
    alarmBoxParagraphMinute.type = "text";
    alarmBoxParagraphMinute.disabled = true;
    alarmBoxParagraphMinute.value =(minute < 10 ? "0" : "") + minute;
    alarmBoxParagraph.appendChild(alarmBoxParagraphMinute);

    let toggleAlarm = document.createElement("div");
    toggleAlarm.className = "toggle-alarm";
    alarmBox.appendChild(toggleAlarm);

    let alarmT = document.createElement("input");
    alarmT.className = "alarmT"
    alarmT.id = index;
    alarmT.type = "checkbox";

    let toggleAlarmLabel = document.createElement("label");
    toggleAlarmLabel.htmlFor = index;
    toggleAlarm.appendChild(alarmT);
    toggleAlarm.appendChild(toggleAlarmLabel);
    
    let toggleAlarmLabelH6 = document.createElement("h6");
    toggleAlarmLabel.appendChild(toggleAlarmLabelH6);

    let deleteAlarm = document.createElement("div");
    deleteAlarm.className = "delete-alarm";
    deleteAlarm.innerHTML = "Delete Alarm";
    alarmBoxContainer.appendChild(alarmBox);
    alarmBoxContainer.appendChild(deleteAlarm);
    let deleteAlarmImg = document.createElement("img");
    deleteAlarmImg.src = "images/plus-button.png";
    deleteAlarm.appendChild(deleteAlarmImg);
}

// update alarm functions
function updateAlarmFigures(){
    localStorage.setItem("hours", JSON.stringify(hours));
    localStorage.setItem("minutes", JSON.stringify(minutes));
    localStorage.setItem("repeat", JSON.stringify(repeat));
    localStorage.setItem("ringtone", JSON.stringify(ringtone));
}

// click event for deleting alarms

alarmInvisibleMom.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
  deleteAlarm(e);
        }
    })

    // delete alarm
 
    function deleteAlarm(del){
          hours =  JSON.parse(localStorage.getItem("hours")) || [];
        minutes = JSON.parse(localStorage.getItem("minutes")) || [];
        repeat = JSON.parse(localStorage.getItem("repeat")) || [];
       ringtone = JSON.parse(localStorage.getItem("ringtone")) || [];
        let parentDiv = del.target.parentElement.parentElement;
       let input = parentDiv.querySelector(".alarmT");
       let uniqueId = input.id;
       hours.splice(uniqueId, 1);
       minutes.splice(uniqueId, 1);
       repeat.splice(uniqueId, 1);
       ringtone.splice(uniqueId, 1);
       updateAlarmFigures();
       loadAlarms();
       if(alarmToogleCssCounter > 0){
        noAlarms.style.display = "none";    
        } 
        else{
            noAlarms.style.display = "flex"; 
        }
    }

// check alarms

function checkAlarms(){
    let currentTime = new Date();
    boxes = document.querySelectorAll(".alarm-box-container");
    let toogle = document.querySelectorAll(".alarmT");
hours =  JSON.parse(localStorage.getItem("hours")) || [];
minutes = JSON.parse(localStorage.getItem("minutes")) || [];
repeat = JSON.parse(localStorage.getItem("repeat")) || [];
ringtone = JSON.parse(localStorage.getItem("ringtone")) || [];
for(i=0; i<hours.length; i++){
    if(!toogle[i].checked){
   if(parseInt(hours[i]) === currentTime.getHours() && parseInt(minutes[i]) === currentTime.getMinutes() && currentTime.getSeconds() === 0 && repeat[i] === "daily"){
    alarmClick.addEventListener("click", ()=> {
        playAlarmSound(ringtone[i]);
        boxes[i].style.animation = 'box1 1.5s ease-in 40';
    })
    alarmClick.click();

setTimeout(()=> {window.confirm(`The time is ${(currentTime.getHours() > 10 ? "" : "0") + 
    currentTime.getHours()}:${(currentTime.getMinutes() > 10 ? "" : "0") + 
    currentTime.getMinutes()} ${(currentTime.getHours() < 12 ? "AM" : "PM")}`)
    if(window.confirm(`The time is ${(currentTime.getHours() > 10 ? "" : "0") + currentTime.getHours()}:${(currentTime.getMinutes() > 10 ? "" : "0") + currentTime.getMinutes()} ${(currentTime.getHours() < 12 ? "AM" : "PM")}`)){

    }
    else{
        alarmSound.pause();
    }
    }
    , 500);
    } 
    if(parseInt(hours[i]) === currentTime.getHours() && parseInt(minutes[i]) === currentTime.getMinutes() && currentTime.getSeconds() === 0 && repeat[i] === "once"){
        alarmClick.click();
        alarmClick.addEventListener("click", ()=> {
            playAlarmSound(ringtone[i]);
            boxes[i].style.animation = 'box1 1.5s ease-in 40';
        })
         hours.splice(i, 1);
        minutes.splice(i, 1);
        repeat.splice(i, 1);
        ringtone.splice(i, 1);
        updateAlarmFigures();
        setTimeout(function(){
        loadAlarms();
        }, 57000)
        setTimeout(()=>
             alert(`The time is ${(currentTime.getHours() > 10 ? "" : "0") + currentTime.getHours()}:${(currentTime.getMinutes() > 10 ? "" : "0") + currentTime.getMinutes()} ${(currentTime.getHours() < 12 ? "AM" : "PM")}`), 500);
            }
            boxes[i].style.opacity = "1";
        }
        else{
            boxes[i].style.opacity = "0.7";
        }
}
}

// local time 
let hrs = document.getElementById('hrs');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let date = document.getElementById("date");

setInterval(function(){
let currentTime = new Date();
let month;
hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();

if(currentTime.getMonth() === 0){
    month = "January";
}
if(currentTime.getMonth() === 1){
    month = "February";
}
if(currentTime.getMonth() === 2){
    month = "March";
}
if(currentTime.getMonth() === 3){
    month = "April";
}
if(currentTime.getMonth() === 4){
    month = "May";
}
if(currentTime.getMonth() === 5){
    month = "June";
}
if(currentTime.getMonth() === 6){
    month = "July";
}
if(currentTime.getMonth() === 7){
    month = "August";
}
if(currentTime.getMonth() === 8){
    month = "September";
}
if(currentTime.getMonth() === 9){
    month = "October";
}
if(currentTime.getMonth() === 10){
    month = "November";
}
if(currentTime.getMonth() === 11){
    month = "December";
}

date.innerHTML = `${currentTime.getDate()} | ${month} | ${currentTime.getFullYear()}`;
}, 1000)
// set interval to check alarms every second
setInterval(checkAlarms, 1000);

// load the alarms each time the browser refreshes
window.addEventListener("load", loadAlarms);

let submit = document.getElementById("submit");
let enter = document.getElementById("enter")
let country = enter.value.trim().toLowerCase();
let answerTime = document.getElementById("answer-time");
let answerCountry = document.getElementById("answer-country");
let list = document.getElementById("list");
let imgSearchBox = document.getElementById("imgSearchBox");
let loadingAnimation = document.getElementById("loading-animation");
let answerWrapper = document.getElementById("answer-wrapper");

    fetch("./CLOCK APP.json").then(response => response.json())
    .then((data) => {
    let countries = data;

    enter.addEventListener("keyup", ()=>{
    list.innerHTML = "";
    answerWrapper.style.display = "none";

    let egg = document.createElement('div');
    country = enter.value.trim().toLowerCase();

    let regex = country;
    Object.keys(countries).forEach((aKey) => {
    egg = document.createElement('div');

    if(aKey.startsWith(regex)){
    if(regex === ""){
    return false
    }

    enter = document.getElementById("enter")
    egg = document.createElement('div');
    let haha = aKey.replace(regex, `<span class="highlight">${regex}</span>`);
    egg.innerHTML = haha;
    egg.className = "searches";
    list.appendChild(egg); 

    egg.addEventListener("click", ()=>{
        enter.value = aKey
        submit.click();
    })}
    })

    })

    imgSearchBox.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        submit.click();
    list.innerHTML = "";
    e.preventDefault();
    }

    })

    submit.addEventListener("click", (e)=>{
        list.innerHTML = "";
    e.preventDefault();

    answerWrapper.style.display = "flex";
    loadingAnimation.style.display = "block";
    loadingAnimation.play();
    answerCountry.style.display = "none";
    answerTime.style.display = "none";
    answerCountry.innerHTML = "";
    answerTime.innerHTML = "";

    country = document.getElementById("enter").value.trim().toLowerCase();
    const endPoint = countries[country];
    if(endPoint){
    fetch(`https://www.worldtimeapi.org/api/timezone/${endPoint}`)
    .then(response => response.json())
    .then((data) => {
    let timeString = new Date(data.datetime);
    answerWrapper.style.display = "flex";
    loadingAnimation.style.display = "none";
    answerCountry.style.display = "block";
    answerTime.style.display = "block";
    answerCountry.innerHTML = `${country}`;
    answerTime.innerHTML = `${timeString.toLocaleTimeString()} <br> <span class="time-string">${timeString.toLocaleDateString()}</span>`
})
    .catch((error) => {
    answerWrapper.style.display = "flex";
    loadingAnimation.style.display = "none";
    answerCountry.style.display = "block";
    answerTime.style.display = "none";
    answerCountry.innerHTML = `Error encountered while fetching data`;
    answerTime.innerHTML = "";
    console.error("An error was encountered", error);
    })
    }
    else{
    answerWrapper.style.display = "flex";
    loadingAnimation.style.display = "none";
    answerCountry.style.display = "block";
    answerTime.style.display = "none";
    answerCountry.innerHTML = `Country not recognized`;
    }
    })
    })

   
    let stopWatchHrs = document.getElementById("hurs");
    let stopWatchHrsSpan = document.getElementById("hurs-span");
    let stopWatchMins = document.getElementById("mins");
    let stopWatchSecs = document.getElementById("secs");
    let stopWatchMilliSecs = document.getElementById("milli-secs");
    let stopwatchPlay = document.getElementById("stopwatch-play");
    let stopwatchPause = document.getElementById("stopwatch-pause");
    let stopwatchRestart = document.getElementById("stopwatch-restart");
    let stopwatchPauseContainer = document.getElementById("stopwatch-pause-container")

    function stopwatchControls(){

        let  millisecondsCounter = 0
        let  secsCounter = 0
        let  minsCounter = 0
        let  hrsCounter = 0

       stopwatchPlay.addEventListener("click", ()=>{

            stopwatchPlay.style.display = "none";
            stopwatchPause.style.display = "block";
            stopwatchRestart.style.display = "block";

        let stopwatch = setInterval(function(){
            millisecondsCounter++
            stopWatchMilliSecs.innerHTML = (millisecondsCounter < 10 ? "0" : "") + millisecondsCounter
            if(millisecondsCounter === 100){
                millisecondsCounter = 0
                stopWatchMilliSecs.innerHTML = (millisecondsCounter < 10 ? "0" : "") + millisecondsCounter
                secsCounter++
            
                stopWatchSecs.innerHTML = (secsCounter < 10 ? "0" : "") + secsCounter
          
            if(secsCounter === 60){
            secsCounter = 0
            stopWatchSecs.innerHTML = (secsCounter < 10 ? "0" : "") + secsCounter
            minsCounter++
            stopWatchMins.innerHTML = (minsCounter < 10 ? "0" : "") + minsCounter
           
           if(minsCounter === 60){
            minsCounter = 0
            stopWatchMins.innerHTML = (minsCounter < 10 ? "0" : "") + minsCounter
            hrsCounter++
            
            stopWatchHrs.style.display = "block";
            stopWatchHrsSpan.style.display = "block";
            stopWatchHrs.innerHTML = (hrsCounter < 10 ? "0" : "") + hrsCounter
           }
        }
    }

        }, 10)


        stopwatchPause.addEventListener("click", ()=>{
            if(!stopwatchPause.hasAttribute("stop")){
                stopwatchPause.setAttribute("stop", "true");
                clearInterval(stopwatch)
                stopwatchPlay.style.display = "block";
                stopwatchPause.style.display = "none";
        }

        else{
            stopwatchPause.removeAttribute("stop");
            stopwatchPlay.style.display = "none";
            stopwatchPause.style.display = "block";

        }
            
        })

        stopwatchRestart.addEventListener("click", ()=>{
            stopwatchPlay.style.display = "block";
            stopwatchPause.style.display = "none";
            stopwatchRestart.style.display = "none";

            clearInterval(stopwatch);

            millisecondsCounter = 0
            secsCounter = 0
            minsCounter = 0
            hrsCounter = 0
            stopWatchMilliSecs.innerHTML = "00";
            stopWatchSecs.innerHTML = "00";
            stopWatchMins.innerHTML = "00";
            stopWatchHrs.innerHTML = "00";
            
        })

       })
    }

    stopwatchControls();

let displayerHrs = document.getElementById("displayer-hrs");
let displayerMin = document.getElementById("displayer-min");
let displayerSec = document.getElementById("displayer-sec");

let timerHrs = document.getElementById("timer-hrs");
let timerMin = document.getElementById("timer-min");
let timerSec = document.getElementById("timer-sec");

let timerTimerInput = document.querySelectorAll(".timer-timer input");

timerTimerInput.forEach((timerInput) => {
    timerInput.addEventListener("input", ()=>{

        if(timerInput.value.match(/\D/)){
          timerInput.value = timerInput.value.replace(/\D/, "");
        }
        
        })
})

timerHrs.addEventListener("input", ()=>{
    if(timerHrs.value > 23){
        timerHrs.value = timerHrs.value.replace(timerHrs.value.charAt(1), "")
    }
})

timerMin.addEventListener("input", ()=>{
    if(timerMin.value > 59){
        timerMin.value = timerMin.value.replace(timerMin.value.charAt(1), "")
    }
})

timerSec.addEventListener("input", ()=>{
    if(timerSec.value > 59){
        timerSec.value = timerSec.value.replace(timerSec.value.charAt(1), "")
    }
})

let timerRestart = document.getElementById("timer-restart");
let timerPause = document.getElementById("timer-pause");
let timerPlay = document.getElementById("timer-play");

let timerDisplayer = document.querySelector(".timer-displayer");
let timerTimer = document.querySelector(".timer-timer");

function timerControls(){
    timerHrs = document.getElementById("timer-hrs");
    timerMin = document.getElementById("timer-min");
    timerSec = document.getElementById("timer-sec");

    

    let  timerHrsCounter = timerHrs.value
    let  timerMinCounter = timerMin.value
    let timerSecCounter = timerSec.value

    setInterval(function(){
        if(((timerHrs.value === "00" || timerHrs.value === "0") && (timerMin.value === "00" || timerMin.value === "0") && (timerSec.value === "00" || timerSec.value === "0")) || (timerHrs.value === "" || timerMin.value === "" || timerSec.value === "")){
            timerPlay.style.opacity = "0.5"
            timerPlay.style.pointerEvents = "none"
        }
        else{
        timerPlay.style.opacity = "1"
        timerPlay.style.pointerEvents = "auto"
        }
    }, 10)

    timerPlay.addEventListener("click", ()=>{
        timerHrsCounter = timerHrs.value;
        timerMinCounter = timerMin.value;
        timerSecCounter = timerSec.value;

        displayerHrs.innerHTML = (timerHrsCounter.length < 2 ? "0" : "") + timerHrsCounter
        displayerMin.innerHTML = (timerMinCounter.length < 2 ? "0" : "") + timerMinCounter
        displayerSec.innerHTML = (timerSecCounter.length < 2 ? "0" : "") + timerSecCounter

        displayerHrs = document.getElementById("displayer-hrs");
        displayerMin = document.getElementById("displayer-min");
        displayerSec = document.getElementById("displayer-sec");

        timerPlay.style.display = "none";
        timerPause.style.display = "block";
        timerRestart.style.display = "block";
        timerDisplayer.style.display = "flex"
        timerTimer.style.display = "none"

        
       let timer = setInterval(function(){
            timerSecCounter--

            timerHrs.value = timerHrsCounter;
            timerMin.value = timerMinCounter;
            timerSec.value = timerSecCounter;

            displayerSec.innerHTML = (timerSecCounter < 10 ? "0" : "") + timerSecCounter
            
            if(timerSecCounter < 0){
            timerSecCounter = 59
            displayerSec.innerHTML = (timerSecCounter < 10 ? "0" : "") + timerSecCounter

            timerMinCounter--
            displayerMin.innerHTML = (timerMinCounter < 10 ? "0" : "") + timerMinCounter
           
            if(timerMinCounter < 0){
            timerMinCounter = 59
            displayerMin.innerHTML = (timerMinCounter < 10 ? "0" : "") + timerMinCounter

            timerHrsCounter--
            displayerHrs.innerHTML = (timerHrsCounter < 10 ? "0" : "") + timerHrsCounter
            }

            if(timerHrsCounter < 0){
                clearInterval(timer)
                timerSecCounter = 0
                timerMinCounter = 0
                timerHrsCounter = 0
                timerSec.value = ""
                timerMin.value = ""
                timerHrs.value = ""

                timerPlay.style.display = "block";
                timerPause.style.display = "none";
                timerRestart.style.display = "none";
                timerDisplayer.style.display = "none"
                timerTimer.style.display = "flex"

                let timerClick = document.getElementById("timer-click");
                let timerAudio = document.getElementById("timer-audio");
                timerClick.addEventListener("click", ()=>{
                    timerAudio = document.getElementById("timer-audio");
                    timerAudio.play()
                })

                timerClick.click();

               setTimeout(() => {
                window.confirm("Time's Up !!!")

                if(window.confirm("Time's Up !!!")){
                    
                }              
                else{
                    timerAudio.pause()
                }
               }, 500);

            }
        }  

    }, 1000)

    timerPause.addEventListener("click", ()=>{
        if(!timerPause.hasAttribute("stop")){
            timerPause.setAttribute("stop", "true");
            clearInterval(timer)
            timerPlay.style.display = "block";
            timerPause.style.display = "none";
    }

    else{
        timerPause.removeAttribute("stop");
        timerPlay.style.display = "none";
        timerPause.style.display = "block";

    }
    }) 
    
    timerRestart.addEventListener("click", ()=>{
        clearInterval(timer)

        timerPlay.style.display = "block";
        timerPause.style.display = "none";
        timerRestart.style.display = "none";
        timerDisplayer.style.display = "none"
        timerTimer.style.display = "flex"

        timerSecCounter = 0
        timerMinCounter = 0
        timerHrsCounter = 0

        timerSec.value = ""
        timerMin.value = ""
        timerHrs.value = ""

        
    })
    
    })

}

timerControls()