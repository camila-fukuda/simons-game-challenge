var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").on("click", function(event) {
  if (started == true) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatedPress(userChosenColour);
  console.log("UserPressedSequence: "+userClickedPattern);
  if(userClickedPattern.length==gamePattern.length){
    checkAnswer();
  }
}
});

$(document).keypress(function(event) {
  if (started == false) {
    $("#level-title").text('Level ' + level);
    setTimeout(function () {
      nextSequence();
    }, 1000);
    started = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  console.log("GamePattern: "+gamePattern);
  $("#level-title").text('Level ' + level);
}

function playSound(name) {
  var name = new Audio("sounds/" + name + ".mp3");
  name.play();
}

function animatedPress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 60);
}

function checkAnswer() {
  for (var i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      playSound("wrong");
      started=false;
      level=0;
      userClickedPattern = [];
      gamePattern = [];
      $("#level-title").text('GAME OVER, press a key to start!');
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      return
    }
  }
  userClickedPattern = [];
  setTimeout(function () {
    nextSequence();
  }, 1000);
}


//
// var buttonColours = ["red", "blue", "green", "yellow"];
//
// var gamePattern = [];
//
// //3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
// var userClickedPattern = [];
//
// //1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// $(".btn").click(function() {
//
//   //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
//   var userChosenColour = $(this).attr("id");
//
//   //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
//   userClickedPattern.push(userChosenColour);
//
//   //console.log(userClickedPattern);
//
// });
//
// function nextSequence() {
//
//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);
//
//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//
//   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
//   audio.play();
// }
