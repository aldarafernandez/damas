const imagenes = document.getElementsByTagName("img");
const boton = document.getElementById("nuevaPartida");


const BLANCAS = 1;
const NEGRAS = 2;
const VACIO = 0;

const JUGADOR1 = 1;
const JUGADOR2 = 2;

let turnoJugador = JUGADOR1;
let turno = document.getElementById("turnoJugador");
// variables que gurdan la posición de la ficha seleccionada y a donde se mueve
let idFichaSeleccionada = "";
let idDestino = "";
// variable que cuenta el número de movimientos de una ficha en su turno, para el caso de comer fichas
let movimientos = 0;

// Posiciones iniciales de las fichas
let tableroInicial = [
    [VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2],
    [JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO],
    [VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO],
    [VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1],
    [JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO]
]; 
// Tablero con las posiciones iniciales de la fichas que cambia a medida que se mueven
let tablero = [
    [VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2],
    [JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO],
    [VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO],
    [VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1],
    [JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO]
]; 


// Actualiza el tablero a la posición actual de las fichas
let fichasTablero = () => {
    for (const imagen of imagenes) {
        const [ ,fil, col] = imagen.id.split("_");
        let fila = +fil;
        let columna = +col;
        if(imagen.src.includes("negra")){ 
            tablero[fila][columna] = NEGRAS;
        }else if(imagen.src.includes("blanca")){
            tablero[fila][columna] = BLANCAS;
        }else if(imagen.src.includes("vacio")){
            tablero[fila][columna] = VACIO;
        };
    };
};
// Cambia el turno actual
let cambiarTurno = () => {
    if(turnoJugador === JUGADOR1){
        turnoJugador = JUGADOR2;
        turno.innerText = "Jugador 2 / Negras";
        idDestino = "";
        idFichaSeleccionada = "";
        movimientos = 0;
    }else if(turnoJugador === JUGADOR2){
        turnoJugador = JUGADOR1;
        turno.innerText = "Jugador 1 / Blancas";
        idDestino = "";
        idFichaSeleccionada = "";
        movimientos = 0;
    };
};
// mueve la ficha a la posición seleccionada
let moverFicha = (posicionOriginal, nuevaPosicion) => {
    let celdaInicial = document.getElementById(posicionOriginal);
    let celdaVacia = document.getElementById(nuevaPosicion);

    celdaVacia.removeAttribute("src");
    celdaVacia.setAttribute("src", celdaInicial.src);
    celdaInicial.src = "/img/vacio.png";
    celdaInicial.parentElement.style.removeProperty("border");
    fichasTablero();
    comprobarGanador();
    // si el movimiento anterior fue comer una ficha (movimientos valdrá 1) y tiene más para comer (hay una ficha de color contrario delante)
    //comerá las fichas de manera automática
    if(movimientos > 0){
        const[ , fil, col] = celdaVacia.id.split("_");
        let fila = +fil;
        let columna = +col;
        if(celdaVacia.getAttribute("src").includes("blanca")){
            if(tablero[fila-1][columna] === JUGADOR2 && tablero[fila-2][columna] === VACIO){
                let destino = "img_" + (fila-2) + "_" + columna;
                document.getElementById("img_" + (fila-1) + "_" + columna).removeAttribute("src");
                document.getElementById("img_" + (fila-1) + "_" + columna).setAttribute("src", "/img/vacio.png");
                moverFicha(nuevaPosicion, destino);
            };
        }else if(celdaVacia.getAttribute("src").includes("negra")){
            if(tablero[fila+1][columna] === JUGADOR1 && tablero[fila+2][columna] === VACIO){
                let destino = "img_" + (fila+2) + "_" + columna;
                document.getElementById("img_" + (fila+1) + "_" + columna).removeAttribute("src");
                document.getElementById("img_" + (fila+1) + "_" + columna).setAttribute("src", "/img/vacio.png");
                moverFicha(nuevaPosicion, destino);
            };
        };
    };
    cambiarTurno();
    
};
// selecciona la ficha a mover y la posición a la que se mueve comprobando que sea un movimiento válido
let seleccionar = event => {
    
    let seleccionada;
    let destino;
    if (idFichaSeleccionada === ""){
        seleccionada = document.getElementById(event.target.id);
        let ficha = seleccionada.getAttribute("src");
        if (turnoJugador === JUGADOR1){
            if (ficha.includes("blanca")){
                idFichaSeleccionada = seleccionada.id;
                event.target.parentElement.style.border = "3px solid red";
            };
        }else {
            if (ficha.includes("negra")){
                idFichaSeleccionada = seleccionada.id;
                event.target.parentElement.style.border = "3px solid red";
            };
        };
    }else if(idDestino === ""){
        destino = document.getElementById(event.target.id);
        let ficha = destino.getAttribute("src");
        const[ , fil, col] = idFichaSeleccionada.split("_");
        let fila = +fil;
        let columna = +col;
        if(document.getElementById(idFichaSeleccionada).getAttribute("src").includes("blanca")){
            if ((destino.id === "img_"+(fila-1)+"_"+columna) || (destino.id === "img_"+(fila-1)+"_"+(columna+1)) || (destino.id === "img_"+(fila-1)+"_"+(columna-1))) {
                if (ficha.includes("vacio")){
                    idDestino = destino.id;
                };
            }else if(destino.id === "img_"+(fila-2)+"_"+columna){
                if(turnoJugador === JUGADOR1){
                    if(document.getElementById("img_"+(fila-1)+"_"+columna).getAttribute("src").includes("negra") && ficha.includes("vacio")){
                        document.getElementById("img_"+(fila-1)+"_"+columna).setAttribute("src", "/img/vacio.png");
                        idDestino = destino.id;
                        movimientos++;
                    };
                };   
            };
        }else if(document.getElementById(idFichaSeleccionada).getAttribute("src").includes("negra")){
            if ((destino.id === "img_"+(fila+1)+"_"+columna) || (destino.id === "img_"+(fila+1)+"_"+(columna+1)) || (destino.id === "img_"+(fila+1)+"_"+(columna-1))) {
                if (ficha.includes("vacio")){
                    idDestino = destino.id;
                };
            }else if(destino.id === "img_"+(fila+2)+"_"+columna){
                if(turnoJugador === JUGADOR2){
                    if(document.getElementById("img_"+(fila+1)+"_"+columna).getAttribute("src").includes("blanca") && ficha.includes("vacio")){
                        document.getElementById("img_"+(fila+1)+"_"+columna).setAttribute("src", "/img/vacio.png");
                        idDestino = destino.id;
                        movimientos++;
                    };
                }; 
            };
        };
    };
    
    if (idFichaSeleccionada !== "" && idDestino !== ""){
        moverFicha(idFichaSeleccionada, idDestino);
    };
};
// Comprueba el ganador mirando si no queda ninguna ficha de su color
let comprobarGanador = () => {
    let fichasBlancas = 0;
    let fichasNegras = 0;
    for (const imagen of imagenes) {
        let fichaimagen = imagen.getAttribute("src");
        if(fichaimagen.includes("blanca")){
            fichasBlancas++;
        }else if(fichaimagen.includes("negra")){
            fichasNegras++;
        };
    };

    if (fichasBlancas === 0){
        window.alert("Gana el Jugador 2/Negras");
        nuevoJuego();
    }else if (fichasNegras === 0){
        window.alert("Gana el Jugador 1/Blancas");
        nuevoJuego();
    };
};
// reinicia el juego  
let nuevoJuego = () => {
    tablero = tableroInicial
    for (const imagen of imagenes) {
        const [ ,fil, col] = imagen.id.split("_");
        imagen.parentElement.style.border="";
        let fila = +fil;
        let columna = +col;
        if (tablero[fila][columna] === 1){
            imagen.removeAttribute("src");
            imagen.setAttribute("src", "/img/blanca.png");
        }else if(tablero[fila][columna] === 2){
            imagen.removeAttribute("src");
            imagen.setAttribute("src", "/img/negra.png");
        }else if(tablero[fila][columna] === 0){
            imagen.removeAttribute("src");
            imagen.setAttribute("src", "/img/vacio.png");
        };
    };
    turno.innerText = "Jugador 1 / Blancas";
    idDestino = "";
    idFichaSeleccionada = "";
}



turno.innerText = "Jugador 1 / Blancas";
for (const imagen of imagenes) {
    imagen.onclick = seleccionar;  
};
boton.onclick = nuevoJuego;
