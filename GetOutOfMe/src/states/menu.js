SplendorousGames.menuState = function(game) {
}


SplendorousGames.menuState.prototype = {

    preload: function () {

    },


    create: function() {
        var generalX=640;
        var initialY=300;
        var variacion=100;
        //Use for sorting
        this.background = this.createBackground();

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


    update: function() {
        this.changeButtonsColors(buttonSingleplayer);
        this.changeButtonsColors(buttonMultiplayer);
        this.changeButtonsColors(buttonOnline);
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
    singlePlayer: function(){
        game.state.start("single");
    },
    multiPlayer: function(){
        game.state.start("multi");
    },
    online: function(){
        game.state.start("online");
    }
}