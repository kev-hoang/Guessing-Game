var guessesLeft = 5;
var num = getRandomInt(1,100);
var firstGuess = true;
var previousGuesses = [];
var useHint = false;
var recordPlayed = 0;
var recordWon = 0;
var recordCheated = 0;

//generate random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//counts down and displays guesses remaining
function guessesRemaining() {
  guessesLeft--;
  $("#guessesLeft").html(guessesLeft);
}

//submit guess
function guessNum() {
  guess = $("#guessField").val();

  //validate input
  if ((guess > 0) && (guess < 101) && (guess % 1 === 0) && (guessesLeft != 0) && (previousGuesses.indexOf(guess) === -1)) {

    //is the guess higher or lower than the number
    if (guess > num){
      highLow = "lower";
    } else{
      highLow = "higher";
    }

    //is it the first guess?
    if (firstGuess === true) {
      range1 = Math.abs(num-guess);
      //special result for first guesses
      if (guess == num){
        $("#body").css("background-image",'url("Images/background_rainbow.jpg")');
        guessesLeft = 1;
        $(guessesRemaining);
        //know if you cheated
        if (useHint === true){
          alert("You got it in 1 try but I know you used a hint to do so.");
        } else{
          alert("You got it on the 1st guess!\n\nAre you psychic?");
        }
        recordPlayed++;
        $("#recordTable > tbody > tr > #played").html(recordPlayed);
        recordWon++;
        $("#recordTable > tbody > tr > #won").html(recordWon);
      } else if (range1 < 20){
        alert("You're hot but you need to go a little " + highLow + ".");
        firstGuess = false;
        $(guessesRemaining);
        previousGuesses.push(guess);
        recordPlayed++;
        $("#recordTable > tbody > tr > #played").html(recordPlayed);
        $("#guessTable > tbody").append("<tr><td>"+ guess +'</td><td style="color: red;">Hot</td></tr>');
      } else{
        alert("You're cold. Please go a lot " + highLow + ".");
        firstGuess = false;
        $(guessesRemaining);
        previousGuesses.push(guess);
        recordPlayed++;
        $("#recordTable > tbody > tr > #played").html(recordPlayed);
        $("#guessTable > tbody").append("<tr><td>"+ guess +'</td><td style="color: blue;">Cold</td></tr>');
      }
    } else{ //not first guess
      range2 = Math.abs(num-guess);
      //hotter or colder than last guess
      if (range1 > range2){
        hotterColder = "hotter";
      } else if (range1 < range2){
        hotterColder = "colder";
      } else {
        hotterColder = "to the same distance";
      }
      //results
      if (guess == num){
        $("#body").css("background-image",'url("Images/background_sunset.jpg")');
        if (useHint === true){
          alert("You got it but I know you used a hint to do so.");
        } else{
          alert('Congratulations on getting the correct number!\nPlay again by pressing the "New Game" button.');
        }
        guessesLeft = 1;
        $(guessesRemaining);
        recordWon++;
        $("#recordTable > tbody > tr > #won").html(recordWon);
      } else if (range2 < 20){
        alert("You got " + hotterColder + ".\nYou need to go a little " + highLow + ".\nBy the way, you're hot!");
        $(guessesRemaining);
        previousGuesses.push(guess);
        range1 = range2;
        $("#guessTable > tbody").append("<tr><td>"+ guess +'</td><td style="color: red;">Hot</td></tr>');
        if (guessesLeft === 0){
          alert("You ran out of guesses. Sorry but the answer was " + num + ".");
        }
      } else{
        alert("You got " + hotterColder + ".\nYou need to go " + highLow +".\nBy the way, you're cold!");
        $(guessesRemaining);
        previousGuesses.push(guess);
        range1 = range2;
        $("#guessTable > tbody").append("<tr><td>"+ guess +'</td><td style="color: blue;">Cold</td></tr>');
        if (guessesLeft === 0){
          alert("You ran out of guesses. Sorry but the answer was " + num + ".");
        }
      }
    }
  } else if (guessesLeft === 0){ //can't guess anymore
    alert("You ran out of guesses. Please hit the 'New Game' button to play again");
  } else if (previousGuesses.indexOf(guess) != -1){ //guessed it already
    alert("You have already made that guess");
  } else{ //not valid number
    alert("Invalid Number");
  }
}

function getHint() {
    useHint = confirm("This will tell you the answer\n \n Are you sure?");

    if (useHint === true){
      alert("The answer is " + num);
      recordCheated++;
      $("#recordTable > tbody > tr > #cheated").html(recordCheated);
    }
}

function reset() {
  guessesLeft = 5;
  num = getRandomInt(1,100);
  firstGuess = true;
  previousGuesses = [];
  $("#guessTable > tbody").html("");
  $("#guessesLeft").html(guessesLeft);
  $("#body").css("background-image",'url("Images/background_default.jpg")');
  if (useHint === true){
    alert("You want to try not using the hint?");
  } else{
    alert("Let's try this again!");
  }
  useHint = false;
}

$("#guessesLeft").html(guessesLeft);
$("#useHint").click(getHint);
$("#newGame").click(reset);
$("#submitGuess").click(guessNum)
$("#guessField").keypress(function(event) {
        if(event.which == 13) {
            jQuery("#submitGuess").click();
        }
    });
