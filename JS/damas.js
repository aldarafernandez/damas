const imagenes = document.getElementsByTagName("img")
const boton = document.getElementById("nuevaPartida")


const BLANCAS = 1
const NEGRAS = 2
const VACIO = 0

const JUGADOR1 = 1
const JUGADOR2 = 2

let turnoJugador = JUGADOR1
let turno = document.getElementById("turnoJugador")

let idFichaSeleccionada = ""
let idDestino = ""

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
let moverFicha = (posicionOriginal, nuevaPosicion) => {
    let celdaInicial = document.getElementById(posicionOriginal)
    let celdaVacia = document.getElementById(nuevaPosicion)
    celdaVacia.src = celdaInicial.src
    celdaInicial.src = "/img/vacio.png"
    celdaInicial.parentElement.style.border = none 
    celdaVacia.parentElement.style.border = none
}
let seleccionarDestino = event =>{
    idDestino = event.target.id
    event.target.parentElement.style.border = "3px solid red"
}
let seleccionarFicha = event => {
    idFichaSeleccionada = event.target.id
    event.target.parentElement.style.border = "3px solid red"
    for (const imagen of imagenes) {
        if(imagen.src == "/img/vacio.png"){
            imagen.onclick = seleccionarDestino
        }        
    }   
    moverFicha(idFichaSeleccionada, idDestino)
}    
let nuevoJuego = () => {
    fichasIniciales()
    turno.innerText = "Jugador 1 / Blancas"
    for (const imagen of imagenes) {
        if(imagen.src != "/img/vacio.png"){
            imagen.onclick = seleccionarFicha
        }    
    }
    boton.onclick = nuevoJuego
}








fichasIniciales()
turno.innerText = "Jugador 1 / Blancas"
for (const imagen of imagenes) {
    if(imagen.src != "/img/vacio.png"){
        imagen.onclick = seleccionarFicha
    }    
}
boton.onclick = nuevoJuego
