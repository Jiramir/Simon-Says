var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(fuckOff) {

  $("#" + fuckOff).addClass("pressed");

  setTimeout(function() {
    $("#" + fuckOff).removeClass("pressed");
  }, 200);
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  playSound(randomChosenColour);
}


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");


    if (userClickedPattern.length === gamePattern.length) {


      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {


    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    playSound("wrong");
    $("#level-title").text("😆 Game Over.  Press any key to restart.");
    startOver();
  }

}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}


function playSound(yeet) {
  var audio = new Audio(yeet + ".mp3");
  audio.play();
}

$(document).keydown(function() {
  if (!started) {


    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});
