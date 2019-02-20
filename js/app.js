
 //Create a list that holds all of your cards


 var cards = ['fa fa-diamond', 'fa fa-diamond',
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

 
var deck = document.querySelector('.deck');

//put move counter in a variable
var moves = document.querySelector('.moves');


function newCard(card){
	return `<li class="card"><i class="${card}"></i></li>`;
}

function startGame(){
 	var cardCreate = shuffle(cards).map(function(card){
 	return newCard(card);
 })
 	deck.innerHTML=cardCreate.join('');
 	moves.textContent=0;
 	
}

startGame();
 

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
var currentCards = [];
var moveCounter = 0;
const allCards = document.querySelectorAll('.card');

//set up event listener for a card - if a card is clicked:
allCards.forEach(function(card){
card.addEventListener('click', function(open){
	showCard(card); //display card
	checkMatch(card); //add card to list of open cards, check match
	countMoves(card); //update move counter
});
});


 function showCard(card){
 	card.classList.add('open','show');
 }


 function checkMatch(card){
 	currentCards.push(card);
	console.log(currentCards);

	if (currentCards[0].innerHTML == currentCards[1].innerHTML){
		keepMatchOpen(card);
 	}

	else if (currentCards.length == 2) {
		//&&(currentCards[0].innerHTML !== currentCards[1].innerHTML)
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

var stars = document.querySelector('.stars');
 	
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


/*
 

 function timeOfGame(){
	gameTime=document.querySelector('.timer');
	setTime
 }

 function endOfGame(){
	if all cards match, ....
	stop timer
	make move counter big, add words "final score"
	and "final time"
 }

 function refreshGame(){
	<i class="fa fa-repeat"></i>
	when clicked, the board shuffles and restarts
 }

 */


