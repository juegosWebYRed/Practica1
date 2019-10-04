SplendorousGames.singleState = function(game) {
}

var player;
var jumpTimer = 0;
var cursors;
var jumpCount;
var jumpCount2;
var platforms;
var proyectiles = [];
var timerProyectilCercaJugador;
var timerProyectilIzquierdo;
var timerProyectilDerecho;
var timerProyectilHorizontal;
var gravedad=1000;

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
        player.body.gravity.y = gravedad;
        player.body.maxVelocity.y = 500;

		

        //animaciones
        player.animations.add('left', [7, 6, 5, 4], 10, true);
		player.animations.add('idleleft', [4], 1, true);
        player.animations.add('idleright', [1], 1, true);
        player.animations.add('right', [0, 1, 2, 3], 10, true);
    
		//Proyectiles
		var randTimer = game.rnd.integerInRange(1000,5000);

		timerProyectilCercaJugador = game.time.create(false);

        timerProyectilCercaJugador.loop(randTimer,this.generarProyectilCercaJugador,this)
        
        timerProyectilCercaJugador.start();
        
        var randTimerIzquierdo = game.rnd.integerInRange(1000,5000);

		timerProyectilIzquierdo = game.time.create(false);

        timerProyectilIzquierdo.loop(randTimerIzquierdo,this.generarProyectilIzquierdo,this)
        
        timerProyectilIzquierdo.start();
        
        var randTimerDerecho= game.rnd.integerInRange(1000,5000);

		timerProyectilDerecho = game.time.create(false);

        timerProyectilDerecho.loop(randTimerDerecho,this.generarProyectilDerecho,this)
        
        timerProyectilDerecho.start();
        
        var randTimerHorizontal= game.rnd.integerInRange(1000,5000);

		timerProyectilHorizontal = game.time.create(false);

        timerProyectilHorizontal.loop(randTimerHorizontal,this.generarProyectilHorizontal,this)
        
		timerProyectilHorizontal.start();
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
        for(var i =0;i<proyectiles.length;i++){
		    if(proyectiles[i].sprite.body!=null && proyectiles[i].sprite.body.onFloor() && proyectiles[i].tipo=="Vertical"){
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite.body!=null && proyectiles[i].sprite.body.x>=1190 && proyectiles[i].tipo=="Horizontal"){
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite!=null && game.physics.arcade.overlap(player,proyectiles[i].sprite)){
                    i=this.destruirProyectil(i);
            }
        }

        cursors.up.onDown.add(jump);
    },
    
    generarProyectilCercaJugador:function(){
        var proyectil = new Object();
        proyectil.tipo="Vertical";
        proyectil.gravedadX=0;
        proyectil.gravedadY=gravedad;
        var randAparicion = game.rnd.integerInRange(-100,100);
        var posCercaJugador=player.body.x+randAparicion;
        proyectil.posX=posCercaJugador;
        proyectil.posY=0;
        
		var randTimer = game.rnd.integerInRange(1000,5000);
		timerProyectilCercaJugador.delay=randTimer;
        this.generarProyectil(proyectil);
    },

    generarProyectilIzquierdo:function(){
        var proyectil = new Object();
        proyectil.tipo="Vertical";
        proyectil.gravedadX=0;
        proyectil.gravedadY=gravedad;
        var randAparicion = game.rnd.integerInRange(0,640);
        proyectil.posX=randAparicion;
        proyectil.posY=0;
        
		var randTimer = game.rnd.integerInRange(1000,5000);
		timerProyectilIzquierdo.delay=randTimer;
        this.generarProyectil(proyectil);
    },
    generarProyectilDerecho:function(){
        var proyectil = new Object();
        proyectil.tipo="Vertical";
        proyectil.gravedadX=0;
        proyectil.gravedadY=gravedad;

        var randAparicion = game.rnd.integerInRange(640,1080);
        proyectil.posX=randAparicion;
        proyectil.posY=0;
        
		var randTimer = game.rnd.integerInRange(1000,5000);
		timerProyectilDerecho.delay=randTimer;
        this.generarProyectil(proyectil);
    },
    generarProyectilHorizontal:function(){
        var proyectil = new Object();
        proyectil.tipo="Horizontal";
        proyectil.gravedadX=gravedad;
        proyectil.gravedadY=0;
        proyectil.posX=0;
        proyectil.posY=player.body.y;

		var randTimer = game.rnd.integerInRange(1000,5000);
		timerProyectilHorizontal.delay=randTimer;
        this.generarProyectil(proyectil);
    },

	generarProyectil:function(proyectil){
        proyectil.sprite = game.add.sprite(proyectil.posX, proyectil.posY, 'proyectil');

        game.physics.enable(proyectil.sprite, Phaser.Physics.ARCADE);
            
        proyectil.sprite.body.collideWorldBounds = true;
        proyectil.sprite.body.gravity.x = proyectil.gravedadX;
        proyectil.sprite.body.gravity.y = proyectil.gravedadY;

        proyectiles.push(proyectil);
        
    },
    
	destruirProyectil:function(pos){
        proyectiles[pos].sprite.destroy();
        proyectiles.splice(pos,1);

        return pos--;
	}
}
