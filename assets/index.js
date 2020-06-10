const buttonColors = ['red', 'blue', 'green', 'yellow']; // assign color array
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
function nextSequence() {
    level++;
    //random number - (0-3)
    let randomNumber = Math.floor(Math.random()* 4); 
     // select random index of buttoncolors to assign to pattern
    let randomChosenColor = buttonColors[randomNumber];
    //return color to array
    gamePattern.push(randomChosenColor); 
    //animate button fade in /out when selected
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //select audio to play
    playSound(randomChosenColor);
    $('h1').text(`Level ${level}`);
}
//user pattern
$('.btn').click(function(){
    //when clicked, return object id
   let userChosenColor = $(this).attr('id');
   //add object id clicked to array
    userClickedPattern.push(userChosenColor); 
    //select audio to play
    playSound(userChosenColor);
    animatePress(userChosenColor);
    let index= userClickedPattern.length -1;
    checkAnswer(index);
})

//sound function
function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    //play the audio
    audio.play();
}

function animatePress(currentColor) {
    $('.btn').click(function() {
        const self = $(this);
        self.addClass('pressed');
        
        setTimeout(function() {
            self.removeClass('pressed');
        }, 100);
    });
}
// //detect just the first keypress to start game
// $(document).one('keypress', function () {
//     nextSequence();
// })
$(document).on('keypress', function () {
    if (!started) {
        nextSequence();
        started = true;
    }
})


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        console.log('đúng');

        if ((userClickedPattern.length === gamePattern.length) &&
        (userClickedPattern.toString() === gamePattern.toString())) {
        
            setTimeout(function () {
                nextSequence();
                }, 1000);
            userClickedPattern = [];
        }
    }
    else {
        let wrong = 'wrong';
        playSound(wrong)

        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);

        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }

    };

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = []; 
}