var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
}

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
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

$("body").on("keypress", function(event) {
    console.log(event.originalEvent.key);
    
})