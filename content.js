let intervalId;
let minutes = 0;
let seconds = 0;
let color = "green";


// Escuchar por cambios en el DOM
const observer = new MutationObserver(checkForPause);
observer.observe(document.body, { childList: true, subtree: true });

// Función para verificar si se debe pausar el contador
function checkForPause(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (let node of mutation.addedNodes) {
                if (node.classList && node.classList.contains('puzzle__feedback') && node.classList.contains('after')) {
                    clearInterval(intervalId);
                    resetTimer();
                    break;
                }
            }
        }
    }
}


// Observe the puzzle number element for changes
const observerPuzzleId = new MutationObserver(() => {
    clearInterval(intervalId);
    startTimer();
});
observerPuzzleId.observe(document.querySelector(".infos.puzzle a"), { subtree: true, childList: true });

// Función para inicializar el contador
function startTimer() {
    intervalId = setInterval(() => {
        updateTimer();
    }, 1000);
}

// Función para actualizar la visualización del contador
function updateTimer() {

    // Increment the time
    if (seconds === 59) {
        minutes++;
        seconds = 0;
    } else {
        seconds++;
    }

    if (minutes >= 5) {
        color = "red";
    } else if (minutes >= 3) {
        color = "orange";
    }

    // Update the timer display with the current time
    const timerDisplay = document.querySelector(".timer");
    timerDisplay.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timerDisplay.style.color = color;


}

function resetTimer() {
    minutes = 0;
    seconds = 0;
    color = "green";
}


const timerDisplay = document.createElement("div");
timerDisplay.classList.add("timer");
document.querySelector(".puzzle__tools").appendChild(timerDisplay);

startTimer();

