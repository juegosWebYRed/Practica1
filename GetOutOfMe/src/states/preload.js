SplendorousGames.preloadState = function(game) {

}

SplendorousGames.preloadState.prototype = {

    preload: function() {
		this.load.crossOrigin = 'Anonymous';
		this.load.spritesheet('personaje', 'https://i.imgur.com/Oh6jnOC.png', 50, 100);
        this.load.image('ground', 'https://i.imgur.com/cSBy8Xo.png');
    },

    create: function () {
        var text = "LOADING";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(game.world.centerX - 300, 0, text, style);

        this.state.start('title');
    },

    update: function() {

    }
}