SplendorousGames.gameOverState = function(game) {
}


SplendorousGames.gameOverState.prototype = {

    preload: function () {

    },


    create: function() {
        var generalX=450;
        var initialY=200;
        var variacion=70;

        //Use for sorting
        this.background = this.createBackground();

        buttonVolverMenu = game.add.button(150,680, 'btn-volverMenu', this.volverMenu, this, 0);
        if(ganador==="player1"){
            game.add.text(generalX, initialY, "Puntuacion Jugador1: "+player.puntuacion);
            game.add.text(generalX, initialY+variacion, "Candelabros Esquivados Jugador 1: "+player.candelabrosEsquivadosTotal);
            game.add.text(generalX, initialY+variacion*2, "Puntuacion Jugador2: "+player2.puntuacion);
            game.add.text(generalX, initialY+variacion*3, "Candelabros Esquivados Jugador 2: "+player2.candelabrosEsquivadosTotal);
            game.add.text(generalX, initialY+variacion*4.7, "El ganador ha sido el Jugador 1");

        }else if(ganador==="player2"){
            game.add.text(generalX, initialY, "Puntuacion Jugador1: "+player.puntuacion);
            game.add.text(generalX, initialY+variacion, "Candelabros Esquivados Jugador 1: "+player.candelabrosEsquivadosTotal);
            game.add.text(generalX, initialY+variacion*2, "Puntuacion Jugador2: "+player2.puntuacion);
            game.add.text(generalX, initialY+variacion*3, "Candelabros Esquivados Jugador 2: "+player2.candelabrosEsquivadosTotal);
            game.add.text(generalX, initialY+variacion*4.7, "El ganador ha sido el Jugador 2");

        }else{
            game.add.text(generalX, initialY, "Puntuacion : "+player.puntuacion);
            game.add.text(generalX, initialY+variacion, "Candelabros Esquivados : "+player.candelabrosEsquivadosTotal);

        }
        //Centrado de botones.
        buttonVolverMenu.anchor.x=0.5;
        buttonVolverMenu.anchor.y=0.5;
        //Escalado de botones.
        buttonVolverMenu.scale.x = 0.6;
        buttonVolverMenu.scale.y = 0.6;
        //Tintado de botones
        buttonVolverMenu.tint=buttonsColorOut;

    },


    update: function() {
        this.changeButtonsColors(buttonVolverMenu);
    },

    volverMenu:function(){
        game.state.start("menu");
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
        var background = game.add.sprite(0, 0, "finalBackground");

        return background;
    },

}