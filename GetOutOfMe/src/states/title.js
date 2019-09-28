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

        var t = game.add.text(game.world.centerX - 300, 0, text, style);


        t.ns = 'menu';

        t.inputEnabled = true;

        t.events.onInputDown.add(nextState, this);

    },


}