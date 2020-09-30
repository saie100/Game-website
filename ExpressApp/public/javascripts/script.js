const textArea = document.querySelector("#TextArea");
const textElement = document.querySelector("#original_text");
const resetButton = document.querySelector("#Rbutton");
const nextButton = document.querySelector("#Nbutton");
const displayTimer = document.querySelector(".Ccontainer")
const resultElement = document.querySelector(".result");
const level = document.querySelector(".level").innerHTML;
var new_score = 0.0;
var characterElement =[];

var collectChime_audio = document.querySelector("#chime");
var fail_audio = document.querySelector("#fail");

var interval;
var timerRunning = false;
var timer = [0,0,0,0];
var completedLevel = false;


//Level starts at Level 0
//Level ends at finalLevel - 1
const wordsByLevel = ["Hello world", "High speed tech", "Jim ate an apple", "Tommy ran to the beach", "Magic is a powerful thing"];
const finalLevel = wordsByLevel.length;
var currentLevel = 0;
var currentText = wordsByLevel[currentLevel];

addTextElement();

document.querySelector(".bar2").scrollIntoView();

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(num)
{
    if(num<10)
    {
        return "0";
    }
    else{
        return "";
    }
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0])+timer[0] + ":" +leadingZero(timer[1])+ timer[1] + ":" + leadingZero(timer[2])+ timer[2] ;
    displayTimer.innerText = currentTime;
    timer[3]++;
    new_score = new_score + .001;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

    let textEntered = textArea.value;
    let stop = false;


    for(let i=0; i<characterElement.length; i++)
    {
        if(characterElement[i].innerText === textEntered.charAt(i) && stop == false)
        {
            characterElement[i].style.color = "lime";
        }
        else{
            stop = true;
            characterElement[i].style.color = "black";
        }
    }

}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = textArea.value;
    let correctText = currentText.substring(0, textEntered.length);
    

    if(textEntered === currentText)
    {

        textArea.style.borderColor = "lime";
        clearInterval(interval);
        if(currentLevel === finalLevel -1)
        {
            nextButton.innerHTML = "END";
        }
        document.querySelector(".Ncontainer").style.visibility = 'visible';
        timerRunning = false;
        collectChime_audio.play();
        resultElement.innerHTML = Math.floor(10*(1/new_score));
        completedLevel = true;    
    }
    else if(textEntered !== correctText && completedLevel === false)
    {
        textArea.style.borderColor = "red";
        fail_audio.play();
    }
    else{

        textArea.style.borderColor = "grey";
    }
    
}

// Start the timer:
function start() {
    let textEnterdLength = textArea.value.length;
    if (textEnterdLength === 0 && timerRunning === false && completedLevel === false) {
        interval = setInterval(runTimer, 10);
        timerRunning = true;
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;
    completedLevel = false;

    textArea.style.borderColor = "grey";
    textArea.value = "";
    displayTimer.innerText = "00:00:00";
    new_score = 0;
    
    for(let i=0; i<characterElement.length; i++)
    {
        characterElement[i].style.color = "black";
        
    }
}

//Go to next level
function nextLevel(){
    
    if(currentLevel === finalLevel -1 )
    {
        location.href = "/";
    }
    else
    {    
        currentLevel++;
        //reset
        reset();
        
        currentText = wordsByLevel[currentLevel];

        //In progress: Transition animation

        
        
        addTextElement();
        document.querySelector(".Ncontainer").style.visibility = 'hidden';

    }
}

function addTextElement(){
  textElement.innerText="";

  for(let i=0; i<wordsByLevel[currentLevel].length; i++)
  {
    let element = document.createElement('span');
    element.setAttribute('class', 'char'+i);
    element.textContent = currentText.charAt(i);
    characterElement[i] = element;
    textElement.appendChild(element) ; 
    }

}


// Event listeners for keyboard input and the reset
textArea.addEventListener("keypress", start, false);
textArea.addEventListener("keyup", spellCheck, false);

resetButton.addEventListener("click", reset, false);

resetButton.addEventListener("mouseover", function(){
    resetButton.style.color = 'white';
}, false);

resetButton.addEventListener("mouseout", function(){
    resetButton.style.color = 'black';
}, false);


nextButton.addEventListener("click", nextLevel, false);

nextButton.addEventListener("mouseover", function(){
    nextButton.style.color = 'white';
}, false);

nextButton.addEventListener("mouseout", function(){
    nextButton.style.color = 'black';
}, false);

