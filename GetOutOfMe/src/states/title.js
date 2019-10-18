SplendorousGames.titleState = function(game) {
}
var title;
var variablesExtra = 2; //variables extras en memoria (para restar al recorrer los datos en memoria) (var extras -> modo, playerID)
var nPuntuacionesSP;
SplendorousGames.titleState.prototype = {

    preload: function () {
        
    },

    create: function() {
        //localStorage.clear(); PARA BORRAR TODAS LAS PUNTUACIONES
        nPuntuacionesSP = this.numeroPuntuacionesSimple();
        var textStyle = {font: "40px Arial", fill: "#ffffff", boundsAlignH: "center"};
        var textStyle2 = {font: "20px Arial", fill: "#ffffff"};
        var wall = game.add.sprite(0, 0, "pared");
        wall.scale.setTo(0.5, 0.3);

        //Botón de volver
        botonVolver = game.add.button(200, 650, 'btn-volver', this.volver, this, 0);
        botonVolver.anchor.x=0.5;
        botonVolver.anchor.y=0.5;
        botonVolver.scale.x = 0.6;
        botonVolver.scale.y = 0.6;
        botonVolver.tint=buttonsColorOut;
        this.changeButtonsColors(botonVolver);

        if(localStorage.length == 0){
            game.add.text(430, 300, "SIN PUNTUACIONES", textStyle);
        }
        else{
            game.add.text(335, 60, "MEJORES PUNTUACIONES (1P)", textStyle);
            this.comprobarTablaScores();
            for(var i = 0; i < nPuntuacionesSP; i++){
                if(localStorage.getItem("puntuacionSP" + i.toString()) != null){
                    game.add.text(535, 150 + i * 50, "Puntuacion nº " + (i+1) + ": " + localStorage.getItem("puntuacionSP" + i.toString()), textStyle2);
                } 
            }
        }
    },


    update: function() {
        
    },

    comprobarTablaScores: function(){
        if(nPuntuacionesSP <= 10){
            this.ordenarTabla();
        }
        else{
            if(this.comprobarInsercion()){
                this.ordenarTabla();
            }
        }
    },
    ordenarTabla: function(){
        var aux;
        for(var j = 0; j < localStorage.length - variablesExtra; j++){
            for(var i = 0; i < localStorage.length - variablesExtra; i++){
                aux = parseInt(localStorage.getItem("puntuacionSP" + i.toString())); //puntuacion jugador anterior
                if(aux < parseInt(localStorage.getItem("puntuacionSP" + (i+1).toString()))){
                    localStorage.setItem("puntuacionSP" + i.toString(), localStorage.getItem("puntuacionSP" + (i+1).toString()));
                    localStorage.setItem("puntuacionSP" + (i+1).toString(), JSON.stringify(aux));
                }
            }
        }
    },
    comprobarInsercion: function(){
        //Si el elemento que queremos comprobar es mayor que el ultimo elemento de la tabla de puntuaciones se inserta el elemento nuevo y se borra el ultimo
        if(parseInt(localStorage.getItem("puntuacionSP" + localStorage.getItem("playerID"))) > parseInt(localStorage.getItem("puntuacionSP" + JSON.stringify(9)))){
            localStorage.setItem("puntuacionSP" + JSON.stringify(9), localStorage.getItem("puntuacionSP" + localStorage.getItem("playerID")));//Nuevo elemento añadido
            localStorage.removeItem("puntuacionSP" + localStorage.getItem("playerID"));//Eliminacion del elemento sobrante
            return true;
        }else{
            localStorage.removeItem("puntuacionSP" + localStorage.getItem("playerID"));//es menor que el último, así que se borra
            return false;
        }
    },
    numeroPuntuacionesSimple: function(){
        var cont = 0;
        for(var i = 0; i < localStorage.length; i++){
            if(localStorage.getItem("puntuacionSP" + i.toString()) != null){
                cont++;
            } 
        }
        return cont;
    },
    volver: function(){
        game.state.start('menu');
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
}