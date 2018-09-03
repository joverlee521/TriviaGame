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
        question: "assets/images/kiki-delivery-serice.gif"
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
]
var questionsUsed = []


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
        var random = Math.floor(Math.random()*10);
        if(questionsUsed.indexOf(random) < 0){
            $("#question").attr("src", questions[random].question);
            questionsUsed.push(random);
            console.log(questionsUsed);
        }
        else{
            this.generateQuestion();
        }
    }
}














$(document).ready(function(){
    game.initializeGame();
})