var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var started = false;

var level = 0;

var userClickedPattern = [];
$(document).keydown(function(){
    if(!started){

        $("#level-title").text("level "+ level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenButton = $(this).attr("id");
    userClickedPattern.push(userChosenButton);
   
    playSound(userChosenButton);
    animatePress(userChosenButton);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("level "+level );

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}
        

function playSound(name) {
        
        var audio = new Audio("./sounds/"+ name+ ".mp3");
        audio.play();
        
}
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    
    }
    else{

        console.log("wrong");

        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }
}

function startOver() {
    
        level = 0;
        gamePattern = [];
        started = false;
    
}