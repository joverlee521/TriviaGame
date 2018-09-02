var game = {
    initializeGame(){
        $("#start-btn").on("click", function(){
            $(".hidden").css("visibility", "visible");
            this.remove();
        })
    }
}














$(document).ready(function(){
    game.initializeGame();
})