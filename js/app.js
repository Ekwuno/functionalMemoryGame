var cardDesk = document.getElementById("card-deck");
var cards = document.getElementsByClassName("card");
console.log(cards);
var arrayOfCards = [...cards]
console.log(arrayOfCards);
var click = 0;
var matchedCardsList = []
 
//switching positions
/* 
The first function shuffles the cards by getting an index in the arrary then storing it in a 
temp var  
*/
function shuffle(inputArray) {
    for (var i = 1; i <= inputArray.length; i++) {
        var temp = inputArray[i - 1];
        var randomIndex = Math.floor(Math.random() * i);
        inputArray[i - 1] = inputArray[randomIndex];
        inputArray[randomIndex] = temp;
    }
    return inputArray;
}
// the shuffle 
function startGame() {
cardDesk.innerHTML = ""; //empty card desk 
    arrayOfCards = shuffle(arrayOfCards);// shuffle cards
    var fiveMinutes = 60 * 5,
        display = document.querySelector('.timer' ) 
        startTimer(fiveMinutes,display)
    for (var i = 0; i < arrayOfCards.length; i++) {
        cardDesk.appendChild(arrayOfCards[i]);// append the shuffuled cards to the card desk one at a time 
        arrayOfCards[i].addEventListener("click",displayCard);
        arrayOfCards[i].addEventListener("click",cardOpen);
        arrayOfCards[i].classList.remove("open");// remove card open at the start 
        arrayOfCards[i].classList.remove("show"); // 
        arrayOfCards[i].classList.remove("match");// disable matching 
        arrayOfCards[i].classList.remove("disabled");
        arrayOfCards[i].addEventListener('click', congrats);
        closeIcon.addEventListener("click",closeCongrats);
        click = 0;
        document.getElementsByClassName("moves")[0].innerHTML = click;
    }
}
 document.body.onload = startGame;

 //display card function 
 function displayCard(){
     this.classList.toggle('open');
     this.classList.toggle('show');
     this.classList.toggle('disabled');
}

 //open cards variable, matching cards 
 var openCards = [] 
function cardOpen(){
    openCards.push(this);
    if(openCards.length == 2){
        click++ 
        document.getElementsByClassName('moves')[0].innerHTML= click;
        
        if (openCards[0].type == openCards[1].type){
            matchedCards(openCards[0], openCards[1])
        }else{
            unmatchedCards(openCards[0], openCards[1])

        }
        
    }


}
 // matched cards 
 function matchedCards (firstCard,secondCard){
    firstCard.classList.add("match","disabled");
    secondCard.classList.add("match","disabled");
    firstCard.classList.remove("open","show");
    secondCard.classList.remove("open","show");
    openCards =  []
    matchedCardsList.push(firstCard,secondCard)
 }

//  unmatched cards 

function unmatchedCards(firstCard,secondCard){
    firstCard.classList.add("unmatched","disabled");
    secondCard.classList.add("unmatched","disabled");
    disabled()
    // firstCard.classList.remove("open","show");
    // secondCard.classList.remove("open","show");
    
    setTimeout(() => {
        firstCard.classList.remove("open", "show", "unmatched", "disabled");
        secondCard.classList.remove("open", "show", "unmatched", "disabled");
        enabled()
        openCards=[];
    }, 1000)
    
}

function disabled (){

    arrayOfCards.forEach(stuff => {
        stuff.classList.add('disabled')
    });
    
} 

function enabled (){

    arrayOfCards.forEach(stuff => {
        stuff.classList.remove('disabled')
    });
    matchedCardsList.forEach(card => {
        card.classList.add('disabled')
    });
    
} 
var congratulation = document.getElementById('popup1');
function congrats (){
    if (matchedCardsList.length == arrayOfCards.length){
        congratulation.classList.add('show');
        closeIcon.addEventListener("click",closeCongrats);
        
    }
}
var closeIcon = document.getElementById('closeIcon');
function closeCongrats (){
    congratulation.classList.remove('show')
    startGame()
}

function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    interval = setInterval(function() {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
 
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
 
        display.textContent = minutes + ":" + seconds;
        time = minutes + ":" + seconds;
 
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
 }

 function refershMe(){
     clearInterval(interval);
     startGame();
 }