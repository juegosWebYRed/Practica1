SplendorousGames.multiState = function(game) {
}
//Globales
var timerProyectilCercaJugador;
var timerProyectilIzquierdo;
var timerProyectilDerecho;
var timerProyectilHorizontal;
var gravedad=1000;
var proyectiles = [];
var phantoms = [];
var plataformas = [];
var ganador;

//Variables jugador 1
var player;
var jumpTimer = 0;
var cursors;
var jumpCount;
var jumpCount2;
var heartPlayer1;
var nFrameHeartPlayer1;
var acumulacionCandelabrosPlayer1=0;


//Variables jugador 2
var player2;
var jumpTimer2 = 0;
var p2jumpCount;
var p2jumpCount2;
var heartPlayer2;
var nFrameHeartPlayer2;
var acumulacionCandelabrosPlayer2=0;
var velSilla = 550;

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

        //Reinicio vidas
       
        nFrameHeartPlayer1 = 0;
        nFrameHeartPlayer2 = 0;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Inicializar memoria (localStorage)
        this.inicializarMemoria();        

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
        player = game.add.sprite(500, 450, 'personaje');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;
        player.vida = 3;
        player.invulnerabilidad=0;
        player.puntuacion=0;
        player.candelabrosEsquivados=0;
        player.candelabrosEsquivadosTotal=0;
	acumulacionCandelabrosPlayer1=0;

        //Vidas restantes
        heartPlayer1 = game.add.sprite(20, 10, 'vidas');
        //Candelabros esquivados
        rachaCandelabrosPlayer1=game.add.text(50, 60, "x"+player.candelabrosEsquivados);
		//Animaciones del jugador
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
        player2.vida = 3;
        player2.invulnerabilidad=0;
        player2.puntuacion=0;
        player2.candelabrosEsquivados=0;
        player2.candelabrosEsquivadosTotal=0;
	acumulacionCandelabrosPlayer2=0;

        //Vidas restantes
        heartPlayer2 = game.add.sprite(1150, 10, 'vidas');
        //Candelabros esquivados
        rachaCandelabrosPlayer2=game.add.text(1150, 60, "x"+player2.candelabrosEsquivados);

        //animaciones
        player2.animations.add('left', [7, 6, 5, 4], 10, true);
		player2.animations.add('idleleft', [4], 1, true);
        player2.animations.add('idleright', [1], 1, true);
        player2.animations.add('right', [0, 1, 2, 3], 10, true);

        if(reglasNivel.phantoms===true){
            for(var i=0;i<reglasNivel.numPhantoms;i++){
                //Fantasmas
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

                plataform = platforms.create(reglasNivel.posPlataformsX[i], reglasNivel.posPlataformsY[i], 'plataforma');

                plataform.body.collideWorldBounds = true;
                plataform.body.velocity.x = reglasNivel.velPlataforms[i];
                plataform.body.immovable = true;
                plataform.movility = true;


                plataformas.push(plataform);
            }
        }
        
        //Proyectiles
		var randTimerPlayer1 = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilCercaJugador1 = game.time.create(false);

        timerProyectilCercaJugador1.loop(randTimerPlayer1,this.generarProyectilCercaJugador1,this)
        
        timerProyectilCercaJugador1.start();

		var randTimerPlayer2 = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilCercaJugador2 = game.time.create(false);

        timerProyectilCercaJugador2.loop(randTimerPlayer2,this.generarProyectilCercaJugador2,this)
        
        timerProyectilCercaJugador2.start();
        
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
                    this.actualizarSpriteVida(1);
                    player.invulnerabilidad=100;
                    if(player.vida <= 0){
                        //Guardar puntuación
                        localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                        //Cambiar estado muerte
                        proyectiles = [];
                        phantoms = [];
                        plataformas = [];
                        ganador="player2"
                        game.state.start("gameOver");
                    }
                }
                if(game.physics.arcade.overlap(player2,phantoms[i])&&player2.invulnerabilidad<=0){
                    player2.vida-=1;
                    this.actualizarSpriteVida(2);
                    player2.invulnerabilidad=100;
                    if(player2.vida <= 0){
                        //Guardar puntuación
                        localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                        //Cambiar estado muerte
                        proyectiles = [];
                        phantoms = [];
                        plataformas = [];
                        ganador="player1"
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
        
      
        if (cursors.left.isDown) {           
                player.body.velocity.x = -500;
            if (player.facing != 'left') {
                player.animations.play('left');
                player.facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
                player.body.velocity.x = 500;
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
                player2.body.velocity.x = -500;
            if (player2.facing != 'left') {
                player2.animations.play('left');
                player2.facing = 'left';
            }
        }
        else if (d.isDown) {
                player2.body.velocity.x = 500;
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

        for(var i =0;i<proyectiles.length;i++){
		    if(proyectiles[i].sprite.body!=null && proyectiles[i].sprite.body.onFloor() && proyectiles[i].tipo=="Vertical"){
                //En el caso de que se esquive un candelabro se sumara a candelabros esquivados y la racha que se lleve de candelabros esquivados.
                if(proyectiles[i].imagen==='candelabro'){
                    player.candelabrosEsquivados++;
                    player.candelabrosEsquivadosTotal++;
                    player2.candelabrosEsquivados++;
                    player2.candelabrosEsquivadosTotal++;
                    if(player.candelabrosEsquivados-acumulacionCandelabrosPlayer1===10){
                        acumulacionCandelabrosPlayer1=player.candelabrosEsquivados;
                        rachaCandelabrosPlayer1.destroy();
                        rachaCandelabrosPlayer1=game.add.text(50, 60, "x"+acumulacionCandelabrosPlayer1);
                    }
                    if(player2.candelabrosEsquivados-acumulacionCandelabrosPlayer2===10){
                        acumulacionCandelabrosPlayer2=player2.candelabrosEsquivados;
                        rachaCandelabrosPlayer2.destroy();
                        rachaCandelabrosPlayer2=game.add.text(1150, 60, "x"+acumulacionCandelabrosPlayer2);
                    }
                }
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite.body!=null && proyectiles[i].sprite.body.blocked.right && proyectiles[i].tipo=="Horizontal"){
                //En el caso de que se esquive un candelabro se sumara a candelabros esquivados y la racha que se lleve de candelabros esquivados.
                if(proyectiles[i].imagen==='candelabro'){
                    player.candelabrosEsquivados++;
                    player.candelabrosEsquivadosTotal++;
                    player2.candelabrosEsquivados++;
                    player2.candelabrosEsquivadosTotal++;
                    if(player.candelabrosEsquivados-acumulacionCandelabrosPlayer1===10){
                        acumulacionCandelabrosPlayer1=player.candelabrosEsquivados;
                        rachaCandelabros1.destroy();
                        rachaCandelabros1=game.add.text(50, 60, "x"+acumulacionCandelabrosPlayer1);
                    }
                    if(player2.candelabrosEsquivados-acumulacionCandelabrosPlayer2===10){
                        acumulacionCandelabrosPlayer2=player2.candelabrosEsquivados;
                        rachaCandelabros2.destroy();
                        rachaCandelabros2=game.add.text(1150, 60, "x"+acumulacionCandelabrosPlayer2);
                    }
                }
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite!=null && game.physics.arcade.overlap(player,proyectiles[i].sprite) && player.invulnerabilidad<=0){
                    player.vida -= proyectiles[i].damage;
                    player.invulnerabilidad=100;
                    this.actualizarSpriteVida(1);
                    //Se corta la racha de candelabros esquivados.
                    if(proyectiles[i].imagen==='candelabro'){
                        player.candelabrosEsquivados=0;
                        acumulacionCandelabrosPlayer1=0;
                        rachaCandelabrosPlayer1.destroy();
                        rachaCandelabrosPlayer1=game.add.text(1150, 60, "x"+acumulacionCandelabrosPlayer1);
                    }
                    player2.candelabrosEsquivados++;
                    player2.candelabrosEsquivadosTotal++;
                    i=this.destruirProyectil(i);
                    if(player.vida <= 0){
                        //Guardar puntuación
                        localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                        //Cambiar estado muerte
                        proyectiles = [];
                        phantoms = [];
                        plataformas = [];
                        ganador="player2"
                        game.state.start("gameOver");
                    }
            }else if(proyectiles[i].sprite!=null && game.physics.arcade.overlap(player2,proyectiles[i].sprite) && player2.invulnerabilidad<=0){
                player2.vida -= proyectiles[i].damage;
                player2.invulnerabilidad=100;
                this.actualizarSpriteVida(2);
                //Se corta la racha de candelabros esquivados.
                if(proyectiles[i].imagen==='candelabro'){
                    player2.candelabrosEsquivados=0;
                    acumulacionCandelabrosPlayer2=0;
                    rachaCandelabrosPlayer2.destroy();
                    rachaCandelabrosPlayer2=game.add.text(1150, 60, "x"+acumulacionCandelabrosPlayer2);
                }
                player.candelabrosEsquivados++;
                player.candelabrosEsquivadosTotal++;
                i=this.destruirProyectil(i);
                if(player2.vida <= 0){
                    //Guardar puntuación
                    localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                    //Cambiar estado muerte
                    proyectiles = [];
                    phantoms = [];
                    plataformas = [];
                    ganador="player1"
                    game.state.start("gameOver");
                }
            }
        }
        if(player.invulnerabilidad>0){
            player.invulnerabilidad-=1;
        }
        if(player2.invulnerabilidad>0){
            player2.invulnerabilidad-=1;
        }
        player.puntuacion++;
        player2.puntuacion++;

    },

    generarProyectilCercaJugador1:function(){
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
		timerProyectilCercaJugador1.delay=randTimer;
        this.generarProyectil(proyectil);
    },

    generarProyectilCercaJugador2:function(){
        var proyectil = new Object();
        proyectil.tipo="Vertical";
        proyectil.imagen = 'candelabro';
        proyectil.damage = 1;
        proyectil.gravedadX=0;
        proyectil.gravedadY=gravedad;
        var randAparicion = game.rnd.integerInRange(-100,100);
        var posCercaJugador=player2.body.x+randAparicion;
        proyectil.posX=posCercaJugador;
        proyectil.posY=0;
        
		var Timer = reglasNivel.frecuenciaDeAparicion;
		timerProyectilCercaJugador2.delay=Timer;
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
        
		var Timer = reglasNivel.frecuenciaDeAparicion;
		timerProyectilIzquierdo.delay=Timer;
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
        
		var Timer = reglasNivel.frecuenciaDeAparicion;
		timerProyectilDerecho.delay=Timer;
        this.generarProyectil(proyectil);
    },
    generarProyectilHorizontal:function(){
        var proyectil = new Object();
        proyectil.tipo="Horizontal";
        proyectil.imagen='silla';
	if(game.rnd.integerInRange(0,100)<50){
		proyectil.gravedadX=velSilla;
		proyectil.posX=0;
		}else{
		proyectil.gravedadX=-velSilla;
		proyectil.posX=1200;
		}   
        proyectil.gravedadY=0;
        proyectil.damage = 1;
        proyectil.posX=0;
	if(game.rnd.integerInRange(0,100)<50){    
        proyectil.posY=reglasNivel.sillaPosY[0];
        }else{
        proyectil.posY=reglasNivel.sillaPosY[1];
        }

		var Timer = reglasNivel.frecuenciaDeAparicion;
		timerProyectilHorizontal.delay=Timer;
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

    actualizarSpriteVida: function(nPlayer){
        if(nPlayer == 1){
            nFrameHeartPlayer1++;
            heartPlayer1.frame = nFrameHeartPlayer1;
        }
        if(nPlayer == 2){
            nFrameHeartPlayer2++;
            heartPlayer2.frame = nFrameHeartPlayer2;
        }
    },

    inicializarMemoria: function(){
        if(localStorage.getItem("playerID_MP") == null){
            localStorage.setItem("playerID_MP", JSON.stringify(0));
        }
        else{
            localStorage.setItem("playerID_MP", JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) + 1));
        }
    }
}
