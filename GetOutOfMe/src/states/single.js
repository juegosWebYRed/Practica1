SplendorousGames.singleState = function(game) {
}

var player;
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
var vidasRestantes;
var acumulacionCandelabros=0;

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
        var wall = game.add.sprite(0, 0, reglasNivel.pared);
        wall.scale.setTo(0.5, 0.27);
        //---Muebles---
        var furniture = game.add.sprite(0, 0, reglasNivel.muebles);
        furniture.scale.setTo(reglasNivel.scaleX, reglasNivel.scaleY);
        //---Suelo---
        //Para que el jugador camine "encima" del suelo y no en el extremo inferior
        game.world.setBounds(0, 0, 1280, 665);
        levelGround = game.add.sprite(640, 265, reglasNivel.sueloNivel);
        levelGround.anchor.setTo(0.5);
        levelGround.scale.setTo(0.37, 0.37);
        

        //JUGADOR 1
        player = game.add.sprite(100, 450, 'personaje');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = gravedad;
        player.body.maxVelocity.y = 500;
        player.vida = 3;
        player.invulnerabilidad=0;
        player.puntuacion=0;
        player.candelabrosEsquivados=0;
        player.candelabrosEsquivadosTotal=0;

        //Vidas restantes
        vidasRestantes = game.add.text(50, 30, "Vida: " + player.vida);
        //Candelabros esquivados
        rachaCandelabros=game.add.text(1200, 30, "x"+player.candelabrosEsquivados);
		//Animaciones del jugador
        player.animations.add('left', [7, 6, 5, 4], 10, true);
		player.animations.add('idleleft', [4], 1, true);
        player.animations.add('idleright', [1], 1, true);
        player.animations.add('right', [0, 1, 2, 3], 10, true);

        //Fantasmas
        if(reglasNivel.phantoms===true){
            for(var i=0;i<reglasNivel.numPhantoms;i++){
                phantom = game.add.sprite(reglasNivel.posPhantomsX[i], reglasNivel.posPhantomsY[i], 'fantasma');
                game.physics.enable(phantom, Phaser.Physics.ARCADE);
                phantom.body.collideWorldBounds = true;

                //Animaciones de los fantasmas
                phantom.animations.add('patrullarDer', [0, 1, 2], true);
                phantom.animations.add('patrullarIzq', [5, 4, 3], true);
                phantom.body.velocity.x = reglasNivel.velPhantoms[i];
                phantom.animations.play('patrullarDer', 6, true);

                phantoms.push(phantom);
            }
        }

        //Plataformas
        platforms = game.add.group();
        
        platforms.enableBody = true;
        
        game.physics.enable(platforms, Phaser.Physics.ARCADE);

        if(reglasNivel.plataforms===true){
            for(var i=0;i<reglasNivel.numPlataforms;i++){

                plataform = platforms.create(reglasNivel.posPlataformsX[i], reglasNivel.posPlataformsY[i], reglasNivel.imagenPlataformas[i]);

                plataform.body.collideWorldBounds = true;
                plataform.body.velocity.x = reglasNivel.velPlataforms[i];
                plataform.body.immovable = true;
                plataform.movility = true;


                plataformas.push(plataform);
            }
        }

		//Proyectiles
		var randTimer = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilCercaJugador = game.time.create(false);

        timerProyectilCercaJugador.loop(randTimer,this.generarProyectilCercaJugador,this)
        
        timerProyectilCercaJugador.start();
        
        var randTimerIzquierdo = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilIzquierdo = game.time.create(false);

        timerProyectilIzquierdo.loop(randTimerIzquierdo,this.generarProyectilIzquierdo,this)
        
        timerProyectilIzquierdo.start();
        
        var randTimerDerecho= game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilDerecho = game.time.create(false);

        timerProyectilDerecho.loop(randTimerDerecho,this.generarProyectilDerecho,this)
        
        timerProyectilDerecho.start();
        
        var randTimerHorizontal= game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilHorizontal = game.time.create(false);

        timerProyectilHorizontal.loop(randTimerHorizontal,this.generarProyectilHorizontal,this)
        
        timerProyectilHorizontal.start();


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
        if(reglasNivel.phantoms===true){
            for(var i = 0; i < phantoms.length; i++){
                if(phantoms[i].body.blocked.right){
                    phantoms[i].animations.play('patrullarIzq', 6, true);
                    phantoms[i].body.velocity.x = -reglasNivel.velPhantoms[i];
                }
                if(phantoms[i].body.blocked.left){
                    phantoms[i].animations.play('patrullarDer', 6, true);
                    phantoms[i].body.velocity.x = reglasNivel.velPhantoms[i];
                }
                if(game.physics.arcade.overlap(player,phantoms[i])&&player.invulnerabilidad<=0){
                    player.vida-=1;
                    vidasRestantes.destroy();
                    vidasRestantes = game.add.text(50, 30, "Vida: "+player.vida);
                    player.invulnerabilidad=100;
                    if(player.vida <= 0){
                        //Cambiar estado muerte
                        proyectiles = [];
                        phantoms = [];
                        plataformas = [];
                        game.state.start("gameOver");
                    }
                }
            }
        }

        //Movimiento de las plataformas
        for(var i = 0; i < plataformas.length; i++){
            if(plataformas[i].movility && plataformas[i].body.blocked.right){
                plataformas[i].body.velocity.x = -reglasNivel.velPlataforms[i];
            }
            if(plataformas[i].movility && plataformas[i].body.blocked.left){
                plataformas[i].body.velocity.x = reglasNivel.velPlataforms[i];
            }
        }


        //Floor is lava (el suelo desaparece para siempre en la partida)
        var key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE); //Pulsar 1 para que desaparezca (solo para probar)
        if(levelGroundInvisible && key1.isDown){
            levelGround.destroy();
            this.game.world.setBounds(0, 0, 1280, 720);
        }
        
        game.physics.arcade.collide(player, platforms);

        player.body.velocity.x = 0;
		
        if (cursors.left.isDown) {           
                player.body.velocity.x = -400;
            if (player.facing != 'left') {
                player.animations.play('left');
                player.facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
                player.body.velocity.x = 400;
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
        cursors.up.onDown.add(jump);

        for(var i =0;i<proyectiles.length;i++){
		    if(proyectiles[i].sprite.body!=null && proyectiles[i].sprite.body.onFloor() && proyectiles[i].tipo=="Vertical"){
                //En el caso de que se esquive un candelabro se sumara a candelabros esquivados y la racha que se lleve de candelabros esquivados.
                if(proyectiles[i].imagen==='candelabro'){
                    player.candelabrosEsquivados++;
                    player.candelabrosEsquivadosTotal++;
                    if(player.candelabrosEsquivados-acumulacionCandelabros===10){
                        acumulacionCandelabros=player.candelabrosEsquivados;
                        rachaCandelabros.destroy();
                        rachaCandelabros=game.add.text(1200, 30, "x"+acumulacionCandelabros);
                    }
                }
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite.body!=null && proyectiles[i].sprite.body.blocked.right && proyectiles[i].tipo=="Horizontal"){
                //En el caso de que se esquive un candelabro se sumara a candelabros esquivados y la racha que se lleve de candelabros esquivados.
                if(proyectiles[i].imagen==='candelabro'){
                    player.candelabrosEsquivados++;
                    player.candelabrosEsquivadosTotal++;
                    if(player.candelabrosEsquivados-acumulacionCandelabros===10){
                        acumulacionCandelabros=player.candelabrosEsquivados;
                        rachaCandelabros.destroy();
                        rachaCandelabros=game.add.text(1200, 30, "x"+acumulacionCandelabros);
                    }
                }
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite!=null && game.physics.arcade.overlap(player,proyectiles[i].sprite) && player.invulnerabilidad<=0){
                    player.vida -= proyectiles[i].damage;
                    player.invulnerabilidad=100;
                    vidasRestantes.destroy();
                    vidasRestantes = game.add.text(50, 30, "Vida: "+player.vida);
                    //Se corta la racha de candelabros esquivados.
                    if(proyectiles[i].imagen==='candelabro'){
                        player.candelabrosEsquivados=0;
                        acumulacionCandelabros=0;
                        rachaCandelabros.destroy();
                        rachaCandelabros=game.add.text(1200, 30, "x"+acumulacionCandelabros);
                    }
                    i=this.destruirProyectil(i);
                    if(player.vida <= 0){
                        //Cambiar estado muerte
                        proyectiles = [];
                        phantoms = [];
                        plataformas = [];
                        game.state.start("gameOver");
                    }
            }
        }
        if(player.invulnerabilidad>0){
            player.invulnerabilidad-=1;
        }
        player.puntuacion++;
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
        
		var randTimer = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);
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
        
		var randTimer = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);
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
        
		var randTimer = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);
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

		var randTimer = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);
		timerProyectilHorizontal.delay=randTimer;
        this.generarProyectil(proyectil);
    },

	generarProyectil:function(proyectil){
        proyectil.sprite = game.add.sprite(proyectil.posX, proyectil.posY, proyectil.imagen);
        proyectil.sprite.scale.setTo(0.7,0.7);
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
}
