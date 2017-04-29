// Declare global variables
var answer;
var cities = ["barcelona", "munich", "melbourne", "shanghai", "florence", "oslo"];
var gameCount = 0;
var winCount = 0;
var lossCount = 0;
var lettersGuessed = [];
var guessesRemaining;
var currentWord = [];
var gameInProgress = false;


// Initialize variables upon start and restart of game
function reset() {
	gameInProgress = true;
	guessesRemaining = 10;
	currentWord = [];
	lettersGuessed = [];

	// Pick a random answer and generate the corresponding hidden word
	var index = Math.floor(Math.random() * cities.length);
	answer = cities[index];
	for (i=0; i<answer.length; i++) {
		currentWord[i] = "_";
	}
}

// Display current statistics to the screen
function print(){
	document.getElementById("game-count").innerHTML = gameCount;
	document.getElementById("win-count").innerHTML = winCount;
	document.getElementById("loss-count").innerHTML = lossCount;
	document.getElementById("guess-remaining").innerHTML = guessesRemaining;
	document.getElementById("word").innerHTML = currentWord.join(" ");
	document.getElementById("letter-guessed").innerHTML = lettersGuessed.join(" ");
}

// First, check if the letter has been guessed already
function compare(x){
	var letterFound = false;
	// If letter has not been guessed, run the following code. If letter has already been guessed, nothing happens.
	if (lettersGuessed.indexOf(x) === -1) {
		// Add letter to list of guessed letters
		lettersGuessed.push(x);
		// Loop through each letter of answer and compare against the letter the user guessed.
		for (i=0; i<answer.length; i++) {
			// If they match, reveal the corresponding index in the currentWord array. If they don't match, nothing happens.
			if (x===answer[i]) {
				currentWord[i] = answer[i];
				letterFound = true;
			}
		}
		// If after the loop completes the user's guess does not match any letters in the answer, reduce guessesRemaining by 1...
		if (letterFound === false) {
			guessesRemaining--;
			// And if guessesRemaining reaches 0, run function lose()
			if (guessesRemaining === 0) {
				lose();
			}
		}
		// If user's guess does match a letter in the answer, and then if the answer has been completely discovered, run function win()
		else {
			if (currentWord.join("") === answer) {
				win();
			}

		}
	}

}


function win() {
	winCount++;
	gameCount++;
	gameInProgress = false;
	document.getElementById("button").style.visibility = "visible";
	document.getElementById("win").style.visibility = "visible";
	document.getElementById("city").style.visibility = "visible";
}

function lose() {
	lossCount++;
	gameCount++;
	gameInProgress = false;
	document.getElementById("button").style.visibility = "visible";
	document.getElementById("lose").style.visibility = "visible";
}

function playAgain() {
	reset();
	document.getElementById("button").style.visibility = "hidden";
	document.getElementById("win").style.visibility = "hidden";
	document.getElementById("lose").style.visibility = "hidden";
	document.getElementById("city").style.visibility = "hidden";
	print();
}

//Start program

reset();
print();

document.onkeyup = function() {
	
	if (gameInProgress === true) {
		var input = event.key.toLowerCase();
		compare(input);
		print();
	}
	
}