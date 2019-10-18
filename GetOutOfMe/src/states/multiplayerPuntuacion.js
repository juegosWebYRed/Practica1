SplendorousGames.multiPuntuacion = function(game) {
}
//Número de puntuaciones pertenecientes al modo de juego "multiplayer"
var nPuntuacionesMP;

SplendorousGames.multiPuntuacion.prototype = {

    preload: function () {
        
    },

    create: function() {
        nPuntuacionesMP = this.numeroPuntuacionesMulti();
        //Creación del escenario
        var textStyle = {font: "40px Arial", fill: "#ffffff", boundsAlignH: "center"};
        var textStyle2 = {font: "20px Arial", fill: "#ffffff"};
        var wall = game.add.sprite(0, 0, "pared");
        wall.scale.setTo(0.5, 0.3);

        //Botón de volver
        botonVolver = game.add.button(200, 650, 'btn-volver', this.volver, this, 0);
        botonVolver.anchor.x=0.5;
        botonVolver.anchor.y=0.5;
        botonVolver.scale.x = 0.6;
        botonVolver.scale.y = 0.6;
        botonVolver.tint=buttonsColorOut;
        this.changeButtonsColors(botonVolver);

        //Tabla sin puntuaciones
        if(localStorage.length == 0){
            game.add.text(430, 300, "SIN PUNTUACIONES", textStyle);
        }
        else{
            //Tabla con puntuaciones
            game.add.text(335, 60, "MEJORES PUNTUACIONES (2P)", textStyle);
            for(var i = 0; i < nPuntuacionesMP; i++){
                if(localStorage.getItem("puntuacionMP" + i.toString()) != null){
                    game.add.text(535, 150 + i * 50, "Puntuacion nº " + (i+1) + ": " + localStorage.getItem("puntuacionMP" + i.toString()), textStyle2);
                }
            }
        }
    },
    update: function() {
        
    },
    //Cálculo del número de puntuaciones de las almacenadas en memoria que pertenecen al modo "multiplayer"
    numeroPuntuacionesMulti: function(){
        var cont = 0;
        for(var i = 0; i < localStorage.length; i++){
            if(localStorage.getItem("puntuacionMP" + i.toString()) != null){
                cont++;
            } 
        }
        return cont;
    },
    volver: function(){
        musicIntro.stop();
        game.state.start('menu');
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
}