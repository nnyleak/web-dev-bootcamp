//setting vars
var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// detect initial key press to start game
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// detect when user clicks on a square and checks against game pattern
$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// choose random color for game pattern
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randNum = Math.floor(Math.random() * 4);

  // push random color to game pattern
  var randChosenColor = btnColors[randNum];
  gamePattern.push(randChosenColor);

  // flash anim and sound for chosen color
  gamePattern.forEach((element, i) => {
    setTimeout(() => {
        $("#" + element)
          .fadeOut(100)
          .fadeIn(100);
        playSound(element);
    }, i * 500);
  });
}

// play sound of selected color
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

// animate selected color
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// checks if user pattern is correct
// if not, restart game
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over! Press any key to restart.");
    startOver();
  }
}

// reset vars
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
