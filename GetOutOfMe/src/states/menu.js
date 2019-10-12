SplendorousGames.menuState = function(game) {
}

var generalX=640;
var initialY=300;
var variacion=100;
var reglasNivel=new Object();

SplendorousGames.menuState.prototype = {

    preload: function () {

    },


    create: function() {
        //Primer menu
        firstMenu=true;
        //Use for sorting
        this.background = this.createBackground();

        buttonJugar = game.add.button(generalX,initialY+variacion*2, 'btn-jugar', this.menuState, this, 0);
        //Centrado de botones.
        buttonJugar.anchor.x=0.5;
        buttonJugar.anchor.y=0.5;
        //Escalado de botones.
        buttonJugar.scale.x = 0.2;
        buttonJugar.scale.y = 0.2;
        //Tintado de botones
        buttonJugar.tint=buttonsColorOut;


    },


    update: function() {
        if(firstMenu){
            this.changeButtonsColors(buttonJugar);
        }else if(secondMenu){
            this.changeButtonsColors(buttonSingleplayer);
            this.changeButtonsColors(buttonMultiplayer);
            this.changeButtonsColors(buttonOnline);
        }else if(thirdMenu){
            this.changeButtonsColors(buttonLevel1);
            this.changeButtonsColors(buttonLevel2);
            this.changeButtonsColors(buttonLevel3);
        }
    },

    changeButtonsColors: function(button){
        button.onInputOver.add(this.ColorOver,this);
        button.onInputOut.add(this.ColorOut,this);
    },

    ColorOver: function (button){
        button.tint=buttonsColorOver;
    },

    ColorOut:function (button){
        button.tint=buttonsColorOut;
    },

    createBackground: function()
    {
        var background = game.add.sprite(0, 0, "menuBackground");
        
        //Placement
        background.scale.setTo(0.4, 0.4);

        return background;
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
    menuState: function(){
        buttonJugar.destroy();
        firstMenu=false;
        this.secondMenu();
    },
    secondMenu:function(){
        secondMenu=true;
        buttonSingleplayer = game.add.button(generalX,initialY, 'btn-singleplayer', this.singlePlayer, this, 0);
        buttonMultiplayer = game.add.button(generalX,300+variacion, 'btn-multiplayer', this.multiPlayer, this, 0);
        buttonOnline = game.add.button(generalX,300+(2*variacion), 'btn-online', this.online, this, 0);
        //Centrado de botones.
        buttonSingleplayer.anchor.x=0.5;
        buttonSingleplayer.anchor.y=0.5;
        buttonMultiplayer.anchor.x=0.5;
        buttonMultiplayer.anchor.y=0.5;
        buttonOnline.anchor.x=0.5;
        buttonOnline.anchor.y=0.5;
        //Escalado de botones.
        buttonSingleplayer.scale.x = 0.3;
        buttonSingleplayer.scale.y = 0.3;
        buttonMultiplayer.scale.x = 0.3;
        buttonMultiplayer.scale.y = 0.3;
        buttonOnline.scale.x = 0.3;
        buttonOnline.scale.y = 0.3;
        //Tintado de botones
        buttonSingleplayer.tint=buttonsColorOut;
        buttonMultiplayer.tint=buttonsColorOut;
        buttonOnline.tint=buttonsColorOut;
    },
    singlePlayer: function(){
        buttonSingleplayer.destroy();
        buttonMultiplayer.destroy();
        buttonOnline.destroy();
        secondMenu=false;
        this.thirdMenu();
    },
    thirdMenu:function(){
        thirdMenu=true;
        buttonLevel1 = game.add.button(generalX,initialY, 'btn-level1', this.level1, this, 0);
        buttonLevel2 = game.add.button(generalX,300+variacion, 'btn-level2', this.level2, this, 0);
        buttonLevel3 = game.add.button(generalX,300+(2*variacion), 'btn-level3', this.level3, this, 0);
        //Centrado de botones.
        buttonLevel1.anchor.x=0.5;
        buttonLevel1.anchor.y=0.5;
        buttonLevel2.anchor.x=0.5;
        buttonLevel2.anchor.y=0.5;
        buttonLevel3.anchor.x=0.5;
        buttonLevel3.anchor.y=0.5;
        //Escalado de botones.
        buttonLevel1.scale.x = 0.3;
        buttonLevel1.scale.y = 0.3;
        buttonLevel2.scale.x = 0.3;
        buttonLevel2.scale.y = 0.3;
        buttonLevel3.scale.x = 0.3;
        buttonLevel3.scale.y = 0.3;
        //Tintado de botones
        buttonLevel1.tint=buttonsColorOut;
        buttonLevel2.tint=buttonsColorOut;
        buttonLevel3.tint=buttonsColorOut;
    },
    level1:function(){
        reglasNivel.phantoms=false;
        reglasNivel.frecuenciaDeAparicion=8000;
        reglasNivel.pared="pared";
        reglasNivel.muebles="muebles";
        reglasNivel.sueloNivel="sueloNivel";
        game.state.start("single");
    },
    level2:function(){
        reglasNivel.phantoms=true;
        reglasNivel.frecuenciaDeAparicion=7000;
        reglasNivel.pared="pared";
        reglasNivel.muebles="muebles";
        reglasNivel.sueloNivel="sueloNivel";
        game.state.start("single");
    },
    level3:function(){
        reglasNivel.phantoms=true;
        reglasNivel.frecuenciaDeAparicion=5000;
        reglasNivel.pared="pared";
        reglasNivel.muebles="muebles";
        reglasNivel.sueloNivel="sueloNivel";
        game.state.start("single");
    },
    multiPlayer: function(){
        game.state.start("multi");
    },
    online: function(){
        game.state.start("online");
    }
}