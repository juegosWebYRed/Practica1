SplendorousGames.multiState = function(game) {
}

var player;
var jumpTimer = 0;
var cursors;
var jumpCount;
var jumpCount2;
var platforms;

//Variables jugador 2
var player2;
var jumpTimer2 = 0;
var p2jumpCount;
var p2jumpCount2;

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

function p2jump1() {
    player2.body.velocity.y = -700;
    p2jumpCount++;
}

function p2jump2() {
    if (p2jumpCount === 1) {
        player2.body.velocity.y = -700;
        p2jumpCount++;
    }
}

function p2jump() {
    if (player2.body.onFloor() || player2.body.velocity.y === 0) {
        p2jump1();
    }else if (!player2.body.onFloor()) {
        p2jump2();
    }
}

SplendorousGames.multiState.prototype = {

   
    preload: function () {

    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //JUGADOR 1
        player = game.add.sprite(500, 450, 'personaje');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;

        //animaciones
        player.animations.add('left', [7, 6, 5, 4], 10, true);
		player.animations.add('idleleft', [4], 1, true);
        player.animations.add('idleright', [1], 1, true);
        player.animations.add('right', [0, 1, 2, 3], 10, true);
    
	
		//JUGADOR 2

		player2 = game.add.sprite(100, 450, 'personaje');
        game.physics.enable(player2, Phaser.Physics.ARCADE);
        player2.body.collideWorldBounds = true;
        player2.body.gravity.y = 1000;
        player2.body.maxVelocity.y = 500;

        //animaciones
        player2.animations.add('left', [7, 6, 5, 4], 10, true);
		player2.animations.add('idleleft', [4], 1, true);
        player2.animations.add('idleright', [1], 1, true);
        player2.animations.add('right', [0, 1, 2, 3], 10, true);

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

		w = game.input.keyboard.addKey(Phaser.Keyboard.W);
		a = game.input.keyboard.addKey(Phaser.Keyboard.A);
		s = game.input.keyboard.addKey(Phaser.Keyboard.S);
		d = game.input.keyboard.addKey(Phaser.Keyboard.D);

        

        //Otras propiedades del jugador
        player.jumpCount = 0;
        player.facing = 'left';

		player2.jumpCount = 0;
        player2.facing = 'left';

},

    update: function () {
        game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(player2, platforms);

        
      
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
			player.body.velocity.x = 0;
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
        cursors.up.onDown.add(jump);

		if (a.isDown) {           
                player2.body.velocity.x = -200;
            if (player2.facing != 'left') {
                player2.animations.play('left');
                player2.facing = 'left';
            }
        }
        else if (d.isDown) {
                player2.body.velocity.x = 200;
            if (player2.facing != 'right') {
                player2.animations.play('right');
                player2.facing = 'right';
            }
        }
        else {
			player2.body.velocity.x = 0;
				if(player2.facing === 'left'){
					player2.animations.play('idleleft');
				}else if(player2.facing === 'right'){
					player2.animations.play('idleright');
				}
                player2.facing = 'idle';
        }
        if (player2.body.onFloor() || player2.body.velocity.y === 0) {
            p2jumpCount = 0;
        }
        w.onDown.add(p2jump);

    }      
}
