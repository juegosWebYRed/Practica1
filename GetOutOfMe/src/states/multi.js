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

//número de variables extras en memoria (para restar al recorrer los datos en memoria)
var variablesExtra = 2;
//número de puntuaciones del modo multiplayer
var nPuntuacionesMP;

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

        nPuntuacionesMP = this.numeroPuntuacionesMulti();

        //Reinicio vidas
        nFrameHeartPlayer1 = 0;
        nFrameHeartPlayer2 = 0;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Inicializar memoria (localStorage)
        this.inicializarMemoria();

        //MÚSICA
        musicIntro.stop();
        musicLevel = game.add.audio('levelSong');
        damageSound = game.add.audio('damage');
        jumpSound = game.add.audio('jumpSound');
        candleSound = game.add.audio('candleSound');
        game.sound.setDecodedCallback(musicLevel, this.start, this);

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
        //Suelo del nivel será de una forma u otra dependiendo del nivel que juguemos.
        if(reglasNivel.sueloNivel==="lava"){
                levelGround = game.add.sprite(640, 655, reglasNivel.sueloNivel);
            levelGround.anchor.setTo(0.5);
                levelGround.scale.setTo(0.4, 0.4);
                levelGround.animations.add('animacionLava', [0, 1, 2], true);
            levelGround.animations.play('animacionLava',4,true);
        }else{
                levelGround = game.add.sprite(640, 265, reglasNivel.sueloNivel);
                levelGround.anchor.setTo(0.5);
                levelGround.scale.setTo(0.37, 0.37);
        }

        //JUGADOR 1
        //Asignación de variables al jugador 1.
        player = game.add.sprite(reglasNivel.jugadoresPosX[0], reglasNivel.jugadoresPosY[0], 'personaje');
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
		//Animaciones del jugador
        player.animations.add('left', [7, 6, 5, 4], 10, true);
		player.animations.add('idleleft', [4], 1, true);
        player.animations.add('idleright', [1], 1, true);
        player.animations.add('right', [0, 1, 2, 3], 10, true);
    
	
		//JUGADOR 2
        //Asignación de variables al jugador 2.
		player2 = game.add.sprite(reglasNivel.jugadoresPosX[1], reglasNivel.jugadoresPosY[1], 'personaje2');
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

        //animaciones
        player2.animations.add('left', [7, 6, 5, 4], 10, true);
		player2.animations.add('idleleft', [4], 1, true);
        player2.animations.add('idleright', [1], 1, true);
        player2.animations.add('right', [0, 1, 2, 3], 10, true);

        //Fantasmas
        //Creación de los fantasmas.
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
        //Creación de las plataformas.
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
        //A cada proyectil le asignamos un timer distinto para que no salgan todos al mismo tiempo.
        this.timerProyectiles();


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

    start: function(){
        musicLevel.play();
    },

    update: function () {
        game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(player2, platforms);
        //Movimiento de los fantasmas
        if(reglasNivel.phantoms===true){
            for(var i = 0; i < phantoms.length; i++){
                if(phantoms[i].body.blocked.right){
                    jumpSound.play();
                    phantoms[i].animations.play('patrullarIzq', 6, true);
                    phantoms[i].body.velocity.x = -reglasNivel.velPhantoms[i];
                }
                if(phantoms[i].body.blocked.left){
                    jumpSound.play();
                    phantoms[i].animations.play('patrullarDer', 6, true);
                    phantoms[i].body.velocity.x = reglasNivel.velPhantoms[i];
                }
                //El fantasma inflinge daño al contactar con el jugador y le proporciona unos segundos de invulnerabilidad.
                if(game.physics.arcade.overlap(player,phantoms[i])&&player.invulnerabilidad<=0){
                    damageSound.play();
                    player.vida-=1;
                    this.actualizarSpriteVida(1);
                    player.invulnerabilidad=100;
                    if(player.vida <= 0){
                        //Guardar puntuación
                        localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                        localStorage.setItem("playerID_MP", JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) + 1));
                        this.comprobarTablaScores();
                        //Cambiar estado muerte
                        proyectiles = [];
                        phantoms = [];
                        plataformas = [];
                        ganador="player2"
                        game.state.start("gameOver");
                    }
                }
                //El fantasma inflinge daño al contactar con el jugador y le proporciona unos segundos de invulnerabilidad.
                if(game.physics.arcade.overlap(player2,phantoms[i])&&player2.invulnerabilidad<=0){
                    damageSound.play();
                    player2.vida-=1;
                    this.actualizarSpriteVida(2);
                    player2.invulnerabilidad=100;
                    if(player2.vida <= 0){ 
                        //Guardar puntuación
                        localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                        localStorage.setItem("playerID_MP", JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) + 1));
                        this.comprobarTablaScores();
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
            //Movimiento de las plataformas.
            if(plataformas[i].movility && plataformas[i].body.blocked.right || plataformas[i].movility && plataformas[i].body.blocked.left){
                reglasNivel.velPlataforms[i]=-reglasNivel.velPlataforms[i];
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

        //La lava daña al juagdor y le proporciona invulnerabilidad durante unos segundos.
        if(reglasNivel.sueloNivel==="lava" && player.body.onFloor() && player.invulnerabilidad<=0){
            damageSound.play();
            player.vida -= reglasNivel.damageLava;
            player.invulnerabilidad=100;
            this.actualizarSpriteVida(1);
            if(player.vida <= 0){
                //Guardar puntuación
                localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                localStorage.setItem("playerID_MP", JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) + 1));
                this.comprobarTablaScores();
                //Cambiar estado muerte
                proyectiles = [];
                phantoms = [];
                plataformas = [];
                ganador="player2"
                game.state.start("gameOver");
            }
        }
        //La lava daña al juagdor y le proporciona invulnerabilidad durante unos segundos.
        if(reglasNivel.sueloNivel==="lava" && player2.body.onFloor() && player2.invulnerabilidad<=0){
            damageSound.play();
            player2.vida -= reglasNivel.damageLava;
            player2.invulnerabilidad=100;
            this.actualizarSpriteVida(2);
            if(player2.vida <= 0){
                //Guardar puntuación
                localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                localStorage.setItem("playerID_MP", JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) + 1));
                this.comprobarTablaScores();
                //Cambiar estado muerte
                proyectiles = [];
                phantoms = [];
                plataformas = [];
                ganador="player1"
                game.state.start("gameOver");
            }
        }
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
                    }
                    if(player2.candelabrosEsquivados-acumulacionCandelabrosPlayer2===10){
                        acumulacionCandelabrosPlayer2=player2.candelabrosEsquivados;
                    }
                }
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite.body!=null && (proyectiles[i].sprite.body.blocked.right || proyectiles[i].sprite.body.blocked.left) && proyectiles[i].tipo=="Horizontal"){
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite!=null && game.physics.arcade.overlap(player,proyectiles[i].sprite) && player.invulnerabilidad<=0){
                    //El proyectil le inflinge daño al jugador y le proporciona unos segundos de invulnerabilidad.
                    damageSound.play();
                    player.vida -= proyectiles[i].damage;
                    player.invulnerabilidad=100;
                    this.actualizarSpriteVida(1);
                    //Se corta la racha de candelabros esquivados.
                    if(proyectiles[i].imagen==='candelabro'){
                        player.candelabrosEsquivados=0;
                        acumulacionCandelabrosPlayer1=0;
                    }
                    player2.candelabrosEsquivados++;
                    player2.candelabrosEsquivadosTotal++;
                    i=this.destruirProyectil(i);
                    if(player.vida <= 0){
                        //Guardar puntuación
                        localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                        localStorage.setItem("playerID_MP", JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) + 1));
                        this.comprobarTablaScores();
                        //Cambiar estado muerte
                        proyectiles = [];
                        phantoms = [];
                        plataformas = [];
                        ganador="player2"
                        game.state.start("gameOver");
                    }
            }else if(proyectiles[i].sprite!=null && game.physics.arcade.overlap(player2,proyectiles[i].sprite) && player2.invulnerabilidad<=0){
                //El proyectil le inflinge daño al jugador y le proporciona unos segundos de invulnerabilidad.
                damageSound.play();
                player2.vida -= proyectiles[i].damage;
                player2.invulnerabilidad=100;
                this.actualizarSpriteVida(2);
                //Se corta la racha de candelabros esquivados.
                if(proyectiles[i].imagen==='candelabro'){
                    player2.candelabrosEsquivados=0;
                    acumulacionCandelabrosPlayer2=0;
                }
                player.candelabrosEsquivados++;
                player.candelabrosEsquivadosTotal++;
                i=this.destruirProyectil(i);
                if(player2.vida <= 0){
                    //Guardar puntuación
                    localStorage.setItem("puntuacionMP" + localStorage.getItem("playerID_MP").toString(), JSON.stringify(player.puntuacion + 1));
                    localStorage.setItem("playerID_MP", JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) + 1));
                    this.comprobarTablaScores();
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
            player.tint = 0xff0000;
            player.invulnerabilidad-=1;
        }else{
			player.tint = 0xFFFFFF;
		}
        if(player2.invulnerabilidad>0){
            player2.tint = 0xff0000;
            player2.invulnerabilidad-=1;
        }else{
			player2.tint = 0xFFFFFF;
		}
        player.puntuacion++;
        player2.puntuacion++;

    },

    timerProyectiles:function(){
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
        if(proyectil.imagen == 'candelabro'){
            candleSound.play();
        }
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
    //Inicialización de variables necesarias en memoria para el guardado de puntuaciones en la misma
    inicializarMemoria: function(){
        if(localStorage.getItem("playerID_MP") == null){
            localStorage.setItem("playerID_MP", JSON.stringify(0));
        }
    },
    //Mira si la tabla está llena en cuyo caso se comprueba su inserción o si no lo está (solo haría falta ordenarla con el nuevo elemento)
    comprobarTablaScores: function(){
        if(nPuntuacionesMP < 10){
            this.ordenarTabla();
        }
        else{
            if(this.comprobarInsercion()){
                this.ordenarTabla();
            }
        }
    },
    //Para ordenar la tabla con las puntuaciones de mayor a menor
    ordenarTabla: function(){
        var aux;
        for(var j = 0; j < localStorage.length - variablesExtra; j++){
            for(var i = 0; i < localStorage.length - variablesExtra; i++){
                aux = parseInt(localStorage.getItem("puntuacionMP" + i.toString())); //puntuacion jugador anterior
                if(aux < parseInt(localStorage.getItem("puntuacionMP" + (i+1).toString()))){
                    localStorage.setItem("puntuacionMP" + i.toString(), localStorage.getItem("puntuacionMP" + (i+1).toString()));
                    localStorage.setItem("puntuacionMP" + (i+1).toString(), JSON.stringify(aux));
                }
            }
        }
    },
    //Si hay 10 puntuaciones en la tabla comprueba si la nueva se va a insertar o no
    comprobarInsercion: function(){
        //Si el elemento que queremos comprobar es mayor que el ultimo elemento de la tabla de puntuaciones se inserta el elemento nuevo y se borra el ultimo
        if(parseInt(localStorage.getItem("puntuacionMP" + JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) - 1))) > parseInt(localStorage.getItem("puntuacionMP" + JSON.stringify(9)))){
            localStorage.setItem("puntuacionMP" + JSON.stringify(9), localStorage.getItem("puntuacionMP" + JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) - 1)));//Nuevo elemento añadido
            localStorage.removeItem("puntuacionMP" + JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) - 1));//Eliminacion del elemento sobrante
            return true;
        }else{
            localStorage.removeItem("puntuacionMP" + JSON.stringify(parseInt(localStorage.getItem("playerID_MP")) - 1));//es menor que el último, así que se borra
            return false;
        }
    },
    //Cálculo del número de puntuaciones de las almacenadas en memoria que pertenecen al modo "multiplayer"
    numeroPuntuacionesMulti: function(){
        var cont = 0;
        for(var i = 0; i < localStorage.length; i++){
            if(localStorage.getItem("puntuacionMP" + i.toString()) != null){
                cont++;
            } 
        }
        return cont;
    },
}
