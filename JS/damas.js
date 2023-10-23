const imagenes = document.getElementsByTagName("img")
const boton = document.getElementById("nuevaPartida")

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




// Actualiza el tablero a la posición inicial de las fichas
let fichasIniciales = () => {
    for (const imagen of imagenes) {
        if(imagen.src == "/img/negra.png"){
            const [ ,fila, columna] = imagen.id.split("_")
            tablero[fila][columna] = NEGRAS
        }else if(imagen.src == "/img/blanca.png"){
            const [ ,fila, columna] = imagen.id.split("_")
            tablero[fila][columna] = BLANCAS
        }
    }
}
// Cambia el turno actual
let cambiarTurno = () => {
    if(turnoJugador == JUGADOR1){
        turnoJugador = JUGADOR2
        turno.innerText = "Jugador 1 / Blancas"
    }else{
        turnoJugador = JUGADOR1
        turno.innerText = "Jugador 2 / Negras"
    }
}
let moverFicha = () => {

}
let seleccionarFicha = event => {
    const [, fila, columna] = event.target.id.split("_")
    console.log(event.target.id.split("_"))
    console.log(tablero[fila][columna])
    if (tablero[fila][columna] === NEGRAS || tablero[fila][columna] === BLANCAS){
        console.log(event.target.parentElement)
        event.target.parentElement.style.border = "red 3px solid"
    }
}
let nuevoJuego = () => {
    fichasIniciales()
}








fichasIniciales()
for (const imagen of imagenes) {
    if(imagen.src != "/img/vacio.png"){
        imagen.onclick = seleccionarFicha
    }
    
}
boton.onclick = nuevoJuego
