
const celdas = document.querySelectorAll(".celda");
const mensaje = document.getElementById("mensaje");

const puntosX = document.getElementById("puntosX");
const puntosO = document.getElementById("puntosO");

const jugadorX = document.getElementById("jugadorX");
const jugadorO = document.getElementById("jugadorO");

const btnReiniciar = document.getElementById("reiniciar");
const btnLimpiar = document.getElementById("limpiar");

// Variables del juego
let tablero = ["", "", "", "", "", "", "", "", ""];
let turno = "X";
let juegoActivo = true;

// Marcador
let victoriasX = 0;
let victoriasO = 0;

// Combinaciones ganadoras
const combinaciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Evento para cada celda
celdas.forEach(celda => {
    celda.addEventListener("click", () => {

        const indice = celda.dataset.index;

        // Comprobar si la celda está ocupada
        if (tablero[indice] !== "" || !juegoActivo) {
            return;
        }

        // Colocar X u O
        tablero[indice] = turno;

        celda.textContent = turno;
        celda.classList.add(turno.toLowerCase());

        // Comprobar ganador
        comprobarResultado();

    });
});

// Función para comprobar el resultado
function comprobarResultado() {

    let combinacionGanadora = null;

    for (const combinacion of combinaciones) {

        const [a, b, c] = combinacion;

        if (
            tablero[a] !== "" &&
            tablero[a] === tablero[b] &&
            tablero[a] === tablero[c]
        ) {
            combinacionGanadora = combinacion;
            break;
        }
    }

    // Si existe un ganador
    if (combinacionGanadora) {

        mensaje.textContent = `¡Jugador ${turno} ha ganado! 🎉`;

        combinacionGanadora.forEach(indice => {
            celdas[indice].classList.add("ganadora");
        });

        if (turno === "X") {
            victoriasX++;
            puntosX.textContent = victoriasX;
        } else {
            victoriasO++;
            puntosO.textContent = victoriasO;
        }

        juegoActivo = false;
        return;
    }

    // Comprobar empate
    if (!tablero.includes("")) {
        mensaje.textContent = "¡Es un empate! 🤝";
        juegoActivo = false;
        return;
    }

    // Cambiar turno
    turno = turno === "X" ? "O" : "X";

    mensaje.textContent = `Turno del jugador ${turno}`;

    actualizarTurno();
}

// Actualizar jugador activo
function actualizarTurno() {

    jugadorX.classList.toggle("activo", turno === "X");
    jugadorO.classList.toggle("activo", turno === "O");

}

// Reiniciar partida
function reiniciarJuego() {

    tablero = ["", "", "", "", "", "", "", "", ""];
    turno = "X";
    juegoActivo = true;

    celdas.forEach(celda => {
        celda.textContent = "";
        celda.classList.remove("x", "o", "ganadora");
    });

    mensaje.textContent = "Turno del jugador X";

    actualizarTurno();
}

// Reiniciar marcador
function reiniciarMarcador() {

    victoriasX = 0;
    victoriasO = 0;

    puntosX.textContent = 0;
    puntosO.textContent = 0;

    reiniciarJuego();
}

// Eventos de botones
btnReiniciar.addEventListener("click", reiniciarJuego);

btnLimpiar.addEventListener("click", reiniciarMarcador);

// Iniciar juego
actualizarTurno();
