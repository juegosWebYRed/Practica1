SplendorousGames.menuState = function(game) {
}



SplendorousGames.menuState.prototype = {

    preload: function () {

    },


    create: function() {
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var single = game.add.text(game.world.centerX - 300, 0, "UN JUGADOR", style);
        single.ns = 'single';
        single.inputEnabled = true;
        single.events.onInputDown.add(nextState, this);

        var multi = game.add.text(game.world.centerX - 300, 200, "DOS JUGADORES", style);
        multi.ns = 'multi';
        multi.inputEnabled = true;
        multi.events.onInputDown.add(nextState, this);

        var online = game.add.text(game.world.centerX - 300, 400, "ONLINE", style);
        online.ns = 'online';
        online.inputEnabled = true;
        online.events.onInputDown.add(nextState, this);


    },


    update: function() {
        
    }
}