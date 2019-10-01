SplendorousGames.singleState = function(game) {
}

var player;
var jumpTimer = 0;
var cursors;
var jumpCount;
var jumpCount2;
var platforms;
var proyectil;
var timerProyectil;


// Funciones necesarias para implementar el doble salto
function jump1() {
    player.body.velocity.y = -700;
    jumpCount++;
}

function jump2() {
    if (jumpCount === 1) {
        player.body.velocity.y = -700;
        jumpCount++;
    }
}

function jump() {
    if (player.body.onFloor() || player.body.velocity.y === 0) {
        jump1();
    }else if (!player.body.onFloor()) {
        jump2();
    }
}

SplendorousGames.singleState.prototype = {

   
    preload: function () {

    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);


        //JUGADOR 1
        player = game.add.sprite(100, 450, 'personaje');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;

		

        //animaciones
        player.animations.add('left', [7, 6, 5, 4], 10, true);
		player.animations.add('idleleft', [4], 1, true);
        player.animations.add('idleright', [1], 1, true);
        player.animations.add('right', [0, 1, 2, 3], 10, true);
    
		//Proyectil
		var randTimer = game.rnd.integerInRange(1000,5000);
		timerProyectil = game.time.create(false);

		timerProyectil.loop(randTimer,this.generarProyectil,this);

		timerProyectil.start();

        //Plataformas

        platforms = game.add.group();
        
        platforms.enableBody = true;
        
        game.physics.enable(platforms, Phaser.Physics.ARCADE);

        p1 = platforms.create(600, 400, 'ground');
        p2 = platforms.create(50, 250, 'ground');
        p3 = platforms.create(750, 100, 'ground');

        p1.body.collideWorldBounds = true;
        p1.body.immovable = true;

        p2.body.collideWorldBounds = true;
        p2.body.immovable = true;

        p3.body.collideWorldBounds = true;
        p3.body.immovable = true;


        

        //Controles

        cursors = game.input.keyboard.createCursorKeys();
        one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

        
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        


        //Otras propiedades del jugador
        player.jumpCount = 0;
        player.facing = 'left';
        player.slow = false;
        player.sprint = false;

},

    update: function () {
        game.physics.arcade.collide(player, platforms);

        player.body.velocity.x = 0;
		
        if (cursors.left.isDown) {           
                player.body.velocity.x = -200;
            if (player.facing != 'left') {
                player.animations.play('left');
                player.facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
                player.body.velocity.x = 200;
            if (player.facing != 'right') {
                player.animations.play('right');
                player.facing = 'right';
            }
        }
        else {
				if(player.facing === 'left'){
					player.animations.play('idleleft');
				}else if(player.facing === 'right'){
					player.animations.play('idleright');
				}
                player.facing = 'idle';
        }
        if (player.body.onFloor() || player.body.velocity.y === 0) {
            jumpCount = 0;
        }
		if(proyectil != null){
			game.physics.arcade.overlap(player,proyectil,this.destruirProyectil,null,this);
		}
		if(proyectil!=null && proyectil.body.onFloor()){
			this.destruirProyectil();
		}

        cursors.up.onDown.add(jump);
    },
	
	generarProyectil:function(){
	
		var randProyectilAparicion = game.rnd.integerInRange(-100,100);
		var randTimer = game.rnd.integerInRange(1000,5000);
        proyectil = game.add.sprite(player.body.x+randProyectilAparicion, 0, 'proyectil');
		console.log(randProyectilAparicion);
        game.physics.enable(proyectil, Phaser.Physics.ARCADE);
        proyectil.body.collideWorldBounds = true;
        proyectil.body.gravity.y = 1000;
		timerProyectil.delay=randTimer;
	},
	destruirProyectil:function(){
		proyectil.destroy();
		proyectil=null;
	}
}
