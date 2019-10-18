SplendorousGames.singleState = function(game) {
}

var player;
var levelGround;
var heart;
var nFrameHeart;
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
var acumulacionCandelabros=0;
var tpuntuacion;
var timerRacha;
var racha;
var boton_izq;
var boton_dcha;
var touchRight;
var touchLeft;
var saltar;
var velSilla=550;

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

function onTap(pointer, doubleTap) {

    if (doubleTap)
		{
			jump();
			touchRight = false;
			touchLeft = false;
		}
}

SplendorousGames.singleState.prototype = {

   
    preload: function () {

    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Inicializar memoria (localStorage)
        this.inicializarMemoria();
        
        //Reinicio vidas
        nFrameHeart = 0;
        
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
        player.body.gravity.y = gravedad;
        player.body.maxVelocity.y = 500;
        player.vida = 3;
        player.invulnerabilidad=0;
        player.puntuacion=0;
        player.candelabrosEsquivados=0;
        player.candelabrosEsquivadosTotal=0;
	    acumulacionCandelabros=0;

        //Vidas restantes
        heart = game.add.sprite(20, 10, 'vidas');
        //Candelabros esquivados
        rachaCandelabros=game.add.text(1200, 30, "x"+player.candelabrosEsquivados,style);
		//Animaciones del jugador
        player.animations.add('left', [7, 6, 5, 4], 10, true);
		player.animations.add('idleleft', [4], 1, true);
        player.animations.add('idleright', [1], 1, true);
        player.animations.add('right', [0, 1, 2, 3], 10, true);

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
        one = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

        
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        


        //Otras propiedades del jugador
        player.jumpCount = 0;
        player.facing = 'left';
        player.slow = false;
        player.sprint = false;

        if(idioma==="Ingles"){
            //Texto puntuacion
            puntuacionImagen=game.add.sprite(generalX, 42, "puntuation");
            tpuntuacion = game.add.text(235, 25,player.puntuacion,style);
            racha = game.add.sprite(generalX, 100, "dodgedChandeliersStreak");
        }else{
            //Texto puntuacion
            puntuacionImagen=game.add.sprite(generalX, 35, "puntuacion");
            tpuntuacion = game.add.text(235, 25, player.puntuacion,style);
            racha = game.add.sprite(generalX, 100, "rachaCandelabrosEsquivados");
        }
        //Ajuste de textos.
        puntuacionImagen.anchor.x=0.5;
        puntuacionImagen.anchor.y=0.5;
        racha.anchor.x=0.5;
        racha.anchor.y=0.5;
        //Escalado de textos.
        puntuacionImagen.scale.x=0.4;
        puntuacionImagen.scale.y=0.4;
        racha.scale.x = 0.3;
        racha.scale.y = 0.3;
        //Coloreamos los textos.
        puntuacionImagen.tint=buttonsColorOut;
        racha.tint=buttonsColorOut;

		tpuntuacion.setTextBounds(500, 0, 300, 100);

		touchRight = false;
		touchLeft = false;
		saltar = false;

		boton_izq = game.add.sprite(0,0, 'boton-invisible');
		boton_dcha = game.add.sprite(640,0, 'boton-invisible');

		boton_izq.inputEnabled = true;
		boton_dcha.inputEnabled = true;

		boton_izq.events.onInputDown.add(this.tLeft, this);
		boton_dcha.events.onInputDown.add(this.tRight, this);

		boton_izq.events.onInputUp.add(this.releaseLeft, this);
		boton_dcha.events.onInputUp.add(this.releaseRight, this);

		game.input.justPressedRate = 50;
		game.input.justReleasedRate = 50;


		game.input.onTap.add(onTap, this);
		game.input.onTap.add(onTap, this);

		cursors.up.onDown.add(jump);
    },

    update: function () {

	//var joy = game.vjoy.cursors;
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
                //El fantasma inflinge daño al contactar con el jugador y le proporciona unos segundos de invulnerabilidad.
                if(game.physics.arcade.overlap(player,phantoms[i])&&player.invulnerabilidad<=0){
                    player.vida-=1;
                    this.actualizarSpriteVida();
                    player.invulnerabilidad=100;
                    if(player.vida <= 0){
                        //Guardar puntuación
                        localStorage.setItem("puntuacionSP" + localStorage.getItem("playerID").toString(), JSON.stringify(player.puntuacion + 1));
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
            //Movimiento de las plataformas.
            if(plataformas[i].movility && plataformas[i].body.blocked.right || plataformas[i].movility && plataformas[i].body.blocked.left){
                reglasNivel.velPlataforms[i]=-reglasNivel.velPlataforms[i];
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
		
        if (cursors.left.isDown || touchLeft) {  
				touchRight = false;
                player.body.velocity.x = -500;
            if (player.facing != 'left') {
                player.animations.play('left');
                player.facing = 'left';
            }
        }
        else if (cursors.right.isDown || touchRight) {
				touchLeft = false;
                player.body.velocity.x = 500;
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
        //La lava daña al juagdor y le proporciona invulnerabilidad durante unos segundos.
        if(reglasNivel.sueloNivel==="lava" && player.body.onFloor()&& player.invulnerabilidad<=0){
            player.vida -= reglasNivel.damageLava;
            player.invulnerabilidad=100;
            this.actualizarSpriteVida();
            if(player.vida <= 0){
                //Guardar puntuación
                localStorage.setItem("puntuacionSP" + localStorage.getItem("playerID").toString(), JSON.stringify(player.puntuacion + 1));
                //Cambiar estado muerte
                proyectiles = [];
                phantoms = [];
                plataformas = [];
                game.state.start("gameOver");
            }
        }
        
        for(var i =0;i<proyectiles.length;i++){
		    if(proyectiles[i].sprite.body!=null && proyectiles[i].sprite.body.onFloor() && proyectiles[i].tipo=="Vertical"){
                //En el caso de que se esquive un candelabro se sumara a candelabros esquivados y la racha que se lleve de candelabros esquivados.
                if(proyectiles[i].imagen==='candelabro'){
                    player.candelabrosEsquivados++;
                    player.candelabrosEsquivadosTotal++;
                    acumulacionCandelabros++;
                    //Se muestra en pantalla que el usuario está en racha.
                    if(player.candelabrosEsquivados-acumulacionCandelabros===10){
                        acumulacionCandelabros=player.candelabrosEsquivados;
                        rachaCandelabros.destroy();
                        rachaCandelabros=game.add.text(1200, 30, "x"+acumulacionCandelabros,style);
                    }
                }
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite.body!=null && (proyectiles[i].sprite.body.blocked.right || proyectiles[i].sprite.body.blocked.left) && proyectiles[i].tipo==="Horizontal"){
                i=this.destruirProyectil(i);
            }else if(proyectiles[i].sprite!=null && game.physics.arcade.overlap(player,proyectiles[i].sprite) && player.invulnerabilidad<=0){
                    //El proyectil le inflinge daño al jugador y le proporciona unos segundos de invulnerabilidad.
                    player.vida -= proyectiles[i].damage;
                    player.invulnerabilidad=100;
                    this.actualizarSpriteVida();
                    //Se corta la racha de candelabros esquivados.
                    if(proyectiles[i].imagen==='candelabro'){
                        player.candelabrosEsquivados=0;
                        acumulacionCandelabros=0;
                        rachaCandelabros.destroy();
                        rachaCandelabros=game.add.text(1200, 30, "x"+acumulacionCandelabros,style);
                        racha.destroy();
                    }
                    i=this.destruirProyectil(i);
                    if(player.vida <= 0){
                        //Guardar puntuación
                        localStorage.setItem("puntuacionSP" + localStorage.getItem("playerID").toString(), JSON.stringify(player.puntuacion + 1));
                        //Cambiar estado muerte
                        proyectiles = [];
                        phantoms = [];
                        plataformas = [];
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

        //Racha de candelabros.
		if(acumulacionCandelabros == 10){
            racha.destroy();
            if(idioma==="Ingles"){
                racha = game.add.sprite(generalX, 100, "dodgedChandeliersStreak");
            }else{
                racha = game.add.sprite(generalX, 100, "rachaCandelabrosEsquivados");
            }
            //Ajuste de botones
            racha.anchor.x=0.5;
            racha.anchor.y=0.5;
            //Escalado de botones.
            racha.scale.x = 0.3;
            racha.scale.y = 0.3;
            racha.tint=buttonsColorOut;
			player.puntuacion += 500;
		}

        //Racha de candelabros.
		if(acumulacionCandelabros == 20){
            racha.destroy();
            if(idioma==="Ingles"){
                racha = game.add.sprite(generalX, 100, "dodgedChandeliersStreak");
            }else{
                racha = game.add.sprite(generalX, 100, "rachaCandelabrosEsquivados");
            }
            //Ajuste de botones
            racha.anchor.x=0.5;
            racha.anchor.y=0.5;
            //Escalado de botones.
            racha.scale.x = 0.3;
            racha.scale.y = 0.3;
            racha.tint=buttonsColorOut;
			player.puntuacion += 1000;
		}

        //Racha de candelabros.
		if(acumulacionCandelabros == 50){
            racha.destroy();
            if(idioma==="Ingles"){
                racha = game.add.sprite(generalX, 100, "dodgedChandeliersStreak");
            }else{
                racha = game.add.sprite(generalX, 100, "rachaCandelabrosEsquivados");
            }
            //Ajuste de botones
            racha.anchor.x=0.5;
            racha.anchor.y=0.5;
            //Escalado de botones.
            racha.scale.x = 0.3;
            racha.scale.y = 0.3;
            racha.tint=buttonsColorOut;
			player.puntuacion += 10000;
		}

		if(acumulacionCandelabros == 15 || acumulacionCandelabros == 0 || acumulacionCandelabros == 25 || acumulacionCandelabros == 55){
			racha.destroy();
		}
        player.puntuacion++;
        if(idioma==="Ingles"){
            tpuntuacion.text = player.puntuacion;
        }else{
            tpuntuacion.text = player.puntuacion;
        }
		rachaCandelabros.text = "x" +acumulacionCandelabros;
    },

    timerProyectiles:function(){
		var Timer = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilCercaJugador = game.time.create(false);

        timerProyectilCercaJugador.loop(Timer,this.generarProyectilCercaJugador,this)
        
        timerProyectilCercaJugador.start();
        
        var TimerIzquierdo = game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilIzquierdo = game.time.create(false);

        timerProyectilIzquierdo.loop(TimerIzquierdo,this.generarProyectilIzquierdo,this)
        
        timerProyectilIzquierdo.start();
        
        var TimerDerecho= game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilDerecho = game.time.create(false);

        timerProyectilDerecho.loop(TimerDerecho,this.generarProyectilDerecho,this)
        
        timerProyectilDerecho.start();

		timerRacha = game.time.create(false);

		timerRacha.loop(2000, this.desparecerTexto, this);

		timerRacha.start();

		timerRacha.pause();
        
        var TimerHorizontal= game.rnd.integerInRange(1000,reglasNivel.frecuenciaDeAparicion);

		timerProyectilHorizontal = game.time.create(false);

        timerProyectilHorizontal.loop(TimerHorizontal,this.generarProyectilHorizontal,this)
        
        timerProyectilHorizontal.start();

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
        
		var Timer = reglasNivel.frecuenciaDeAparicion;
		timerProyectilCercaJugador.delay=Timer;
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

    actualizarSpriteVida: function(){
        nFrameHeart++;
        heart.frame = nFrameHeart;
    },

	tRight: function(){
		touchRight = true;
	},

	tLeft: function(){
		touchLeft = true;
	},

	releaseRight: function(){
		touchRight = false;
		saltar = false;
	},

	releaseLeft: function(){
		touchLeft = false;
		saltar = false;
    },
    //Inicialización de variables necesarias en memoria para el guardado de puntuaciones en la misma
    inicializarMemoria: function(){
        if(localStorage.getItem("playerID") == null){
            localStorage.setItem("playerID", JSON.stringify(0));
        }
        else{
            localStorage.setItem("playerID", JSON.stringify(parseInt(localStorage.getItem("playerID")) + 1));
        }
    }
}
