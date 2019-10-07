SplendorousGames.singleState = function(game) {
}

var player;
var phantom1;
var phantom2;
var levelGround;
var levelGroundInvisible = true; //var booleana para cuando desparezca el suelo
var jumpTimer = 0;
var cursors;
var jumpCount;
var jumpCount2;
var proyectiles = [];
var phantoms = [];
var plataformas = [];
var timerProyectilCercaJugador;
var timerProyectilIzquierdo;
var timerProyectilDerecho;
var timerProyectilHorizontal;
var gravedad=1000;
var xvelFantasma1 = 100;
var xvelFantasma2 = 120;
var xVelPlatform = 200;
var vidasRestantes;


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

        //ESCENARIO
        //---Pared---
        var wall = game.add.sprite(0, 0, 'pared');
        wall.scale.setTo(0.5, 0.27);
        //---Muebles---
        var furniture = game.add.sprite(150, 0, 'muebles');
        furniture.scale.setTo(0.7, 0.68);
        //---Suelo---
        //Para que el jugador camine "encima" del suelo y no en el extremo inferior
        game.world.setBounds(0, 0, 1280, 665);
        levelGround = game.add.sprite(640, 265, 'sueloNivel');
        levelGround.anchor.setTo(0.5);
        levelGround.scale.setTo(0.37, 0.37);
        

        //Botón de pantalla completa
        var fullscreen_boton = game.add.button(1240, 680, 'fullscreen', this.fullscreen, this, 1, 0, 0);
        fullscreen_boton.scale.setTo(0.5, 0.5);

        //JUGADOR 1
        player = game.add.sprite(100, 450, 'personaje');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = gravedad;
        player.body.maxVelocity.y = 500;
        player.vida = 3;

        //Vidas restantes
        vidasRestantes = game.add.text(50, 30, "Vida: " + player.vida);

		//Animaciones del jugador
        player.animations.add('left', [7, 6, 5, 4], 10, true);
		player.animations.add('idleleft', [4], 1, true);
        player.animations.add('idleright', [1], 1, true);
        player.animations.add('right', [0, 1, 2, 3], 10, true);

        //Fantasmas
        phantom1 = game.add.sprite(25, 350, 'fantasma');
        phantom2 = game.add.sprite(900, 150, 'fantasma');
        game.physics.enable(phantom1, Phaser.Physics.ARCADE);
        phantom1.body.collideWorldBounds = true;
        game.physics.enable(phantom2, Phaser.Physics.ARCADE);
        phantom2.body.collideWorldBounds = true;

        //Animaciones de los fantasmas
        phantom1.animations.add('patrullarDer', [0, 1, 2], true);
        phantom1.animations.add('patrullarIzq', [5, 4, 3], true);
        phantom2.animations.add('patrullarDer', [0, 1, 2], true);
        phantom2.animations.add('patrullarIzq', [5, 4, 3], true);
        phantom1.body.velocity.x = xvelFantasma1;
        phantom2.body.velocity.x = -xvelFantasma2;
        phantom1.animations.play('patrullarDer', 6, true);
        phantom2.animations.play('patrullarIzq', 6, true);

        phantoms.push(phantom1, phantom2);

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

        p1 = platforms.create(600, 450, 'ground');
        p2 = platforms.create(50, 250, 'ground');
        //p3 = platforms.create(750, 150, 'ground');

        p1.body.collideWorldBounds = true;
        p1.body.velocity.x = xVelPlatform;
        p1.body.immovable = true;
        p1.movility = true;

        p2.body.collideWorldBounds = true;
        p2.body.immovable = true;
        p2.movility = false;

        plataformas.push(p1, p2);

        /*p3.body.collideWorldBounds = true;
        p3.body.immovable = true;*/


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
        //Movimiento de los fantasmas
        for(var i = 0; i < phantoms.length; i++){
            if(phantoms[i].body.blocked.right){
                phantoms[i].animations.play('patrullarIzq', 6, true);
                phantoms[i].body.velocity.x = -xvelFantasma1;
            }
            if(phantoms[i].body.blocked.left){
                phantoms[i].animations.play('patrullarDer', 6, true);
                phantoms[i].body.velocity.x = xvelFantasma1;
            }
            if(game.physics.arcade.overlap(player,phantoms[i])){
                //var muerte = game.add.text(200, 200, "HAS MUERTO");
            }
        }

        //Movimiento de las plataformas
        for(var i = 0; i < plataformas.length; i++){
            if(plataformas[i].movility && plataformas[i].body.blocked.right){
                plataformas[i].body.velocity.x = -xVelPlatform;
            }
            if(plataformas[i].movility && plataformas[i].body.blocked.left){
                plataformas[i].body.velocity.x = xVelPlatform;
            }
            /*if(game.physics.arcade.overlap(player,phantoms[i])){
                //var muerte = game.add.text(200, 200, "HAS MUERTO");
            }*/
        }

        /*
        if(phantom1.body.blocked.right){
            phantom1.animations.play('patrullarIzq', 6, true);
            phantom1.body.velocity.x = -xvelFantasma1;
        }
        if(phantom1.body.blocked.left){
            phantom1.animations.play('patrullarDer', 6, true);
            phantom1.body.velocity.x = xvelFantasma1;
        }
        if(phantom2.body.blocked.right){
            phantom2.animations.play('patrullarIzq', 6, true);
            phantom2.body.velocity.x = -xvelFantasma2;
        }
        if(phantom2.body.blocked.left){
            phantom2.animations.play('patrullarDer', 6, true);
            phantom2.body.velocity.x = xvelFantasma2;
        }*/

        //Floor is lava (el suelo desaparece para siempre en la partida)
        var key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE); //Pulsar 1 para que desaparezca (solo para probar)
        if(levelGroundInvisible && key1.isDown){
            levelGround.destroy();
            this.game.world.setBounds(0, 0, 1280, 720);
        }
        
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
            }else if(proyectiles[i].sprite.body!=null && proyectiles[i].sprite.body.x + game.cache.getImage("candelabro").width>=1280 && proyectiles[i].tipo=="Horizontal"){
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite!=null && game.physics.arcade.overlap(player,proyectiles[i].sprite)){
                    player.vida -= proyectiles[i].damage;
                    vidasRestantes.destroy();
                    vidasRestantes = game.add.text(50, 30, "Vida: "+player.vida);
                    i=this.destruirProyectil(i);
                    if(player.vida <= 0){
                        //Cambiar estado muerte
                    }
            }
        }

        cursors.up.onDown.add(jump);
    },
    
    generarProyectilCercaJugador:function(){
        var proyectil = new Object();
        proyectil.tipo="Vertical";
        proyectil.imagen = 'candelabro';
        proyectil.damage = 1;
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
        proyectil.imagen = 'candelabro';
        proyectil.gravedadX=0;
        proyectil.gravedadY=gravedad;
        proyectil.damage = 1;
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
        proyectil.damage = 1;
        proyectil.imagen = 'candelabro';

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
        proyectil.imagen='silla';
        proyectil.gravedadX=gravedad;
        proyectil.gravedadY=0;
        proyectil.damage = 1;
        proyectil.posX=0;
        proyectil.posY=600;

		var randTimer = game.rnd.integerInRange(1000,5000);
		timerProyectilHorizontal.delay=randTimer;
        this.generarProyectil(proyectil);
    },

	generarProyectil:function(proyectil){
        proyectil.sprite = game.add.sprite(proyectil.posX, proyectil.posY, proyectil.imagen);
        game.physics.enable(proyectil.sprite, Phaser.Physics.ARCADE);
            
        proyectil.sprite.body.collideWorldBounds = true;
        proyectil.sprite.body.velocity.x = proyectil.gravedadX;
        proyectil.sprite.body.gravity.y = proyectil.gravedadY;

        proyectiles.push(proyectil);
        
    },
    
	destruirProyectil:function(pos){
        proyectiles[pos].sprite.destroy();
        proyectiles.splice(pos,1);

        return pos--;
    },
    
    fullscreen: function() {
        if (game.scale.isFullScreen)
        {
            //game.world.setBounds(0, 0, 1280, 665);
            game.scale.stopFullScreen();
            
        }
        else
        {
            game.scale.startFullScreen(false);
        }

    },
}
