$(document).ready(function() {
    var gameId;
    var score = 0;
    var scoreUpdated = false;
    var speed = 4;
    var moving = false;
    var gameOver = false;
    var bird = $("#bird");
    var containerWidth = parseInt($("#container").width());
    var containerHeight = parseInt($("#container").height());
    var initialPosition = parseInt($(".pipe").css("right"));
    var initialHeight = parseInt($(".pipe").css("height"));
   
    $("#btnStart").click(function() {
        $("#initial").hide();
        $("#container").show();
        $("#details").show();
        var game = function() {
            var currentPosition = parseInt($(".pipe").css("right"));
            if(collision(bird, $("#pipe1")) || collision(bird, $("#pipe2")) ||
                    parseInt(bird.css("top"))<=0 || parseInt(bird.css("top"))>=containerHeight - bird.height()) {
                        stopGame();
            } else {
                if(parseInt(bird.css("left")) > containerWidth - currentPosition){
                    if(scoreUpdated == false) {
                        score++;
                        $("#score").text(score);
                        scoreUpdated = true;
                    }
                }
                if(currentPosition > containerWidth) {
                    speed++;
                    console.log(speed);
                    var changedHeight = Math.floor(Math.random()*100);
                    $("#pipe1").css("height", initialHeight + changedHeight);
                    $("#pipe2").css("height", initialHeight - changedHeight);
                    currentPosition = initialPosition;
                    scoreUpdated = false;
                }
                $(".pipe").css("right", currentPosition+speed);
                if(moving == false) {
                    moveDown();
                }
            }
            gameId = requestAnimationFrame(game);
        }
        gameId = requestAnimationFrame(game);
    });

    function collision(duck, pipe) {
        var birdLeft = duck.offset().left;
        var birdTop = duck.offset().top;
        var birdWidth = bird.width();
        var birdHeight = bird.height();
        var birdRight = birdLeft + birdWidth;
        var birdBottom = birdTop + birdHeight;

        var pipeLeft = pipe.offset().left;
        var pipeTop = pipe.offset().top;
        var pipeWidth = pipe.width();
        var pipeHeight = pipe.height();
        var pipeRight = pipeLeft + pipeWidth;
        var pipeBottom = pipeTop + pipeHeight;
        if(birdBottom < pipeTop || birdTop > pipeBottom || 
                birdLeft > pipeRight || birdRight < pipeLeft) {
            return false; 
        }
        return true;
    }

    function stopGame() {
        cancelAnimationFrame(gameId);
        gameOver = true;
        $("#btnRestart").show();
    }

    $(document).on("keydown", function(e) {
        var key = e.keyCode;
        if(key == 32 && moving == false && gameOver == false) {
            moving = requestAnimationFrame(moveUp);
        }
    })

    $("#btnRestart").click(function() {
        location.reload();
    })

    $(document).on("keyup", function(e) {
        var key = e.keyCode;
        if(key == 32) {
            cancelAnimationFrame(moving);
            moving = false;
        }
    })
    function moveDown() {
        bird.css("top", parseInt(bird.css("top")) + 4);
    }
    function moveUp() {
        if(gameOver == false) {
            bird.css("top", parseInt(bird.css("top")) - 6);
            moving = requestAnimationFrame(moveUp);
        }
    }
});