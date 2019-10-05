SplendorousGames.titleState = function(game) {
}

function nextState(object){
    this.state.start(object.ns);
}



SplendorousGames.titleState.prototype = {

    preload: function () {

    },


    create: function() {

        var text = "JUGAR";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var fullscreen_boton = game.add.button(1240, 680, 'fullscreen', this.fullscreen, this, 1, 0, 0);
        fullscreen_boton.scale.setTo(0.5, 0.5);
        
        var t = game.add.text(game.world.centerX - 300, 0, text, style);


        t.ns = 'menu';

        t.inputEnabled = true;

        t.events.onInputDown.add(nextState, this);

    },

    fullscreen: function() {
        if (game.scale.isFullScreen)
        {
            game.scale.stopFullScreen();
        }
        else
        {
            game.scale.startFullScreen(false);
        }

    },


}