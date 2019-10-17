SplendorousGames.multiPuntuacion = function(game) {
}
var variablesExtra = 2; //variables extras en memoria (para restar al recorrer los datos en memoria) (var extras -> modo, playerID)
var nPuntuacionesMP;
SplendorousGames.multiPuntuacion.prototype = {

    preload: function () {
        
    },

    create: function() {
        //localStorage.clear(); PARA BORRAR TODAS LAS PUNTUACIONES
        nPuntuacionesMP = this.numeroPuntuacionesMulti();
        var textStyle = {font: "40px Arial", fill: "#ffffff", boundsAlignH: "center"};
        var textStyle2 = {font: "20px Arial", fill: "#ffffff"};
        var wall = game.add.sprite(0, 0, "pared");
        wall.scale.setTo(0.5, 0.3);

        if(localStorage.length == 0){
            game.add.text(430, 300, "SIN PUNTUACIONES", textStyle);
        }
        else{
            game.add.text(335, 60, "MEJORES PUNTUACIONES (2P)", textStyle);
            this.comprobarTablaScores();
            for(var i = 0; i < nPuntuacionesMP; i++){
                if(localStorage.getItem("puntuacionMP" + i.toString()) != null){
                    game.add.text(535, 150 + i * 50, "Puntuacion nº " + (i+1) + ": " + localStorage.getItem("puntuacionMP" + i.toString()), textStyle2);
                }
            }
        }
    },


    update: function() {
        
    },

    comprobarTablaScores: function(){
        if(nPuntuacionesMP <= 10){
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
                aux = parseInt(localStorage.getItem("puntuacionMP" + i.toString())); //puntuacion jugador anterior
                if(aux < parseInt(localStorage.getItem("puntuacionMP" + (i+1).toString()))){
                    localStorage.setItem("puntuacionMP" + i.toString(), localStorage.getItem("puntuacionMP" + (i+1).toString()));
                    localStorage.setItem("puntuacionMP" + (i+1).toString(), JSON.stringify(aux));
                }
            }
        }
    },
    comprobarInsercion: function(){
        //Si el elemento que queremos comprobar es mayor que el ultimo elemento de la tabla de puntuaciones se inserta el elemento nuevo y se borra el ultimo
        if(parseInt(localStorage.getItem("puntuacionMP" + localStorage.getItem("playerID_MP"))) > parseInt(localStorage.getItem("puntuacionMP" + JSON.stringify(9)))){
            localStorage.setItem("puntuacionMP" + JSON.stringify(9), localStorage.getItem("puntuacionMP" + localStorage.getItem("playerID")));//Nuevo elemento añadido
            localStorage.removeItem("puntuacionMP" + localStorage.getItem("playerID_MP"));//Eliminacion del elemento sobrante
            return true;
        }else{
            localStorage.removeItem("puntuacionMP" + localStorage.getItem("playerID_MP"));//es menor que el último, así que se borra
            return false;
        }
    },
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