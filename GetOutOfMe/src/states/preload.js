SplendorousGames.preloadState = function(game) {

}

SplendorousGames.preloadState.prototype = {

    preload: function() {
		this.load.crossOrigin = 'Anonymous';
        this.load.image('ground', 'https://i.imgur.com/cSBy8Xo.png');
        this.load.image('proyectil','https://i.imgur.com/pHkpyji.png');
        this.load.image('sueloNivel', 'https://i.imgur.com/dArAwzD.png');
        this.load.image('candelabro', 'https://i.imgur.com/WKuBQVm.png?1');
        this.load.image('pared', 'https://i.imgur.com/kV7nxIs.png');
        this.load.image('muebles', 'https://i.imgur.com/eyqq59x.png?1');
        this.load.image('silla', 'https://i.imgur.com/rnANYdK.png?1');
        this.load.image('btn-jugar', 'https://i.imgur.com/6jm8Tkk.png');
        this.load.image('btn-singleplayer', 'https://i.imgur.com/E5wlwn6.png');
        this.load.image('btn-multiplayer', 'https://i.imgur.com/crwWPxc.png');
        this.load.image('btn-online', 'https://i.imgur.com/QOUz9lu.png');
        this.load.image('btn-level1', 'https://i.imgur.com/669D0YS.png');
        this.load.image('btn-level2', 'https://i.imgur.com/R2AhcsD.png');
        this.load.image('btn-level3', 'https://i.imgur.com/1EoXsI7.png');
        this.load.image('btn-volverMenu', 'https://i.imgur.com/kAJVGWH.png');
        this.load.image('menuBackground', 'https://i.imgur.com/7uIVjNs.png');
        this.load.image('finalBackground', 'https://i.imgur.com/nY1syxq.png');
        this.load.spritesheet('personaje', 'https://i.imgur.com/Oh6jnOC.png', 50, 100);
        this.load.spritesheet('fullscreen', 'https://i.imgur.com/upDM70Y.png', 71, 71);
        this.load.spritesheet('fantasma', 'https://i.imgur.com/LV8OUcv.png?1', 152, 100);

    },

    create: function () {
        var text = "LOADING";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(game.world.centerX - 300, 0, text, style);

        this.state.start('menu');
    },

    update: function() {

    }
}