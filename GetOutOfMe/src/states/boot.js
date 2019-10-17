var SplendorousGames = {}

SplendorousGames.bootState = function(game) {

}
var style = { fill: "#f0e800", align: "center" };

SplendorousGames.bootState.prototype = {

    preload: function() {
        game.physics.startSystem(Phaser.Physics.P2);
		game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		game.scale.setResizeCallback(this.gameResized, this);
		game.scale.pageAlignVertically = true;
		game.scale.pageAlignHorizontally = true;
    },


    create: function () {
        this.state.start('preload');
		

    },

    update: function() {

    },


	/*
	Funci�n para reescalar encontrada en el foro html5gamedevs en el post del usuario Smrdis en el siguiente hilo: https://www.html5gamedevs.com/topic/11636-scaling-my-game/
	*/
	gameResized: function(){
		var scale = Math.min(window.innerWidth / this.game.width, window.innerHeight / this.game.height);
		game.scale.setUserScale(scale, scale, 0, 0);
	}
}