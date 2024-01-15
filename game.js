const buttonColours = ['red', 'green', 'blue', 'yellow']
let gamePattern = []
let userClickedPattern = []
let started = false;
let level = 0;

$(document).keypress(function() {
  if (!started) {
    $('h1').text(`Level ${level}`)
    nextSequence();
    started = true;
  }
})

$(`.btn`).click(function() {
  userChosenColour = $(this).attr('id')
  userClickedPattern.push(userChosenColour)
  console.log(userClickedPattern)

  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length-1)
})

const checkAnswer = (currentLevel) => { 
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence()
      }, 1000)
      userClickedPattern = []
    }
  } else {
    let failAudio = new Audio('./sounds/wrong.mp3')
    failAudio.play();
    $('body').addClass("game-over");
    setTimeout(() => {
      $('body').removeClass("game-over")
    }, 200);
    $('h1').text("Game Over, Press Any Key to Restart")
    startOver();
  }
}

const startOver = () => {
  level = 0;
  gamePattern = []
  userClickedPattern = []
  started = false;
}

const nextSequence = () => {
  level++;
  $('h1').text(`Level ${level}`)
  const randomNumber = Math.floor(Math.random() * 4)
  const randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
}

const playSound = (name) => { 
  let audio = new Audio (`./sounds/${name}.mp3`)
  audio.play()
}

const animatePress = (currentColour) => {
  $(`#${currentColour}`).addClass("pressed")

  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed")
  }, 100);
}