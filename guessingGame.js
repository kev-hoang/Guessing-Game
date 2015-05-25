var guessesLeft = 3;
var victory = getRandomInt(1,100);
var firstGuess = false;
var guess = 97;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function guessesRemaining() {
  $("#guesses").html(guessesLeft);
}

function submitGuess() {
  guessesLeft = victory;
  $(guessesRemaining);
}

function getHint() {
  if (firstGuess != true) {
    var useHint = confirm("Using a hint will cost you 1 guess.\n \n Are you sure?");

    if (useHint === true){
      var hint = Math.abs(victory-guess);
      alert("Your last guess was " + hint + " away from the number.");
      guessesLeft--;
      $(guessesRemaining);
    };
  } else{
    alert("You need to guess at least once to use a hint.");
  };
}

function playAgain() {
  guessesLeft = 3;
  victory = getRandomInt(1,100);
  firstGuess = true;
  $(guessesRemaining);
  alert("Let's try this again!")
}

submitGuess();

$("#useHint").click(getHint);
$("#playAgain").click(playAgain);
