var SplendorousGames = {}

SplendorousGames.bootState = function(game) {

}

SplendorousGames.bootState.prototype = {

    preload: function() {
        game.physics.startSystem(Phaser.Physics.P2);
    },


    create: function () {
        var text = "LOADING";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(game.world.centerX - 300, 0, text, style);
        this.state.start('preload');
    },

    update: function() {

    }
}