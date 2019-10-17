SplendorousGames.gameOverState = function(game) {
}

var puntuacionJugador1,puntuacionJugador2,ganador1,ganador2,candelabrosEsquivadosJugador1,candelabrosEsquivadosJugador2;

SplendorousGames.gameOverState.prototype = {

    preload: function () {

    },


    create: function() {
        var generalX=250;
        var initialY=100;
        var variacionY=70;
        var variacionX=300;
        var generalAnchor=0.5;
        var generalScale=0.3;

        //Use for sorting
        this.background = this.createBackground();
        
        if(idioma==="Ingles"){
            buttonVolverMenu = game.add.button(190,670, 'btn-backMenu', this.volverMenu, this, 0);
            if(ganador==="player1"){
                game.add.text(generalX+55, initialY-12, player.puntuacion,style );
                puntuacionJugador1=game.add.sprite(generalX-70, initialY, "puntuationPlayer1");
                game.add.text(generalX+195, initialY+variacionY-12, player.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador1=game.add.sprite(generalX, initialY+variacionY, "dodgedChandeliersPlayer1");
                game.add.text(generalX+65, (initialY+variacionY*2)-12, player2.puntuacion,style);
                puntuacionJugador2=game.add.sprite(generalX-70, initialY+variacionY*2, "puntuationPlayer2");
                game.add.text(generalX+205, (initialY+variacionY*3)-12,player2.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador2=game.add.sprite(generalX, initialY+variacionY*3, "dodgedChandeliersPlayer2");
                ganador1=game.add.sprite(generalX, initialY+variacionY*4.7, "winnerPlayer1");
                puntuacionJugador2.anchor.x=generalAnchor;
                puntuacionJugador2.anchor.y=generalAnchor;
                candelabrosEsquivadosJugador2.anchor.x=generalAnchor;
                candelabrosEsquivadosJugador2.anchor.y=generalAnchor;
                ganador1.anchor.x=generalAnchor;
                ganador1.anchor.y=generalAnchor;

                
                puntuacionJugador2.scale.x=generalScale;
                puntuacionJugador2.scale.y=generalScale;
                candelabrosEsquivadosJugador2.scale.x=generalScale;
                candelabrosEsquivadosJugador2.scale.y=generalScale;
                ganador1.scale.x=generalScale;
                ganador1.scale.y=generalScale;

                puntuacionJugador2.tint=buttonsColorOut;
                candelabrosEsquivadosJugador2.tint=buttonsColorOut;
                ganador1.tint=buttonsColorOut;

            }else if(ganador==="player2"){
                game.add.text(generalX+55, initialY-12, player.puntuacion,style);
                puntuacionJugador1=game.add.sprite(generalX-70, initialY, "puntuationPlayer1");
                game.add.text(generalX+195, initialY+variacionY-12, player.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador1=game.add.sprite(generalX, initialY+variacionY, "dodgedChandeliersPlayer1");
                game.add.text(generalX+65, (initialY+variacionY*2)-12, player2.puntuacion,style);
                puntuacionJugador2=game.add.sprite(generalX-70, initialY+variacionY*2, "puntuationPlayer2");
                game.add.text(generalX+205, (initialY+variacionY*3)-12,player2.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador2=game.add.sprite(generalX, initialY+variacionY*3, "dodgedChandeliersPlayer2");
                ganador2=game.add.sprite(generalX, initialY+variacionY*4.7, "winnerPlayer2");
                puntuacionJugador2.anchor.x=generalAnchor;
                puntuacionJugador2.anchor.y=generalAnchor;
                candelabrosEsquivadosJugador2.anchor.x=generalAnchor;
                candelabrosEsquivadosJugador2.anchor.y=generalAnchor;
                ganador2.anchor.x=generalAnchor;
                ganador2.anchor.y=generalAnchor;

                
                puntuacionJugador2.scale.x=generalScale;
                puntuacionJugador2.scale.y=generalScale;
                candelabrosEsquivadosJugador2.scale.x=generalScale;
                candelabrosEsquivadosJugador2.scale.y=generalScale;
                ganador2.scale.x=generalScale;
                ganador2.scale.y=generalScale;

                puntuacionJugador2.tint=buttonsColorOut;
                candelabrosEsquivadosJugador2.tint=buttonsColorOut;
                ganador2.tint=buttonsColorOut;

            }else{
                game.add.text(generalX-25, initialY-12,player.puntuacion,style);
                puntuacionJugador1=game.add.sprite(generalX-100, initialY, "puntuation");
                game.add.text(generalX+120, initialY+variacionY-12, player.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador1=game.add.sprite(generalX-30, initialY+variacionY, "dodgedChandeliers");

            }
        }else{
            buttonVolverMenu = game.add.button(150,680, 'btn-volverMenu', this.volverMenu, this, 0);
            if(ganador==="player1"){
                game.add.text(generalX+40, initialY-12, player.puntuacion,style);
                puntuacionJugador1=game.add.sprite(generalX-90, initialY, "puntuacionJugador1");
                game.add.text(generalX+230, initialY+variacionY-12, player.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador1=game.add.sprite(generalX, initialY+variacionY, "candelabrosEsquivadosJugador1");
                game.add.text(generalX+50, (initialY+variacionY*2)-12, player2.puntuacion,style);
                puntuacionJugador2=game.add.sprite(generalX-90, initialY+variacionY*2, "puntuacionJugador2");
                game.add.text(generalX+235, (initialY+variacionY*3)-12, player2.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador2=game.add.sprite(generalX, initialY+variacionY*3, "candelabrosEsquivadosJugador2");
                ganador1=game.add.sprite(generalX, initialY+variacionY*4.7, "ganadorJugador1");
                puntuacionJugador2.anchor.x=generalAnchor;
                puntuacionJugador2.anchor.y=generalAnchor;
                candelabrosEsquivadosJugador2.anchor.x=generalAnchor;
                candelabrosEsquivadosJugador2.anchor.y=generalAnchor;
                ganador1.anchor.x=generalAnchor;
                ganador1.anchor.y=generalAnchor;

                
                puntuacionJugador2.scale.x=generalScale;
                puntuacionJugador2.scale.y=generalScale;
                candelabrosEsquivadosJugador2.scale.x=generalScale;
                candelabrosEsquivadosJugador2.scale.y=generalScale;
                ganador1.scale.x=generalScale;
                ganador1.scale.y=generalScale;

                puntuacionJugador2.tint=buttonsColorOut;
                candelabrosEsquivadosJugador2.tint=buttonsColorOut;
                ganador1.tint=buttonsColorOut;

            }else if(ganador==="player2"){
                game.add.text(generalX+40, initialY-12, player.puntuacion,style);
                puntuacionJugador1=game.add.sprite(generalX-90, initialY, "puntuacionJugador1");
                game.add.text(generalX+230, initialY+variacionY-12, player.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador1=game.add.sprite(generalX, initialY+variacionY, "candelabrosEsquivadosJugador1");
                game.add.text(generalX+50, (initialY+variacionY*2)-12, player2.puntuacion,style);
                puntuacionJugador2=game.add.sprite(generalX-90, initialY+variacionY*2, "puntuacionJugador2");
                game.add.text(generalX+235, (initialY+variacionY*3)-12, player2.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador2=game.add.sprite(generalX, initialY+variacionY*3, "candelabrosEsquivadosJugador2");
                ganador2=game.add.sprite(generalX, initialY+variacionY*4.7, "ganadorJugador2");
                puntuacionJugador2.anchor.x=generalAnchor;
                puntuacionJugador2.anchor.y=generalAnchor;
                candelabrosEsquivadosJugador2.anchor.x=generalAnchor;
                candelabrosEsquivadosJugador2.anchor.y=generalAnchor;
                ganador2.anchor.x=generalAnchor;
                ganador2.anchor.y=generalAnchor;

                
                puntuacionJugador2.scale.x=generalScale;
                puntuacionJugador2.scale.y=generalScale;
                candelabrosEsquivadosJugador2.scale.x=generalScale;
                candelabrosEsquivadosJugador2.scale.y=generalScale;
                ganador2.scale.x=generalScale;
                ganador2.scale.y=generalScale;

                puntuacionJugador2.tint=buttonsColorOut;
                candelabrosEsquivadosJugador2.tint=buttonsColorOut;
                ganador2.tint=buttonsColorOut;

            }else{
                game.add.text(generalX-25, initialY-12, player.puntuacion,style);
                puntuacionJugador1=game.add.sprite(generalX-100, initialY, "puntuacion");
                game.add.text(generalX+170, initialY+variacionY-12,  player.candelabrosEsquivadosTotal,style);
                candelabrosEsquivadosJugador1=game.add.sprite(generalX, initialY+variacionY, "candelabrosEsquivados");
            }
        }
        //Centrado de botones.
        puntuacionJugador1.anchor.x=generalAnchor;
        puntuacionJugador1.anchor.y=generalAnchor;
        candelabrosEsquivadosJugador1.anchor.x=generalAnchor;
        candelabrosEsquivadosJugador1.anchor.y=generalAnchor;
        buttonVolverMenu.anchor.x=generalAnchor;
        buttonVolverMenu.anchor.y=generalAnchor;
        //Escalado de botones.
        puntuacionJugador1.scale.x=generalScale;
        puntuacionJugador1.scale.y=generalScale;
        candelabrosEsquivadosJugador1.scale.x=generalScale;
        candelabrosEsquivadosJugador1.scale.y=generalScale;
        buttonVolverMenu.scale.x = 0.5;
        buttonVolverMenu.scale.y = 0.5;
        //Tintado de botones
        puntuacionJugador1.tint=buttonsColorOut;
        candelabrosEsquivadosJugador1.tint=buttonsColorOut;
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