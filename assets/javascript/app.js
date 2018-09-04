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
var questionsUsed = [];
var answers = [];
var answersUsed = [];
var answersDisplayed = [];
var choosenQuestion;
var randomNumber;
var time = 5;
var timer; 
var correctAnswer = 0;
var incorrectAnswer = 0;

function randomIndex(){
    randomNumber = Math.floor(Math.random()*10);
}


var game = {
    initializeGame(){
        $("#end-display").hide();
        var that = this; 
        $("#start-btn").on("click", function(){
            that.generateQuestion();
            $(".hidden").css("visibility", "visible");
            this.remove();
        })
    },
    generateQuestion(){
        randomIndex();
        $("#answer-choices").show();
        if(questionsUsed.indexOf(randomNumber) < 0){
            this.startTimer();
            $("#question").attr("src", questions[randomNumber].question);
            choosenQuestion = questions[randomNumber];
            answers.push(choosenQuestion.name);
            questionsUsed.push(randomNumber);
            console.log(questionsUsed);
            answersUsed.push(randomNumber);
            this.generateAnswers();
            this.displayAnswers();
            answersUsed = [];
            answersDisplayed = [];
        }
        else if (questionsUsed.length == questions.length){
            this.endGame();
        }
        else{
            this.generateQuestion();
        }
    },
    generateAnswers(){
        while (answers.length < 4){
            randomIndex();
            if(answersUsed.indexOf(randomNumber) < 0){
                answers.push(questions[randomNumber].name);
                answersUsed.push(randomNumber);
            }
        }
    },
    displayAnswers(){
        while (answers.length > 0){
            var randomAnswer = Math.floor(Math.random()*4);
            if(answersDisplayed.indexOf(randomAnswer) < 0){
                $("#answer"+randomAnswer).text(answers[0]);
                answers.shift();
                answersDisplayed.push(randomAnswer);
            }
        }
    },
    startTimer(){
        var that = this;
        $("#time").text("Time Remaining: " + time + " seconds");
        timer = setInterval(function(){
            time--;
            $("#time").text("Time Remaining: " + time + " seconds");
            if(time < 0){
                that.timesUp();
            }
        }, 1000)
    },
    timesUp(){
        incorrectAnswer++;
        var that = this;
        clearInterval(timer);
        time = 5; 
        $("#answer-choices").hide();
        $("#question").attr("src", choosenQuestion.answer);
        $("#time").html("TIME'S UP!" + "<br>" + "The answer was:");
        setTimeout(function(){that.generateQuestion()}, 1000);
    },
    endGame(){
        $(".hidden").hide();
        $("#correct").text(correctAnswer);
        $("#incorrect").text(incorrectAnswer);
        $("#end-display").show();
    }
}


$(document).ready(function(){
    game.initializeGame();
})