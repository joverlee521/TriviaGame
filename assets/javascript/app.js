// Array of objects containing questions for trivia game
var questions = [
    {
        name: "Castle in the Sky",
        question: "assets/images/castle-in-the-sky.gif",
        answer: "assets/images/castle-in-the-sky-answer.jpg"
    },
    {
        name: "Grave of the Fireflies",
        question: "assets/images/grave-of-the-fireflies.gif",
        answer: "assets/images/grave-of-the-fireflies-answer.jpg"
    },
    {
        name: "Howl's Moving Castle",
        question: "assets/images/howls-moving-castle.gif",
        answer: "assets/images/howls-moving-castle-answer.jpg"
    },
    {
        name: "Kiki's Delivery Service",
        question: "assets/images/kiki-delivery-service.gif",
        answer: "assets/images/kiki-delivery-service-answer.jpg"
    },
    {
        name: "My Neighbor Totoro",
        question: "assets/images/my-neighbor-totoro.gif",
        answer: "assets/images/my-neighbor-totoro-answer.jpg"
    },
    {
        name: "Princess Mononoke",
        question: "assets/images/princess-mononoke.gif",
        answer: "assets/images/princess-mononoke-answer.jpg"
    },
    {
        name: "Spirited Away",
        question: "assets/images/spirited-away.gif",
        answer: "assets/images/spirited-away-answer.jpg"
    },
    {
        name: "The Tale of the Princess Kaguya",
        question: "assets/images/tale-of-princess-kaguya.gif",
        answer: "assets/images/tale-of-princess-kaguya-answer.jpg"
    },
    {
        name: "The Cat Returns",
        question: "assets/images/the-cat-returns.gif",
        answer: "assets/images/the-cat-returns-answer.jpg"
    },
    {
        name: "The Wind Rises",
        question: "assets/images/the-wind-rises.gif",
        answer: "assets/images/the-wind-rises-answer.jpg"
    }
];
// Variable declarations
var questionsUsed = [];
var answers = [];
var answersUsed = [];
var answersDisplayed = [];
var questionDisplayed = false; 
var choosenQuestion;
var randomNumber;
var time;
var timer; 
var correctAnswer = 0;
var incorrectAnswer = 0;
// Function for generating random numbers 0-9
function randomIndex(){
    randomNumber = Math.floor(Math.random()*10);
}
// The game
var game = {
    // Starts game with a start button on the screen
    initializeGame(){
        var that = this; 
        $("#start-btn").on("click", function(){
            $("#background-music").trigger("play");
            that.generateQuestion();
            // Animation for fading in hidden elements
            $(".hidden").css({"visibility": "visible", "opacity": 0.0}).animate({"opacity": 1.0}, 100);
            // Removes start button from DOM
            this.remove();
        })
    },
    // Picks a random question from the questions array
    generateQuestion(){
        var that = this; 
        answersUsed = [];
        answersDisplayed = [];
        time = 10; 
        while(!questionDisplayed){
            randomIndex();
            // checks question has not been used already in current game
            if(questionsUsed.indexOf(randomNumber) < 0){
                that.startTimer();
                // Stores choosen question object in variable
                choosenQuestion = questions[randomNumber];
                // Displays question gif
                $("#question").attr("src", choosenQuestion.question);
                setTimeout(function(){$("#question").fadeIn(500)}, 100);
                // Stores correct answer in answer array
                answers.push(choosenQuestion.name);
                // Stores questions already used
                questionsUsed.push(randomNumber);
                // Stores answers already used 
                answersUsed.push(randomNumber);
                that.generateAnswers();
                that.displayAnswers();
                // Displays answer choices
                $("#answer-choices").fadeIn();
                questionDisplayed = true; 
            }
            // Ends game when all questions have been used
            if (questionsUsed.length == questions.length){
                that.endGame();
            }
        }
    },
    // Pick 3 more random answers for generated question
    generateAnswers(){
        while (answers.length < 4){
            randomIndex();
            // Checks same answer isn't used twice in one question
            if(answersUsed.indexOf(randomNumber) < 0){
                answers.push(questions[randomNumber].name);
                answersUsed.push(randomNumber);
            }
        }
    },
    // Displays choosen answers in a random order
    displayAnswers(){
        while (answers.length > 0){
            var randomAnswer = Math.floor(Math.random()*4);
            if(answersDisplayed.indexOf(randomAnswer) < 0){
                $("#answer"+randomAnswer).text(answers[0]);
                // deletes displayed answer from answer array
                answers.shift();
                // stores positions already displaying answers
                answersDisplayed.push(randomAnswer);
            }
        }
    },
    // Generates a timer for each question
    startTimer(){
        var that = this;
        $("#time").text("Time Remaining: " + time + " seconds");
        timer = setInterval(function(){
            time--;
            $("#time").text("Time Remaining: " + time + " seconds");
            // Stops timer once it reaches 0
            if(time < 0){
                that.timesUp();
                that.betweenQuestions();
            }
        }, 1000)
    },
    // Display for time's up
    timesUp(){
        incorrectAnswer++;
        $("#time").html("TIME'S UP!" + "<br>" + "The answer was: ");
    },
    // Verfies player's answer
    verifyAnswer(){
        var that = this;
        $(".card").on("click", function(){
            that.betweenQuestions();
            // Answer is correct only if there is still time left
            if(time > 0 && $(this).children().text() == choosenQuestion.name){
                correctAnswer++;
                $("#time").html("You're CORRECT!" + "<br>" + "The answer was: ");
            }
            // Choosen answer has no effect if time is up
            else if(time <= 0){
                that.timesUp();
            }
            // Wrong answer
            else {
                incorrectAnswer++;
                $("#time").html("You're WRONG!" + "<br>" + "The answer was: ");
            }
        })
    },
    // Displays the correct answer for previous question and transitions into next question
    betweenQuestions(){
        var that = this;
        // Stops timer
        clearInterval(timer);
        // Fade out and completely hide answer choices
        $("#answer-choices").fadeOut(500);
        setTimeout(function(){$("#answer-choices").hide()}, 500);
        // Fade out question gif
        $("#question").fadeOut(500);
        // Change to answer img and fade back in
        setTimeout(function(){
            $("#answer-img").attr({"src": choosenQuestion.answer, "alt": choosenQuestion.name});
            $("#answer-img").css({"visibility": "visible", "opacity": 0.0}).animate({"opacity": 1.0}, 500)
            $("#answer-img").fadeIn();
        }, 500)
        // Fades out complete game content for smooth transition to next question
        setTimeout(function(){
            $("#game-content").fadeOut(500);
            $("#answer-img").fadeOut();
        }, 3500);
        setTimeout(function(){
            questionDisplayed = false; 
            that.generateQuestion();
            $("#game-content").fadeIn(500);
        },4000)
    },
    // Hides game content and shows end display
    endGame(){
        $(".hidden").hide();
        // Shows percent correct and number of correct/incorrect answers
        $("#percent-correct").text(((correctAnswer)/(correctAnswer+incorrectAnswer)*100))
        $("#correct").text(correctAnswer);
        $("#incorrect").text(incorrectAnswer);
        // Shows a different display depending on player's score
        if(correctAnswer == questions.length){
            $("#end-img").attr("src", "assets/images/master.gif");
            $("#skill-level").text("MASTER");
        }
        else if(correctAnswer >= (questions.length*0.7)){
            $("#end-img").attr("src", "assets/images/expert.gif");
            $("#skill-level").text("EXPERT");
        }
        else if(correctAnswer >= (questions.length*0.5)){
            $("#end-img").attr("src", "assets/images/amateur.gif");
            $("#skill-level").text("AMATEUR");
        }
        else{
            $("#end-img").attr("src", "assets/images/newbie.gif");
            $("#skill-level").text("NEWBIE");
        }
        $("#end-display").show();
    },
    // Resets game without reloading the page
    resetGame(){
        var that = this;
        $("#restart-btn").on("click", function(){
            $(".hidden").show();
            $("#end-display").hide();
            questionsUsed = [];
            correctAnswer = 0;
            incorrectAnswer = 0;
            that.generateQuestion();
        })
        
    }
}


$(document).ready(function(){
    $("#end-display").hide();
    game.initializeGame();
    game.verifyAnswer();
    game.resetGame();
})