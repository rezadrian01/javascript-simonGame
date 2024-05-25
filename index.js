let started = false;
let correctAnswer;
let level = 1;
let audio;
let userAnswer = [];
let listenerAdded = false;
let temp;

$(document).keypress(function () {
  if (!started) {
    started = true;
    step1();
  }
});

function step1() {
  if (!started) {
    return false;
  }
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4 + 1);
  correctAnswer = randomNumber;

  switch (correctAnswer) {
    case 1:
      audio = new Audio("sounds/green.mp3");
      setTimeout(function () {
        $(".green").addClass("pressed");
      }, 1000);
      setTimeout(function () {
        $(".green").removeClass("pressed");
      }, 1100);
      break;
    case 2:
      audio = new Audio("sounds/red.mp3");
      setTimeout(function () {
        $(".red").addClass("pressed");
      }, 1000);
      setTimeout(function () {
        $(".red").removeClass("pressed");
      }, 1100);
      break;
    case 3:
      audio = new Audio("sounds/yellow.mp3");
      setTimeout(function () {
        $(".yellow").addClass("pressed");
      }, 1000);
      setTimeout(function () {
        $(".yellow").removeClass("pressed");
      }, 1100);
      break;
    default:
      audio = new Audio("sounds/blue.mp3");
      setTimeout(function () {
        $(".blue").addClass("pressed");
      }, 1000);
      setTimeout(function () {
        $(".blue").removeClass("pressed");
      }, 1100);
      break;
  }
  setTimeout(function () {
    audio.play();
  }, 1000);

  console.log(correctAnswer);
  getUserAnswer();
}

function step2() {
  if (userAnswer[userAnswer.length - 1] === correctAnswer) {
    level++;
    console.log(userAnswer);
    console.log("Correct");
    console.log("==============================");
    step1();
  } else {
    userAnswer = [];
    console.log(userAnswer);
    console.log(correctAnswer);
    console.log("==============================");
    $("#level-title").text("Game Over press any key to restart");
    level = 1;
    started = false;
    console.log("Wrong");
    gameOver();
  }
}

function getUserAnswer() {
  if (!listenerAdded) {
    $(".btn").on("click", function () {
      temp = this.id;
      animateButton(temp);
      soundButtonById(temp);
      // console.log(temp);
      temp = convert(temp);
      userAnswer.push(temp);
      step2();

      //beta function
    });
    listenerAdded = true;
  }
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

function animateButton(id) {
  $(`#${id}`).addClass("pressed");
  setTimeout(function () {
    $(`#${id}`).removeClass("pressed");
  }, 100);
}

function soundButtonById(id) {
  audio = new Audio(`sounds/${id}.mp3`);
  audio.play();
  return;
}

function convert(name) {
  let result;
  switch (name) {
    case "green":
      result = 1;
      break;
    case "red":
      result = 2;
      break;
    case "yellow":
      result = 3;
      break;
    default:
      result = 4;
      break;
  }
  return result;
}
