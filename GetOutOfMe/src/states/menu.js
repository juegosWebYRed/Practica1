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
var idioma="Espanol";
var firstMenu=false;
var secondMenu=false;
var thirdMenu=false;
var languageMenu=false;

//Buttons
var buttonsColorOut=0xf0e800;
var buttonsColorOver=0xb01000;

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

        if(idioma==="Ingles"){
            buttonJugar = game.add.button(generalX,initialY+variacion, 'btn-play', this.menuState, this, 0);
            buttonIdioma = game.add.button(generalX,initialY+(2*variacion), 'btn-language', this.languageState, this, 0);
        }else{
            buttonJugar = game.add.button(generalX,initialY+variacion, 'btn-jugar', this.menuState, this, 0);
            buttonIdioma = game.add.button(generalX,initialY+(2*variacion), 'btn-idioma', this.languageState, this, 0);
        }
        
        //Centrado de botones.
        buttonJugar.anchor.x=0.5;
        buttonJugar.anchor.y=0.5;
        buttonIdioma.anchor.x=0.5;
        buttonIdioma.anchor.y=0.5;
        //Escalado de botones.
        buttonJugar.scale.x = 0.6;
        buttonJugar.scale.y = 0.6;
        buttonIdioma.scale.x = 0.6;
        buttonIdioma.scale.y = 0.6;
        //Tintado de botones
        buttonJugar.tint=buttonsColorOut;
        buttonIdioma.tint=buttonsColorOut;

    },


    update: function() {
        for(var i=0;i<nClouds;i++){
            if(clouds[i].body.x>gameHeight){
                clouds[i].body.velocity.x=-clouds[i].body.velocity.x;
            }else if(clouds[i].body.x<-200){
                clouds[i].body.velocity.x=-clouds[i].body.velocity.x;
            }
        }
        if(firstMenu){
            this.changeButtonsColors(buttonJugar);
            this.changeButtonsColors(buttonIdioma);
        }else if(secondMenu){
            this.changeButtonsColors(buttonSingleplayer);
            this.changeButtonsColors(buttonMultiplayer);
            this.changeButtonsColors(buttonVolver);
            this.changeButtonsColors(buttonPuntuacionSP);
            this.changeButtonsColors(buttonPuntuacionMP);
        }else if(thirdMenu){
            this.changeButtonsColors(buttonLevel1);
            this.changeButtonsColors(buttonLevel2);
            this.changeButtonsColors(buttonLevel3);
            this.changeButtonsColors(buttonVolver);
        }else if(languageMenu){
            this.changeButtonsColors(buttonEspanol);
            this.changeButtonsColors(buttonIngles);
            this.changeButtonsColors(buttonVolver);
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

            game.physics.enable(cloud, Phaser.Physics.ARCADE);
            //Animaciones de las nubes
            cloud.animations.add('moverse', [0, 1, 2], true);
            cloud.animations.play('moverse', game.rnd.integerInRange(2, 3), true);
            cloud.body.velocity.x=game.rnd.integerInRange(-100,100);
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
        buttonIdioma.destroy();
        firstMenu=false;
        this.secondMenu();
    },
    firstMenu:function(){
        //Primer menu
        firstMenu=true;

        if(idioma==="Ingles"){
            buttonJugar = game.add.button(generalX,initialY+variacion, 'btn-play', this.menuState, this, 0);
            buttonIdioma = game.add.button(generalX,initialY+(2*variacion), 'btn-language', this.languageState, this, 0);
        }else{
            buttonJugar = game.add.button(generalX,initialY+variacion, 'btn-jugar', this.menuState, this, 0);
            buttonIdioma = game.add.button(generalX,initialY+(2*variacion), 'btn-idioma', this.languageState, this, 0);
        }

        //Centrado de botones.
        buttonJugar.anchor.x=0.5;
        buttonJugar.anchor.y=0.5;
        buttonIdioma.anchor.x=0.5;
        buttonIdioma.anchor.y=0.5;
        //Escalado de botones.
        buttonJugar.scale.x = 0.6;
        buttonJugar.scale.y = 0.6;
        buttonIdioma.scale.x = 0.6;
        buttonIdioma.scale.y = 0.6;
        //Tintado de botones
        buttonJugar.tint=buttonsColorOut;
        buttonIdioma.tint=buttonsColorOut;
    },
    singlePlayer: function(){
        buttonSingleplayer.destroy();
        buttonMultiplayer.destroy();
        buttonVolver.destroy();
        buttonIdioma.destroy();
        buttonPuntuacionSP.destroy();
        buttonPuntuacionMP.destroy();
        singlePlayer=true;
        secondMenu=false;
        this.thirdMenu();
    },
    multiPlayer: function(){
        buttonSingleplayer.destroy();
        buttonMultiplayer.destroy();
        buttonVolver.destroy();
        buttonIdioma.destroy();
        buttonPuntuacionSP.destroy();
        buttonPuntuacionMP.destroy();
        multiPlayer=true;
        secondMenu=false;
        this.thirdMenu();
    },
    secondMenu:function(){
        secondMenu=true;
        buttonPuntuacionSP = game.add.button(440,initialY+(2*variacion), 'btn-online', this.singlePlayerPuntuacion, this, 0);
        buttonPuntuacionMP = game.add.button(840,initialY+(2*variacion), 'btn-online', this.multiPlayerPuntuacion, this, 0);
        if(idioma==="Ingles"){
            buttonSingleplayer = game.add.button(generalX+25,initialY, 'btn-singleplayer', this.singlePlayer, this, 0);
            buttonMultiplayer = game.add.button(generalX+35,initialY+variacion, 'btn-multiplayer', this.multiPlayer, this, 0);
            buttonVolver = game.add.button(100,initialY+variacion*2.5, 'btn-back', this.volverFirstMenu, this, 0);
        }else{
            buttonSingleplayer = game.add.button(generalX+25,initialY, 'btn-unjugador', this.singlePlayer, this, 0);
            buttonMultiplayer = game.add.button(generalX+35,initialY+variacion, 'btn-multijugador', this.multiPlayer, this, 0);
            buttonVolver = game.add.button(110,initialY+variacion*2.5, 'btn-volver', this.volverFirstMenu, this, 0);
        }

        //Centrado de botones.
        buttonSingleplayer.anchor.x=0.5;
        buttonSingleplayer.anchor.y=0.5;
        buttonMultiplayer.anchor.x=0.5;
        buttonMultiplayer.anchor.y=0.5;
        buttonVolver.anchor.x=0.5;
        buttonVolver.anchor.y=0.5;
        buttonPuntuacionSP.anchor.x=0.5;
        buttonPuntuacionSP.anchor.y=0.5;
        buttonPuntuacionMP.anchor.x=0.5;
        buttonPuntuacionMP.anchor.y=0.5;
        //Escalado de botones.
        buttonSingleplayer.scale.x = 0.6;
        buttonSingleplayer.scale.y = 0.6;
        buttonMultiplayer.scale.x = 0.6;
        buttonMultiplayer.scale.y = 0.6;
        buttonVolver.scale.x = 0.6;
        buttonVolver.scale.y = 0.6;
        buttonPuntuacionSP.scale.x = 0.6;
        buttonPuntuacionSP.scale.y = 0.6;
        buttonPuntuacionMP.scale.x = 0.6;
        buttonPuntuacionMP.scale.y = 0.6;
        //Tintado de botones
        buttonSingleplayer.tint=buttonsColorOut;
        buttonMultiplayer.tint=buttonsColorOut;
        buttonVolver.tint=buttonsColorOut;
        buttonPuntuacionSP.tint=buttonsColorOut;
        buttonPuntuacionMP.tint=buttonsColorOut;
    },
    thirdMenu:function(){
        thirdMenu=true;
        if(idioma==="Ingles"){
            buttonLevel1 = game.add.button(generalX,initialY, 'btn-level1', this.level1, this, 0);
            buttonLevel2 = game.add.button(generalX,initialY+variacion, 'btn-level2', this.level2, this, 0);
            buttonLevel3 = game.add.button(generalX,initialY+(2*variacion), 'btn-level3', this.level3, this, 0);
            buttonVolver = game.add.button(100,initialY+variacion*2.5, 'btn-back', this.volverSecondMenu, this, 0);
        }else{
            buttonLevel1 = game.add.button(generalX,initialY, 'btn-nivel1', this.level1, this, 0);
            buttonLevel2 = game.add.button(generalX,initialY+variacion, 'btn-nivel2', this.level2, this, 0);
            buttonLevel3 = game.add.button(generalX,initialY+(2*variacion), 'btn-nivel3', this.level3, this, 0);
            buttonVolver = game.add.button(110,initialY+variacion*2.5, 'btn-volver', this.volverSecondMenu, this, 0);
        }
        //Centrado de botones.
        buttonLevel1.anchor.x=0.5;
        buttonLevel1.anchor.y=0.5;
        buttonLevel2.anchor.x=0.5;
        buttonLevel2.anchor.y=0.5;
        buttonLevel3.anchor.x=0.5;
        buttonLevel3.anchor.y=0.5;
        buttonVolver.anchor.x=0.5;
        buttonVolver.anchor.y=0.5;
        //Escalado de botones.
        buttonLevel1.scale.x = 0.6;
        buttonLevel1.scale.y = 0.6;
        buttonLevel2.scale.x = 0.6;
        buttonLevel2.scale.y = 0.6;
        buttonLevel3.scale.x = 0.6;
        buttonLevel3.scale.y = 0.6;
        buttonVolver.scale.x = 0.6;
        buttonVolver.scale.y = 0.6;
        //Tintado de botones
        buttonLevel1.tint=buttonsColorOut;
        buttonLevel2.tint=buttonsColorOut;
        buttonLevel3.tint=buttonsColorOut;
        buttonVolver.tint=buttonsColorOut;
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
        reglasNivel.velPlataforms=[0,0];
        //Definimos los sprites de las plataformas.
        reglasNivel.imagenPlataformas=['plataforma','plataforma'];
        //Definimos la frecuencia de aparicion de los proyectiles.
        reglasNivel.frecuenciaDeAparicion=10000;
	//Definimos las posibles posiciones de las dos sillas:
	reglasNivel.sillaPosY=[600,350];
        reglasNivel.pared="pared";
        reglasNivel.muebles="muebleslv1";
        reglasNivel.scaleX=0.35;
        reglasNivel.scaleY=0.275;
        reglasNivel.sueloNivel="sueloNivel";
        if(singlePlayer){
            singlePlayer=false;
            clouds=[];
            game.state.start("single");
        }else if(multiPlayer){
            multiPlayer=false;
            clouds=[];
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
        reglasNivel.imagenPlataformas=['plataforma','plataforma'];
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
	//Definimos las posibles posiciones de las dos sillas:
	reglasNivel.sillaPosY=[600,350];
        reglasNivel.pared="pared";
        reglasNivel.muebles="muebleslv2";
        reglasNivel.scaleX=0.35;
        reglasNivel.scaleY=0.27;
        reglasNivel.sueloNivel="sueloNivel";
        if(singlePlayer){
            singlePlayer=false;
            clouds=[];
            game.state.start("single");
        }else if(multiPlayer){
            multiPlayer=false;
            clouds=[];
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
        reglasNivel.imagenPlataformas=['plataforma','plataforma'];
        //Definimos el numero de fantasmas.
        reglasNivel.numPhantoms=2;
        //Definimos la x de cada una de los fantasmas.
        reglasNivel.posPhantomsX=[50,650];
        //Definimos la y de cada una de los fantasmas.
        reglasNivel.posPhantomsY=[130,350];
        //Definimos la velocidad de los fantasmas.
        reglasNivel.velPhantoms=[100,120];
        //Definimos la frecuencia de aparicion de los proyectiles.
        reglasNivel.frecuenciaDeAparicion=4000;
	//Definimos las posibles posiciones de las dos sillas:
	reglasNivel.sillaPosY=[600,350];
        reglasNivel.pared="pared";
        reglasNivel.muebles="muebleslv3";
        reglasNivel.scaleX=0.35;
        reglasNivel.scaleY=0.26;
        reglasNivel.sueloNivel="sueloNivel";
        if(singlePlayer){
            singlePlayer=false;
            clouds=[];
            game.state.start("single");
        }else if(multiPlayer){
            multiPlayer=false;
            clouds=[];
            game.state.start("multi");
        }
    },
    languageState: function(){
        buttonJugar.destroy();
        buttonIdioma.destroy();
        firstMenu=false;
        secondMenu=false;
        thirdMenu=false;

        this.languageMenu();
    },
    languageMenu:function(){
        languageMenu=true;
        if(idioma==="Ingles"){
            buttonEspanol = game.add.button(generalX,initialY, 'btn-spanish', this.idiomaEspanol, this, 0);
            buttonIngles = game.add.button(generalX,initialY+variacion, 'btn-english', this.idiomaIngles, this, 0);
            buttonVolver = game.add.button(100,initialY+variacion*2.5, 'btn-back', this.volverFirstMenu, this, 0);
        }else{
            buttonEspanol = game.add.button(generalX,initialY, 'btn-espanol', this.idiomaEspanol, this, 0);
            buttonIngles = game.add.button(generalX,initialY+variacion, 'btn-ingles', this.idiomaIngles, this, 0);
            buttonVolver = game.add.button(110,initialY+variacion*2.5, 'btn-volver', this.volverFirstMenu, this, 0);
        }
        //Centrado de botones.
        buttonEspanol.anchor.x=0.5;
        buttonEspanol.anchor.y=0.5;
        buttonIngles.anchor.x=0.5;
        buttonIngles.anchor.y=0.5;
        buttonVolver.anchor.x=0.5;
        buttonVolver.anchor.y=0.5;
        //Escalado de botones.
        buttonEspanol.scale.x = 0.6;
        buttonEspanol.scale.y = 0.6;
        buttonIngles.scale.x = 0.6;
        buttonIngles.scale.y = 0.6;
        buttonVolver.scale.x = 0.6;
        buttonVolver.scale.y = 0.6;
        //Tintado de botones
        buttonEspanol.tint=buttonsColorOut;
        buttonIngles.tint=buttonsColorOut;
        buttonVolver.tint=buttonsColorOut;
    },
    idiomaEspanol:function(){
        buttonEspanol.destroy();
        buttonIngles.destroy();
        buttonVolver.destroy();
        buttonPuntuacionSP.destroy();
        buttonPuntuacionMP.destroy();
        idioma="Espanol";
        languageMenu=false;
        this.languageMenu();
    },
    idiomaIngles:function(){
        buttonEspanol.destroy();
        buttonIngles.destroy();
        buttonVolver.destroy();
        buttonPuntuacionSP.destroy();
        buttonPuntuacionMP.destroy();
        idioma="Ingles";
        languageMenu=false;
        this.languageMenu();
    },
    volverFirstMenu:function(){
        if(languageMenu===true){
            buttonEspanol.destroy();
            buttonIngles.destroy();
            buttonVolver.destroy();
            buttonPuntuacionSP.destroy();
            buttonPuntuacionMP.destroy();
            languageMenu=false;
        }else if(secondMenu===true){
            buttonSingleplayer.destroy();
            buttonMultiplayer.destroy();
            buttonVolver.destroy();
            buttonPuntuacionSP.destroy();
            buttonPuntuacionMP.destroy();
            secondMenu=false;
        }
        this.firstMenu();
    },
    volverSecondMenu:function(){
        buttonLevel1.destroy();
        buttonLevel2.destroy();
        buttonLevel3.destroy();
        buttonVolver.destroy();
        buttonPuntuacionSP.destroy();
        buttonPuntuacionMP.destroy();
        thirdMenu=false;
        this.secondMenu();
    },
    singlePlayerPuntuacion: function(){
        game.state.start("title");
    },
    multiPlayerPuntuacion: function(){
        game.state.start("multiPuntuacion");
    }
}