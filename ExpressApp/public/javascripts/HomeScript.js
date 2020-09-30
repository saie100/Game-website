const practiceElement = document.querySelector(".containerP");

const challengeElement = document.querySelector(".containerC");

var audio = new Audio("../sounds/level-complete.mp3");


practiceElement.addEventListener("mouseover", function(){
    document.querySelector("#practice").style.color = "white";
    audio.play();    
}, false);

practiceElement.addEventListener("mouseout", function(){
    document.querySelector("#practice").style.color = "black";   
}, false);



challengeElement.addEventListener("mouseover", function(){
    document.querySelector("#challenge").style.color = "white";  
}, false);

challengeElement.addEventListener("mouseout", function(){
    document.querySelector("#challenge").style.color = "black";   
}, false);

