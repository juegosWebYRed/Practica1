SplendorousGames.gameOverState = function(game) {
}


SplendorousGames.gameOverState.prototype = {

    preload: function () {

    },


    create: function() {
        var generalX=220;
        var initialY=680;

        //Use for sorting
        this.background = this.createBackground();

        buttonVolverMenu = game.add.button(generalX,initialY, 'btn-volverMenu', this.volverMenu, this, 0);
        game.add.text(500, 200, "Puntuacion: "+player.puntuacion);
        game.add.text(500, 300, "Candelabros Esquivados: "+player.candelabrosEsquivadosTotal);
        //Centrado de botones.
        buttonVolverMenu.anchor.x=0.5;
        buttonVolverMenu.anchor.y=0.5;
        //Escalado de botones.
        buttonVolverMenu.scale.x = 0.3;
        buttonVolverMenu.scale.y = 0.3;
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