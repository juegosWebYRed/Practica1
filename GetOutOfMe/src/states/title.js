SplendorousGames.titleState = function(game) {
}


//Buttons
var buttonsColorOut=0xf0e800;
var buttonsColorOver=0xb01000;

SplendorousGames.titleState.prototype = {

    preload: function () {

    },


    create: function() {
        var generalX=640;
        var initialY=500;
        //Use for sorting
        this.background = this.createBackground();

        buttonJugar = game.add.button(generalX,initialY, 'btn-jugar', this.menuState, this, 0);
        //Centrado de botones.
        buttonJugar.anchor.x=0.5;
        buttonJugar.anchor.y=0.5;
        //Escalado de botones.
        buttonJugar.scale.x = 0.2;
        buttonJugar.scale.y = 0.2;
        //Tintado de botones
        buttonJugar.tint=buttonsColorOut;
    },

    createBackground: function()
    {
        var background = game.add.sprite(0, 0, "menuBackground");
        
        //Placement
        background.scale.setTo(0.4, 0.4);

        return background;
    },

    menuState: function(){
        game.state.start("menu");
    },

    update: function() {
        this.changeButtonsColors(buttonJugar);
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


}