SplendorousGames.preloadState = function(game) {

}

SplendorousGames.preloadState.prototype = {

    preload: function() {
        //Carga de imagenes.
		this.load.crossOrigin = 'Anonymous';
        this.load.image('btn-online', 'https://i.imgur.com/YGzc3W5.png');
        this.load.image('ground', 'https://i.imgur.com/cSBy8Xo.png');
        this.load.image('proyectil','https://i.imgur.com/pHkpyji.png');
        this.load.image('miniPlataforma','https://i.imgur.com/p9azVFf.png');
        this.load.image('sueloNivel', 'https://i.imgur.com/dArAwzD.png');
        this.load.image('candelabro', 'https://i.imgur.com/WKuBQVm.png?1');
        this.load.image('pared', 'https://i.imgur.com/kV7nxIs.png');
        this.load.image('muebleslv1', 'https://i.imgur.com/uZiIx13.png');
        this.load.image('muebleslv2', 'https://i.imgur.com/69Ygq4g.png');
        this.load.image('muebleslv3', 'https://i.imgur.com/6rmpCjg.png');
        this.load.image('silla', 'https://i.imgur.com/rnANYdK.png?1');
        this.load.image('btn-jugar', 'https://i.imgur.com/738cCwO.png');
        this.load.image('btn-play', 'https://i.imgur.com/nllVYJ5.png');
        this.load.image('btn-singleplayer', 'https://i.imgur.com/xBuViuJ.png');
        this.load.image('btn-unjugador', 'https://i.imgur.com/eHG1tQa.png');
        this.load.image('btn-multiplayer', 'https://i.imgur.com/luNHStE.png');
        this.load.image('btn-multijugador', 'https://i.imgur.com/iKcvyy2.png');
        this.load.image('btn-idioma', 'https://i.imgur.com/vvDBuwf.png');
        this.load.image('btn-language', 'https://i.imgur.com/XEeDFJR.png');
        this.load.image('btn-english', 'https://i.imgur.com/wQDAvBE.png');
        this.load.image('btn-espanol', 'https://i.imgur.com/ydicQU7.png');
        this.load.image('btn-ingles', 'https://i.imgur.com/u7qZpsR.png');
        this.load.image('btn-spanish', 'https://i.imgur.com/jC03h6X.png');
        this.load.image('btn-volver', 'https://i.imgur.com/oZoLPM7.png');
        this.load.image('btn-back', 'https://i.imgur.com/1nnc81z.png');
        this.load.image('btn-level1', 'https://i.imgur.com/60pFRIJ.png');
        this.load.image('btn-level2', 'https://i.imgur.com/bgaTCKN.png');
        this.load.image('btn-level3', 'https://i.imgur.com/znFdAmY.png');
        this.load.image('btn-nivel1', 'https://i.imgur.com/maaLDLc.png');
        this.load.image('btn-nivel2', 'https://i.imgur.com/hkykeP0.png');
        this.load.image('btn-nivel3', 'https://i.imgur.com/bpMcRIK.png');
        this.load.image('btn-volverMenu', 'https://i.imgur.com/ZRNU4eZ.png');
        this.load.image('btn-backMenu', 'https://i.imgur.com/1KKPRKr.png');
        this.load.image('btn-volverJugar', 'https://i.imgur.com/bFqhlb4.png');
        this.load.image('btn-playAgain', 'https://i.imgur.com/mbla69k.png');
        this.load.image('menuBackground', 'https://i.imgur.com/eik8IYl.png');
        this.load.image('menuBackgroundBase', 'https://i.imgur.com/7n0uYrR.png');
        this.load.image('menuBackgroundSky', 'https://i.imgur.com/amZvEM2.png');
        this.load.image('finalBackground', 'https://i.imgur.com/UKUZnLQ.png');
        this.load.image('title', 'https://i.imgur.com/Hz9T4fh.png');
        this.load.image('plataforma', 'https://i.imgur.com/LeGiYvs.png?1');
        this.load.spritesheet('personaje', 'https://i.imgur.com/KUj2rb6.png?1', 50, 97);
        this.load.spritesheet('personaje2', 'https://i.imgur.com/PX99K5P.png?1', 50, 97);
        this.load.spritesheet('lava', 'https://i.imgur.com/SaQWkgs.png', 3630, 435);
        this.load.spritesheet('fullscreen', 'https://i.imgur.com/upDM70Y.png', 71, 71);
        this.load.spritesheet('fantasma', 'https://i.imgur.com/LV8OUcv.png?1', 152, 100);
        this.load.spritesheet('nube', 'https://i.imgur.com/6kRr9Mz.png?1', 158, 100);
        this.load.spritesheet('cesped', 'https://i.imgur.com/szm1mEq.png?1', 50.5, 50);
        this.load.spritesheet('vidas', 'https://i.imgur.com/PJKxffd.png?1', 123, 100);
        this.load.image('boton-invisible','https://i.imgur.com/sr8C5dm.png');
        this.load.image('puntuacion','https://i.imgur.com/Bd0bvbl.png');
        this.load.image('puntuacionJugador1','https://i.imgur.com/8ESL7Me.png');
        this.load.image('puntuacionJugador2','https://i.imgur.com/ipZRAul.png');
        this.load.image('puntuation','https://i.imgur.com/rUheZ3C.png');
        this.load.image('puntuationPlayer1','https://i.imgur.com/NLQ4dT7.png');
        this.load.image('puntuationPlayer2','https://i.imgur.com/pGMRQk7.png');
        this.load.image('dodgedChandeliersStreak','https://i.imgur.com/dIq5bgL.png');
        this.load.image('rachaCandelabrosEsquivados','https://i.imgur.com/qXM5tT8.png');
        this.load.image('winnerPlayer1','https://i.imgur.com/03yvYwF.png');
        this.load.image('winnerPlayer2','https://i.imgur.com/H1tE1SI.png');
        this.load.image('ganadorJugador1','https://i.imgur.com/Xpfr1Js.png');
        this.load.image('ganadorJugador2','https://i.imgur.com/MAz9lx9.png');
        this.load.image('candelabrosEsquivados','https://i.imgur.com/gIoSiwL.png');
        this.load.image('candelabrosEsquivadosJugador1','https://i.imgur.com/ilcb9N8.png');
        this.load.image('candelabrosEsquivadosJugador2','https://i.imgur.com/EcFi5iD.png');
        this.load.image('dodgedChandeliers','https://i.imgur.com/ik2ZVb2.png');
        this.load.image('dodgedChandeliersPlayer1','https://i.imgur.com/JnRQBwI.png');
        this.load.image('dodgedChandeliersPlayer2','https://i.imgur.com/jIjzBYU.png');
        this.load.image('tablaPuntuacionesUnJugador','https://i.imgur.com/XHc8tpN.png');
        this.load.image('tablaPuntuacionesMultijugador','https://i.imgur.com/bSuFV7t.png');
        this.load.image('spScoreTable','https://i.imgur.com/yW86edp.png');
        this.load.image('mpScoreTable','https://i.imgur.com/xbW18K8.png');
        this.load.audio('introSong', 'assets/audio/cancionIntro.mp3');
        this.load.audio('levelSong', 'assets/audio/cancionNiveles.mp3');
        this.load.audio('damage', 'assets/audio/damage.mp3');
        this.load.audio('lvl1Sound', 'assets/audio/CasaEnfadada1.mp3');
        this.load.audio('lvl2Sound', 'assets/audio/CasaEnfadada2.mp3');
        this.load.audio('lvl3Sound', 'assets/audio/CasaEnfadada3.mp3');
        this.load.audio('jumpSound', 'assets/audio/salto1.mp3');
        this.load.audio('candleSound', 'assets/audio/CaidaCandelabro2.mp3');
        this.load.image('exclamation','https://i.imgur.com/QwhqnFo.png');
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