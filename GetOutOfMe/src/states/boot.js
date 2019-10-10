var SplendorousGames = {}

SplendorousGames.bootState = function(game) {

}

SplendorousGames.bootState.prototype = {

    preload: function() {
        game.physics.startSystem(Phaser.Physics.P2);
    },


    create: function () {
        this.state.start('preload');
    },

    update: function() {

    }
}