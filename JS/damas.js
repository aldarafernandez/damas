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
        idDestino = ""
        idFichaSeleccionada = ""
    }else{
        turnoJugador = JUGADOR1
        turno.innerText = "Jugador 2 / Negras"
        idDestino = ""
        idFichaSeleccionada = ""
    }
}
// mueve la ficha a la posición seleccionada
let moverFicha = (posicionOriginal, nuevaPosicion) => {
    let celdaInicial = document.getElementById(posicionOriginal)
    console.log(celdaInicial)
    let celdaVacia = document.getElementById(nuevaPosicion)
    console.log(celdaVacia)
    celdaVacia.removeAttribute("src")
    celdaVacia.setAttribute("src", celdaInicial.src)
    celdaVacia.src = celdaInicial.src
    celdaInicial.src = "/img/vacio.png"
    celdaInicial.parentElement.style.removeProperty("border")
    celdaVacia.parentElement.style.removeProperty("border")
    cambiarTurno()
}
// selecciona la ficha a mover y la posición a la que se mueve
let seleccionar = event => {
    if (idFichaSeleccionada === ""){
        idFichaSeleccionada = event.target.id
        event.target.parentElement.style.border = "3px solid red"
    }else if(idDestino === ""){
        idDestino = event.target.id
        event.target.parentElement.style.border = "3px solid red"
    }

    if (idFichaSeleccionada !== "" && idDestino !== ""){
        moverFicha(idFichaSeleccionada, idDestino)
    }
}
// reinicia el juego  
let nuevoJuego = () => {
    fichasIniciales()
    turno.innerText = "Jugador 1 / Blancas"
    idDestino = ""
    idFichaSeleccionada = ""
    for (const imagen of imagenes) {
        if(imagen.src !== "/img/vacio.png"){
            imagen.onclick = seleccionar
        }    
    }
    boton.onclick = nuevoJuego
}








fichasIniciales()
turno.innerText = "Jugador 1 / Blancas"
for (const imagen of imagenes) {
    if(imagen.src !== "/img/vacio.png"){
        imagen.onclick = seleccionar
    }    
}
boton.onclick = nuevoJuego
