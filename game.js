var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function playSound(key) {
  switch (key) {
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;

    default:
      break;
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

$("body").on("keypress", function (event) {
  var key = event.originalEvent.key;
  if (gameStarted === false && key === "a") {
    gameStarted = true;
    nextSequence();
  }
});

$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (userClickedPattern) {
    checkAnswer(level);
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  console.log(gamePattern);
}

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  while (userClickedPattern.length >= currentLevel) {
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
      console.log("keep playing");
      userClickedPattern = [];
      nextSequence();
    } else {
      console.log("game over");
      gameOver();
      userClickedPattern = [];
      break;
    }
  }
}

function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
  $("body").on("keypress", function (event) {
    var key = event.originalEvent.key;

    if (gameStarted === false && key) {
      gameStarted = true;
      nextSequence();
    }
  });
}
