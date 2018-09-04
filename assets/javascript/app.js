var questions = [
    {
        name: "Castle in the Sky",
        question: "assets/images/castle-in-the-sky.gif"
    },
    {
        name: "Grave of the Fireflies",
        question: "assets/images/grave-of-the-fireflies.gif"
    },
    {
        name: "Howl's Moving Castle",
        question: "assets/images/howls-moving-castle.gif"
    },
    {
        name: "Kiki's Delivery Service",
        question: "assets/images/kiki-delivery-service.gif"
    },
    {
        name: "My Neighbor Totoro",
        question: "assets/images/my-neighbor-totoro.gif"
    },
    {
        name: "Princess Mononoke",
        question: "assets/images/princess-mononoke.gif"
    },
    {
        name: "Spirited Away",
        question: "assets/images/spirited-away.gif"
    },
    {
        name: "The Tale of the Princess Kaguya",
        question: "assets/images/tale-of-princess-kaguya.gif"
    },
    {
        name: "The Cat Returns",
        question: "assets/images/the-cat-returns.gif"
    },
    {
        name: "The Wind Rises",
        question: "assets/images/the-wind-rises.gif"
    }
];
var questionsUsed = [];
var answers = [];
var answersUsed = [];
var answersDisplayed = [];
var randomNumber;
var time = 30;
var timer; 

function randomIndex(){
    randomNumber = Math.floor(Math.random()*10);
}


var game = {
    initializeGame(){
        var that = this; 
        $("#start-btn").on("click", function(){
            that.generateQuestion();
            $(".hidden").css("visibility", "visible");
            this.remove();
        })
    },
    generateQuestion(){
        randomIndex();
        if(questionsUsed.indexOf(randomNumber) < 0){
            this.startTimer();
            $("#question").attr("src", questions[randomNumber].question);
            answers.push(questions[randomNumber].name);
            questionsUsed.push(randomNumber);
            answersUsed.push(randomNumber);
            this.generateAnswers();
            this.displayAnswers();
            answersUsed = [];
            answersDisplayed = [];
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
        timer = setInterval(function(){
            time--;
            $("#time-remaining").text(time);
        }, 1000)
    }
}














$(document).ready(function(){
    game.initializeGame();
})