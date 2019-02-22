
 //Create a list that holds all of your cards


 const cards = ['fa fa-diamond', 'fa fa-diamond',
 				'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
 				'fa fa-anchor', 'fa fa-anchor',
 				'fa fa-bolt', 'fa fa-bolt',
 				'fa fa-cube', 'fa fa-cube',
 				'fa fa-leaf', 'fa fa-leaf',
 				'fa fa-bicycle', 'fa fa-bicycle',
 				'fa fa-bomb', 'fa fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 
const deck = document.querySelector('.deck');

//put move counter in a variable
let moves = document.querySelector('.moves');




function newCard(card){
	return `<li class="card"><i class="${card}"></i></li>`;
}

//in this section I got started with help from the webinar by Mike

function startGame(){
 	let cardCreate = shuffle(cards).map(function(card){
 	return newCard(card);
 })
 	deck.innerHTML=cardCreate.join('');
 	moves.textContent=0;
 	
}

startGame();
 

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//initialize variables for cards and move counter
let currentCards = [];
let matchedCards = [];
let moveCounter = 0;
const allCards = document.querySelectorAll('.card');

//set up event listener for a card - if a card is clicked:
allCards.forEach(function(card){
card.addEventListener('click', function(open){
	showCard(card); //display card
	timeUpdate(); //when first card clicked, timer starts
	checkMatch(card); //add card to list of open cards, check match
	countMoves(card); //update move counter
		if (matchedCards.length >=8){ //put matched cards in an array
		gameOver();
		}	
});	
});

//open the first cards
 function showCard(card){
 	card.classList.add('open','show');
 }

//check the two cards to see if their class names in their HTML match. if yes, keep open, if no, turn over
 function checkMatch(card){
 	currentCards.push(card);
	
	if (currentCards[0].innerHTML === currentCards[1].innerHTML){
		keepMatchOpen(card);
		matchedCards.push(card);
		//console.log(matchedCards);
 	}

	else if ((currentCards.length == 2)&&(currentCards[0].innerHTML !== currentCards[1].innerHTML)) {
		closeNonMatch(card);
	}
 }	
 
 function keepMatchOpen(card){
 		currentCards[0].classList.add('match');
		currentCards[0].classList.remove('open', 'show');
		currentCards[1].classList.add('match');
		currentCards[1].classList.remove('open', 'show');
		currentCards= [];
 }

 function closeNonMatch(card){
		setTimeout(function(){
			currentCards.forEach(function(card){
				card.classList.remove('open', 'show');
				currentCards=[];
			});
		}, 500);
	}

const stars = document.querySelector('.stars');
 	
//count moves and remove a star for every 10 moves
 function countMoves(card){
 	moveCounter=moveCounter+1;
 	moves.textContent=moveCounter;

 	if (moveCounter==10){
 		stars.firstElementChild.remove();
 	}
 	if (moveCounter==20){
 		stars.firstElementChild.remove();
 	}
 	if (moveCounter==30){
 		stars.firstElementChild.remove();
 	}
 }

//timer variables

 let milliseconds=0;
 let seconds=0;
 let minutes=0;
 let updateMilliseconds=document.querySelector('.timer-millisec');
 let updateSeconds=document.querySelector('.timer-sec');
 let updateMinutes=document.querySelector('.timer-min');
 let interval;

 function timeUpdate(){
	clearInterval(interval);
    interval = setInterval(startTimer, 10);
 }
//function to get the timer started and place the text inside the spans
//with a little help getting started from https://www.cssscript.com/a-minimal-pure-javascript-stopwatch/
function startTimer(){
	
	milliseconds++;
	updateMilliseconds.innerHTML=milliseconds;

	if (milliseconds > 99) {
      	seconds++;
     	updateSeconds.innerHTML = "0" + seconds;
      	milliseconds = 0;
      	updateMilliseconds.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
    	updateSeconds.innerHTML = seconds;
    }

    
    if (seconds > 59){
    	minutes++;
      	updateMinutes.innerHTML = minutes;
      	seconds = 0;
      	updateSeconds.innerHTML = "0" + 0;
    }
}

//for the end of the game, the score panel will pop up and the text will get bigger
const scorePanelEnd = document.querySelector('.score-panel');
const finalScore = document.querySelector('h2');
const scoreTextToAdd = '<h2>Final Score: </h2>';
const finalTime = document.querySelector('h3');
const timeTextToAdd = '<h3>Final Time: </h3>';
const button = document.querySelector('button');
const repeat = document.querySelector('.fa-repeat');

	

 function gameOver(){
 	console.log("I'm finished!");
 	clearInterval(interval);
	scorePanelEnd.classList.add('endgame');//the new CSS class makes the box change
	finalScore.insertAdjacentHTML('afterbegin', scoreTextToAdd);
	finalTime.insertAdjacentHTML('afterbegin', timeTextToAdd);
	button.classList.remove('playagain');
	}

button.addEventListener('click', function (replay){
	playAgain();
})

repeat.addEventListener('click', function(replay){
	playAgain();
})

function playAgain(){
	window.location.reload();
}

