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

// Posiciones iniciales de las fichas
let tableroinicial = [
    [VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2],
    [JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO],
    [VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2, VACIO, JUGADOR2],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO, VACIO],
    [JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO],
    [VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1],
    [JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO, JUGADOR1, VACIO]
] 
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
] 


// Actualiza el tablero a la posición actual de las fichas
let fichasTablero = () => {
    for (const imagen of imagenes) {
        let fichaImagen = imagen.getAttribute("src")
        if(fichaImagen === "/img/negra.png"){
            const [ ,fila, columna] = imagen.id.split("_")
            tablero[fila][columna] = NEGRAS
        }else if(fichaImagen === "/img/blanca.png"){
            const [ ,fila, columna] = imagen.id.split("_")
            tablero[fila][columna] = BLANCAS
        }
    }
}
// Cambia el turno actual
let cambiarTurno = () => {
    if(turnoJugador === JUGADOR1){
        turnoJugador = JUGADOR2
        turno.innerText = "Jugador 2 / Negras"
        idDestino = ""
        idFichaSeleccionada = ""
    }else{
        turnoJugador = JUGADOR1
        turno.innerText = "Jugador 1 / Blancas"
        idDestino = ""
        idFichaSeleccionada = ""
    }
}
// mueve la ficha a la posición seleccionada
let moverFicha = (posicionOriginal, nuevaPosicion) => {
    let celdaInicial = document.getElementById(posicionOriginal)
    let celdaVacia = document.getElementById(nuevaPosicion)
    celdaVacia.removeAttribute("src")
    celdaVacia.setAttribute("src", celdaInicial.src)
    celdaVacia.src = celdaInicial.src
    celdaInicial.src = "/img/vacio.png"
    celdaInicial.parentElement.style.removeProperty("border")
    fichasTablero()
    cambiarTurno()
}
// selecciona la ficha a mover y la posición a la que se mueve
let seleccionar = event => {
    if (idFichaSeleccionada === ""){
        let seleccionada = document.getElementById(event.target.id)
        let ficha = seleccionada.getAttribute("src")
        if (turnoJugador === JUGADOR1){
            if (ficha === "/img/blanca.png"){
                idFichaSeleccionada = event.target.id
                event.target.parentElement.style.border = "3px solid red"
            }
        }else {
            if (ficha === "/img/negra.png"){
                idFichaSeleccionada = event.target.id
                event.target.parentElement.style.border = "3px solid red"
            }
        }
        
    }else if(idDestino === ""){
        let destino = document.getElementById(event.target.id)
        let ficha = destino.getAttribute("src")
        if (ficha !== "/img/blanca.png" && ficha !== "/img/negra.png" ){
            idDestino = event.target.id
        }
    }
    if (idFichaSeleccionada !== "" && idDestino !== ""){
        moverFicha(idFichaSeleccionada, idDestino)
    }
}
// Comprueba el ganador mirando si no queda ninguna ficha de su color
let comprobarGanador = () => {
    let fichasBlancasIniciales = 12
    let fichasNegrasIniciales = 12
    let fichasBlancas = 0
    let fichasNegras = 0
    for (const imagen of imagenes) {
        let fichaimagen = imagen.getAttribute("src")
        if(fichaimagen == "/img/blanca.png"){
            fichasBlancas++
        }else if(fichaimagen == "/img/negra.png"){
            fichasNegras++
        }
    }

    if (fichasBlancasIniciales - fichasBlancas === 0){
        alert("Gana el Jugador 2")
        nuevoJuego()
    }else if (fichasNegrasIniciales - fichasNegras === 0){
        alert("Gana el Jugador 1")
        nuevoJuego()
    }
}
// reinicia el juego  
let nuevoJuego = () => {
    tablero = tableroinicial
    turno.innerText = "Jugador 1 / Blancas"
    idDestino = ""
    idFichaSeleccionada = ""
    for (const imagen of imagenes) {
        imagen.onclick = seleccionar   
    }
    boton.onclick = nuevoJuego
}





turno.innerText = "Jugador 1 / Blancas"
for (const imagen of imagenes) {
    imagen.onclick = seleccionar  
}
boton.onclick = nuevoJuego
