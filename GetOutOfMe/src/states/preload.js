SplendorousGames.preloadState = function(game) {

}

SplendorousGames.preloadState.prototype = {

    preload: function() {
		this.load.crossOrigin = 'Anonymous';
		this.load.spritesheet('personaje', 'https://i.imgur.com/Oh6jnOC.png', 50, 100);
        this.load.image('ground', 'https://i.imgur.com/cSBy8Xo.png');
		this.load.image('proyectil','https://i.imgur.com/pHkpyji.png')
        this.load.spritesheet('fullscreen', 'https://i.imgur.com/upDM70Y.png', 71, 71);
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