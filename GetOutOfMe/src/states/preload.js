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
        this.load.image('muebleslv1', 'https://i.imgur.com/zThnsoi.png');
        this.load.image('muebleslv2', 'https://i.imgur.com/N4ByYuc.png');
        this.load.image('muebleslv3', 'https://i.imgur.com/mwHLxWZ.png');
        this.load.image('silla', 'https://i.imgur.com/rnANYdK.png?1');
        this.load.image('btn-jugar', 'https://i.imgur.com/738cCwO.png');
        this.load.image('btn-singleplayer', 'https://i.imgur.com/xBuViuJ.png');
        this.load.image('btn-multiplayer', 'https://i.imgur.com/luNHStE.png');
        this.load.image('btn-online', 'https://i.imgur.com/YGzc3W5.png');
        this.load.image('btn-level1', 'https://i.imgur.com/60pFRIJ.png');
        this.load.image('btn-level2', 'https://i.imgur.com/bgaTCKN.png');
        this.load.image('btn-level3', 'https://i.imgur.com/znFdAmY.png');
        this.load.image('btn-volverMenu', 'https://i.imgur.com/ZRNU4eZ.png');
        this.load.image('menuBackground', 'https://i.imgur.com/eik8IYl.png');
        this.load.image('finalBackground', 'https://i.imgur.com/WMaVuf9.png');
        this.load.image('title', 'https://i.imgur.com/Hz9T4fh.png');
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