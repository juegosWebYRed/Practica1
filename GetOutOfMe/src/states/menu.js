SplendorousGames.menuState = function(game) {
}

var generalX=640;
var initialY=400;
var variacion=110;
var singlePlayer;
var multiPlayer;
var reglasNivel=new Object();
var clouds = [];
var nClouds = 10;
var totalGrass = [];
var nGrass = 40;

SplendorousGames.menuState.prototype = {

    preload: function () {

    },


    create: function() {
        //Primer menu
        firstMenu=true;
        //Use for sorting
        this.background = this.createBackground();
        title = game.add.sprite(generalX, initialY-variacion*2, "title");
        //Centrado de botones.
        title.anchor.x=0.5;
        title.anchor.y=0.5;
        //Escalado de botones.
        title.scale.x = 0.6;
        title.scale.y = 0.6;
        //Tintado de botones
        title.tint=buttonsColorOut;

        buttonJugar = game.add.button(generalX,initialY+variacion*2, 'btn-jugar', this.menuState, this, 0);
        //Centrado de botones.
        buttonJugar.anchor.x=0.5;
        buttonJugar.anchor.y=0.5;
        //Escalado de botones.
        buttonJugar.scale.x = 0.6;
        buttonJugar.scale.y = 0.6;
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
        var sky = game.add.sprite(0, 0, 'menuBackgroundSky');
        //Creación de nubes animadas en posiciones aleatorias
        for(var i=0;i<nClouds;i++){
            cloud = game.add.sprite(game.rnd.integerInRange(0, 1100), game.rnd.integerInRange(0, 400), 'nube');

            //Animaciones de las nubes
            cloud.animations.add('moverse', [0, 1, 2], true);
            cloud.animations.play('moverse', game.rnd.integerInRange(2, 3), true);

            clouds.push(cloud);
        }
        var background = game.add.sprite(0, 0, "menuBackgroundBase");
        //Creación de las briznas de cesped
        for(var i=0;i<nGrass;i++){
            grass = game.add.sprite(game.rnd.integerInRange(0, 1250), game.rnd.integerInRange(500, 650), 'cesped');

            //Animaciones de las nubes
            grass.animations.add('moverse', [0, 1, 2, 3], true);
            grass.animations.play('moverse', game.rnd.integerInRange(3, 4), true);

            totalGrass.push(grass);
        }
        

        //Placement
        background.scale.setTo(1.1, 1.1);
        sky.scale.setTo(1.1, 1.1);

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
        buttonSingleplayer = game.add.button(generalX+25,initialY, 'btn-singleplayer', this.singlePlayer, this, 0);
        buttonMultiplayer = game.add.button(generalX+35,initialY+variacion, 'btn-multiplayer', this.multiPlayer, this, 0);
        buttonOnline = game.add.button(generalX,initialY+(2*variacion), 'btn-online', this.online, this, 0);
        //Centrado de botones.
        buttonSingleplayer.anchor.x=0.5;
        buttonSingleplayer.anchor.y=0.5;
        buttonMultiplayer.anchor.x=0.5;
        buttonMultiplayer.anchor.y=0.5;
        buttonOnline.anchor.x=0.5;
        buttonOnline.anchor.y=0.5;
        //Escalado de botones.
        buttonSingleplayer.scale.x = 0.6;
        buttonSingleplayer.scale.y = 0.6;
        buttonMultiplayer.scale.x = 0.6;
        buttonMultiplayer.scale.y = 0.6;
        buttonOnline.scale.x = 0.6;
        buttonOnline.scale.y = 0.6;
        //Tintado de botones
        buttonSingleplayer.tint=buttonsColorOut;
        buttonMultiplayer.tint=buttonsColorOut;
        buttonOnline.tint=buttonsColorOut;
    },
    singlePlayer: function(){
        buttonSingleplayer.destroy();
        buttonMultiplayer.destroy();
        buttonOnline.destroy();
        singlePlayer=true;
        secondMenu=false;
        this.thirdMenu();
    },
    multiPlayer: function(){
        buttonSingleplayer.destroy();
        buttonMultiplayer.destroy();
        buttonOnline.destroy();
        multiPlayer=true;
        secondMenu=false;
        this.thirdMenu();
    },
    thirdMenu:function(){
        thirdMenu=true;
        buttonLevel1 = game.add.button(generalX,initialY, 'btn-level1', this.level1, this, 0);
        buttonLevel2 = game.add.button(generalX,initialY+variacion, 'btn-level2', this.level2, this, 0);
        buttonLevel3 = game.add.button(generalX,initialY+(2*variacion), 'btn-level3', this.level3, this, 0);
        //Centrado de botones.
        buttonLevel1.anchor.x=0.5;
        buttonLevel1.anchor.y=0.5;
        buttonLevel2.anchor.x=0.5;
        buttonLevel2.anchor.y=0.5;
        buttonLevel3.anchor.x=0.5;
        buttonLevel3.anchor.y=0.5;
        //Escalado de botones.
        buttonLevel1.scale.x = 0.6;
        buttonLevel1.scale.y = 0.6;
        buttonLevel2.scale.x = 0.6;
        buttonLevel2.scale.y = 0.6;
        buttonLevel3.scale.x = 0.6;
        buttonLevel3.scale.y = 0.6;
        //Tintado de botones
        buttonLevel1.tint=buttonsColorOut;
        buttonLevel2.tint=buttonsColorOut;
        buttonLevel3.tint=buttonsColorOut;
    },
    level1:function(){
        //Definimos si queremos fanatasmas.
        reglasNivel.phantoms=false;
        //Definimos si queremos plataformas.
        reglasNivel.plataforms=true;
        //Definimos el numero de plataformas.
        reglasNivel.numPlataforms=2;
        //Definimos la x de cada una de las plataformas.
        reglasNivel.posPlataformsX=[600, 50];
        //Definimos la y de cada una de las plataformas.
        reglasNivel.posPlataformsY=[450,250];
        //Definimos la velocidad de las plataformas.
        reglasNivel.velPlataforms=[0,200];
        //Definimos los sprites de las plataformas.
        reglasNivel.imagenPlataformas=['ground','ground'];
        //Definimos la frecuencia de aparicion de los proyectiles.
        reglasNivel.frecuenciaDeAparicion=8000;
        reglasNivel.pared="pared";
        reglasNivel.muebles="muebleslv1";
        reglasNivel.scaleX=0.35;
        reglasNivel.scaleY=0.275;
        reglasNivel.sueloNivel="sueloNivel";
        if(singlePlayer){
            singlePlayer=false;
            game.state.start("single");
        }else if(multiPlayer){
            multiPlayer=false;
            game.state.start("multi");
        }
    },
    level2:function(){
        //Definimos si queremos fanatasmas.
        reglasNivel.phantoms=true;
        //Definimos si queremos plataformas.
        reglasNivel.plataforms=true;
        //Definimos el numero de plataformas.
        reglasNivel.numPlataforms=2;
        //Definimos la x de cada una de las plataformas.
        reglasNivel.posPlataformsX=[600, 50];
        //Definimos la y de cada una de las plataformas.
        reglasNivel.posPlataformsY=[450,250];
        //Definimos la velocidad de las plataformas.
        reglasNivel.velPlataforms=[0,200];
        //Definimos los sprites de las plataformas.
        reglasNivel.imagenPlataformas=['ground','ground'];
        //Definimos el numero de fantasmas.
        reglasNivel.numPhantoms=2;
        //Definimos la x de cada una de los fantasmas.
        reglasNivel.posPhantomsX=[50,650];
        //Definimos la y de cada una de los fantasmas.
        reglasNivel.posPhantomsY=[130,350];
        //Definimos la velocidad de los fantasmas.
        reglasNivel.velPhantoms=[100,120];
        //Definimos la frecuencia de aparicion de los proyectiles.
        reglasNivel.frecuenciaDeAparicion=7000;
        reglasNivel.pared="pared";
        reglasNivel.muebles="muebleslv2";
        reglasNivel.scaleX=0.35;
        reglasNivel.scaleY=0.27;
        reglasNivel.sueloNivel="sueloNivel";
        if(singlePlayer){
            singlePlayer=false;
            game.state.start("single");
        }else if(multiPlayer){
            multiPlayer=false;
            game.state.start("multi");
        }
    },
    level3:function(){
        //Definimos si queremos fanatasmas.
        reglasNivel.phantoms=true;
        //Definimos si queremos plataformas.
        reglasNivel.plataforms=true;
        //Definimos el numero de plataformas.
        reglasNivel.numPlataforms=2;
        //Definimos la x de cada una de las plataformas.
        reglasNivel.posPlataformsX=[600, 50];
        //Definimos la y de cada una de las plataformas.
        reglasNivel.posPlataformsY=[450,250];
        //Definimos la velocidad de las plataformas.
        reglasNivel.velPlataforms=[0,200];
        //Definimos los sprites de las plataformas.
        reglasNivel.imagenPlataformas=['ground','ground'];
        //Definimos el numero de fantasmas.
        reglasNivel.numPhantoms=2;
        //Definimos la x de cada una de los fantasmas.
        reglasNivel.posPhantomsX=[50,650];
        //Definimos la y de cada una de los fantasmas.
        reglasNivel.posPhantomsY=[130,350];
        //Definimos la velocidad de los fantasmas.
        reglasNivel.velPhantoms=[100,120];
        //Definimos la frecuencia de aparicion de los proyectiles.
        reglasNivel.frecuenciaDeAparicion=5000;
        reglasNivel.pared="pared";
        reglasNivel.muebles="muebleslv3";
        reglasNivel.scaleX=0.35;
        reglasNivel.scaleY=0.26;
        reglasNivel.sueloNivel="sueloNivel";
        if(singlePlayer){
            singlePlayer=false;
            game.state.start("single");
        }else if(multiPlayer){
            multiPlayer=false;
            game.state.start("multi");
        }
    },
    online: function(){
        game.state.start("online");
    }
}