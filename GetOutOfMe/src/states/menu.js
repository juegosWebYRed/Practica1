﻿SplendorousGames.menuState = function(game) {
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
var musicIntro;
var musicLevel;
var damageSound;
var lvl1Sound;
var lvl2Sound;
var lvl3Sound;
var jumpSound;
var candleSound;

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

        //Música
        musicIntro = game.add.audio('introSong');
        lvl1Sound = game.add.audio('lvl1Sound');
        lvl2Sound = game.add.audio('lvl2Sound');
        lvl3Sound = game.add.audio('lvl3Sound');
        game.sound.setDecodedCallback(musicIntro, this.start, this);

        if(idioma==="Ingles"){
            buttonJugar = game.add.button(generalX,initialY, 'btn-play', this.menuState, this, 0);
            buttonIdioma = game.add.button(generalX,initialY+variacion, 'btn-language', this.languageState, this, 0);
            buttonContacto = game.add.button(generalX-200,initialY+(2*variacion), 'btn-contact', this.contactState, this, 0);
            buttonControles = game.add.button(generalX+200,initialY+(2*variacion), 'btn-controls', this.controlsState, this, 0);
        }else{
            buttonJugar = game.add.button(generalX,initialY, 'btn-jugar', this.menuState, this, 0);
            buttonIdioma = game.add.button(generalX,initialY+variacion, 'btn-idioma', this.languageState, this, 0);
            buttonContacto = game.add.button(generalX-200,initialY+(2*variacion), 'btn-contacto', this.contactState, this, 0);
            buttonControles = game.add.button(generalX+200,initialY+(2*variacion), 'btn-controles', this.controlsState, this, 0);
        }
        
        //Centrado de botones.
        buttonJugar.anchor.x=0.5;
        buttonJugar.anchor.y=0.5;
        buttonIdioma.anchor.x=0.5;
        buttonIdioma.anchor.y=0.5;
        buttonContacto.anchor.x=0.5;
        buttonContacto.anchor.y=0.5;
        buttonControles.anchor.x=0.5;
        buttonControles.anchor.y=0.5;
        //Escalado de botones.
        buttonJugar.scale.x = 0.6;
        buttonJugar.scale.y = 0.6;
        buttonIdioma.scale.x = 0.6;
        buttonIdioma.scale.y = 0.6;
        buttonContacto.scale.x = 0.6;
        buttonContacto.scale.y = 0.6;
        buttonControles.scale.x = 0.6;
        buttonControles.scale.y = 0.6;
        //Tintado de botones
        buttonJugar.tint=buttonsColorOut;
        buttonIdioma.tint=buttonsColorOut;
        buttonContacto.tint=buttonsColorOut;
        buttonControles.tint=buttonsColorOut;

    },

    start: function(){
        musicIntro.play();
    },

    update: function() {
        //Movimiento de las nubes
        for(var i=0;i<nClouds;i++){
            if(clouds[i].body != null){
                if(clouds[i].body.x>gameHeight){
                    clouds[i].body.velocity.x=-clouds[i].body.velocity.x;
                }else if(clouds[i].body.x<-200){
                    clouds[i].body.velocity.x=-clouds[i].body.velocity.x;
                }
            }
        }
        if(firstMenu){
            this.changeButtonsColors(buttonJugar);
            this.changeButtonsColors(buttonIdioma);
            this.changeButtonsColors(buttonContacto);
            this.changeButtonsColors(buttonControles);
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
        }else if(controls){
            this.changeButtonsColors(buttonVolver);
        }
    },

    //Cambia los colores de los botones si el cursor esta encima de ellos y los vuelve a dejar en su color original si no lo está.
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
        //Creación de las briznas de césped
        for(var i=0;i<nGrass;i++){
            grass = game.add.sprite(game.rnd.integerInRange(0, 1250), game.rnd.integerInRange(500, 650), 'cesped');

            //Animaciones de las briznas
            grass.animations.add('moverse', [0, 1, 2, 3], true);
            grass.animations.play('moverse', game.rnd.integerInRange(3, 4), true);

            totalGrass.push(grass);
        }
        

        //Placement
        background.scale.setTo(1.1, 1.1);
        sky.scale.setTo(1.1, 1.1);

        return background;
    },

    //Destruye los botones del primer menú y llama a que se cree el segundo.
    menuState: function(){
        buttonJugar.destroy();
        buttonIdioma.destroy();
        buttonContacto.destroy();
        buttonControles.destroy();
        firstMenu=false;
        this.secondMenu();
    },
    //Crea los botones del primer menú
    firstMenu:function(){
        //Primer menu
        firstMenu=true;

        
        if(idioma==="Ingles"){
            buttonJugar = game.add.button(generalX,initialY, 'btn-play', this.menuState, this, 0);
            buttonIdioma = game.add.button(generalX,initialY+variacion, 'btn-language', this.languageState, this, 0);
            buttonContacto = game.add.button(generalX-200,initialY+(2*variacion), 'btn-contact', this.contactState, this, 0);
            buttonControles = game.add.button(generalX+200,initialY+(2*variacion), 'btn-controls', this.controlsState, this, 0);
        }else{
            buttonJugar = game.add.button(generalX,initialY, 'btn-jugar', this.menuState, this, 0);
            buttonIdioma = game.add.button(generalX,initialY+variacion, 'btn-idioma', this.languageState, this, 0);
            buttonContacto = game.add.button(generalX-200,initialY+(2*variacion), 'btn-contacto', this.contactState, this, 0);
            buttonControles = game.add.button(generalX+200,initialY+(2*variacion), 'btn-controles', this.controlsState, this, 0);
        }
        //Centrado de botones.
        buttonJugar.anchor.x=0.5;
        buttonJugar.anchor.y=0.5;
        buttonIdioma.anchor.x=0.5;
        buttonIdioma.anchor.y=0.5;
        buttonContacto.anchor.x=0.5;
        buttonContacto.anchor.y=0.5;
        buttonControles.anchor.x=0.5;
        buttonControles.anchor.y=0.5;
        //Escalado de botones.
        buttonJugar.scale.x = 0.6;
        buttonJugar.scale.y = 0.6;
        buttonIdioma.scale.x = 0.6;
        buttonIdioma.scale.y = 0.6;
        buttonContacto.scale.x = 0.6;
        buttonContacto.scale.y = 0.6;
        buttonControles.scale.x = 0.6;
        buttonControles.scale.y = 0.6;
        //Tintado de botones
        buttonJugar.tint=buttonsColorOut;
        buttonIdioma.tint=buttonsColorOut;
        buttonContacto.tint=buttonsColorOut;
        buttonControles.tint=buttonsColorOut;
    },
    //Destruye los botones del segundo menú y llama al tercer menú para crearse,
    //con la distinción del modo de juego que vamos a jugar.
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
    
    //Destruye los botones del segundo menú y llama al tercer menú para crearse.
    //con la distinción del modo de juego que vamos a jugar.
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
    //Crea los botones del segundo menú.
    secondMenu:function(){
        secondMenu=true;
        //Boton de borrar puntos
        botonEliminarPuntos = game.add.button(1130, 610, 'btn-deletePoints', this.delete, this, 0);
        botonEliminarPuntos.scale.setTo(0.5, 0.5);

        if(idioma==="Ingles"){
            buttonSingleplayer = game.add.button(generalX+25,initialY, 'btn-singleplayer', this.singlePlayer, this, 0);
            buttonMultiplayer = game.add.button(generalX+35,initialY+variacion, 'btn-multiplayer', this.multiPlayer, this, 0);
            buttonPuntuacionSP = game.add.button(460,initialY+(2*variacion), 'spScoreTable', this.singlePlayerPuntuacion, this, 0);
            buttonPuntuacionMP = game.add.button(860,initialY+(2*variacion), 'mpScoreTable', this.multiPlayerPuntuacion, this, 0);
            buttonVolver = game.add.button(100,initialY+variacion*2.5, 'btn-back', this.volverFirstMenu, this, 0);
        }else{
            buttonSingleplayer = game.add.button(generalX+25,initialY, 'btn-unjugador', this.singlePlayer, this, 0);
            buttonMultiplayer = game.add.button(generalX+35,initialY+variacion, 'btn-multijugador', this.multiPlayer, this, 0);
            buttonPuntuacionSP = game.add.button(460,initialY+(2*variacion), 'tablaPuntuacionesUnJugador', this.singlePlayerPuntuacion, this, 0);
            buttonPuntuacionMP = game.add.button(860,initialY+(2*variacion), 'tablaPuntuacionesMultijugador', this.multiPlayerPuntuacion, this, 0);
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
        buttonPuntuacionSP.scale.x = 0.3;
        buttonPuntuacionSP.scale.y = 0.3;
        buttonPuntuacionMP.scale.x = 0.3;
        buttonPuntuacionMP.scale.y = 0.3;
        //Tintado de botones
        buttonSingleplayer.tint=buttonsColorOut;
        buttonMultiplayer.tint=buttonsColorOut;
        buttonVolver.tint=buttonsColorOut;
        buttonPuntuacionSP.tint=buttonsColorOut;
        buttonPuntuacionMP.tint=buttonsColorOut;
    },
    //Crea los botones del tercer menú.
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
        //Definimos la posición x de los jugadores.
        reglasNivel.jugadoresPosX=[100,500];
        //Definimos la posición y de los jugadores.
        reglasNivel.jugadoresPosY=[450,450];
        //Definimos si queremos plataformas.
        reglasNivel.plataforms=true;
        //Definimos el numero de plataformas.
        reglasNivel.numPlataforms=3;
        //Definimos la x de cada una de las plataformas.
        reglasNivel.posPlataformsX=[800, 50,250];
        //Definimos la y de cada una de las plataformas.
        reglasNivel.posPlataformsY=[450,250,450];
        //Definimos la velocidad de las plataformas.
        reglasNivel.velPlataforms=[0,200,0];
        //Definimos los sprites de las plataformas.
        reglasNivel.imagenPlataformas=['miniPlataforma','plataforma','miniPlataforma'];
        //Definimos la frecuencia de aparicion de los proyectiles.
        reglasNivel.frecuenciaDeAparicion=10000;
	    //Definimos las posibles posiciones de las dos sillas:
	    reglasNivel.sillaPosY=[600,350];
        reglasNivel.pared="pared";
        //Definimos los muebles y su escala.
        reglasNivel.muebles="muebleslv1";
        reglasNivel.scaleX=0.35;
        reglasNivel.scaleY=0.275;
        reglasNivel.sueloNivel="sueloNivel";
        lvl1Sound.play();
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
        //Definimos la posición x de los jugadores.
        reglasNivel.jugadoresPosX=[100,500];
        //Definimos la posición y de los jugadores.
        reglasNivel.jugadoresPosY=[450,450];
        //Definimos si queremos plataformas.
        reglasNivel.plataforms=true;
        //Definimos el numero de plataformas.
        reglasNivel.numPlataforms=2;
        //Definimos la x de cada una de las plataformas.
        reglasNivel.posPlataformsX=[600, 50];
        //Definimos la y de cada una de las plataformas.
        reglasNivel.posPlataformsY=[450,250];
        //Definimos la velocidad de las plataformas.
        reglasNivel.velPlataforms=[-200,200];
        //Definimos los sprites de las plataformas.
        reglasNivel.imagenPlataformas=['miniPlataforma','miniPlataforma'];
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
        //Definimos los muebles y su escala.
        reglasNivel.muebles="muebleslv2";
        reglasNivel.scaleX=0.35;
        reglasNivel.scaleY=0.27;
        reglasNivel.sueloNivel="sueloNivel";
        lvl2Sound.play();
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
        //Definimos la posición x de los jugadores.
        reglasNivel.jugadoresPosX=[570,650];
        //Definimos la posición y de los jugadores.
        reglasNivel.jugadoresPosY=[420,420];
        //Definimos el numero de plataformas.
        reglasNivel.numPlataforms=3;
        //Definimos la x de cada una de las plataformas.
        reglasNivel.posPlataformsX=[600, 50,300];
        //Definimos la y de cada una de las plataformas.
        reglasNivel.posPlataformsY=[550,150,350];
        //Definimos la velocidad de las plataformas.
        reglasNivel.velPlataforms=[-50,50,250];
        //Definimos los sprites de las plataformas.
        reglasNivel.imagenPlataformas=['plataforma','plataforma','miniPlataforma'];
        //Definimos el numero de fantasmas.
        reglasNivel.numPhantoms=2;
        //Definimos la x de cada una de los fantasmas.
        reglasNivel.posPhantomsX=[50,750];
        //Definimos la y de cada una de los fantasmas.
        reglasNivel.posPhantomsY=[30,450];
        //Definimos la velocidad de los fantasmas.
        reglasNivel.velPhantoms=[100,120];
        //Definimos la frecuencia de aparicion de los proyectiles.
        reglasNivel.frecuenciaDeAparicion=15000;
	    //Definimos las posibles posiciones de las dos sillas:
        reglasNivel.sillaPosY=[450,250];
        reglasNivel.damageLava=1;
        reglasNivel.pared="pared";
        //Definimos los muebles y su escala.
        reglasNivel.muebles="muebleslv3";
        reglasNivel.scaleX=0.35;
        reglasNivel.scaleY=0.26;
        reglasNivel.sueloNivel="lava";
        lvl3Sound.play();
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
    //Destruimos los botones del primer menú y llamamos a la función que crea el menú donde se van a elegir los idiomas.
    languageState: function(){
        buttonJugar.destroy();
        buttonIdioma.destroy();
        buttonControles.destroy();
        buttonContacto.destroy();
        firstMenu=false;
        secondMenu=false;
        thirdMenu=false;

        this.languageMenu();
    },
    //Función donde se crean los botones del menú de idiomas
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
    //Cambio de idioma al Español.
    idiomaEspanol:function(){
        buttonEspanol.destroy();
        buttonIngles.destroy();
        buttonVolver.destroy();
        idioma="Espanol";
        languageMenu=false;
        this.languageMenu();
    },
    //Cambio de idioma al Inglés.
    idiomaIngles:function(){
        buttonEspanol.destroy();
        buttonIngles.destroy();
        buttonVolver.destroy();
        idioma="Ingles";
        languageMenu=false;
        this.languageMenu();
    },
    //Destruye los botones del menú de idioma o del segundo menú y llama al primer menú.
    volverFirstMenu:function(){
        if(languageMenu===true){
            buttonEspanol.destroy();
            buttonIngles.destroy();
            buttonVolver.destroy();
            languageMenu=false;
        }else if(secondMenu===true){
            buttonSingleplayer.destroy();
            buttonMultiplayer.destroy();
            buttonVolver.destroy();
            buttonPuntuacionSP.destroy();
            buttonPuntuacionMP.destroy();
            secondMenu=false;
        }else if(controls===true){
            buttonVolver.destroy();
            controlesPc.destroy();
            controlesSmartphone.destroy();
            controls=false;
        }
        this.firstMenu();
    },
    //Destruye los botones del tercer menú y llama al segundo menú.
    volverSecondMenu:function(){
        buttonLevel1.destroy();
        buttonLevel2.destroy();
        buttonLevel3.destroy();
        buttonVolver.destroy();
        buttonPuntuacionSP.destroy();
        buttonPuntuacionMP.destroy();
        thirdMenu=false;
        singlePlayer=false;
        multiPlayer=false;
        this.secondMenu();
    },

    singlePlayerPuntuacion: function(){
        game.state.start("singlePuntuacion");
    },

    multiPlayerPuntuacion: function(){
        game.state.start("multiPuntuacion");
    },

    contactState:function(){
        window.open("https://juegoswebyred.github.io/Portfolio/", "_blank");
    },

    controlsState:function(){
        buttonJugar.destroy();
        buttonIdioma.destroy();
        buttonControles.destroy();
        buttonContacto.destroy();
        firstMenu=false;
        secondMenu=false;
        thirdMenu=false;

        this.controls();
    },

    controls:function(){
        controls=true;
        if(idioma==="Ingles"){
            buttonVolver = game.add.button(100,initialY+variacion*2.5, 'btn-back', this.volverFirstMenu, this, 0);
        }else{
            buttonVolver = game.add.button(110,initialY+variacion*2.5, 'btn-volver', this.volverFirstMenu, this, 0);
        }

        //Imágenes de los controles
        controlesPc = game.add.image(150,250,'controlesPC');

        controlesPc.scale.x=0.6;
        controlesPc.scale.y=0.6;

        controlesSmartphone = game.add.image(800,150,'controlesSmartphone');

        controlesSmartphone.scale.x=0.6;
        controlesSmartphone.scale.y=0.6;

        //Centrado de botones.
        buttonVolver.anchor.x=0.5;
        buttonVolver.anchor.y=0.5;
        //Escalado de botones.
        buttonVolver.scale.x = 0.6;
        buttonVolver.scale.y = 0.6;
        //Tintado de botones
        buttonVolver.tint=buttonsColorOut;
    },

    //Borra todas las puntuaciones
    delete: function(){
        localStorage.clear();
    },
}