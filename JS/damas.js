const imagenes = document.getElementsByTagName("img")

let turno = document.getElementById("turnoJugador")

const BLANCAS = 1
const NEGRAS = 2
const VACIO = 0

const JUGADOR1 = 1
const JUGADOR2 = 2

let turnoJugador = JUGADOR1

let tablero = [
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO]
] 

let fichasIniciales = () => {
    for (const imagen of imagenes) {
        if(imagen.src == "/img/negra.png"){
            const [ ,fila, columna] = imagen.id.split("_")
            tablero[fila, columna] = NEGRAS
        }else if(imagen.src == "/img/blanca.png"){
            const [ ,fila, columna] = imagen.id.split("_")
            tablero[fila, columna] = BLANCAS
        }
    }
}

let cambiarTurno = () => {
    if(turnoJugador == JUGADOR1){
        turnoJugador = JUGADOR2
        turno.innerText = "Jugador 1 / Blancas"
    }else{
        turnoJugador = JUGADOR1
        turno.innerText = "Jugador 2 / Negras"
    }
}