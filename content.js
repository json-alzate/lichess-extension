// Tiempos
/*
    < 3 minuto: green === #629924
    > 3 minutos: blue === #3692e7
    > 5 minutos: orange === #bf811d
    > 10 minutos: red === #c33
*/

if (window.location.href.endsWith(document.querySelector(".infos.puzzle a").getAttribute("href"))) {
    // La URL actual termina con el valor del href, no inicie el contador
    console.log("La URL actual termina con el valor del href, no se iniciará el contador.");
} else {
    // La URL actual no termina con el valor del href, inicie el contador
    // Coloca todo el código existente en content.js dentro de este bloque "else"




    let intervalId;
    let minutes = 0;
    let seconds = 0;
    let color = "#2dd36f";


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
                        saveTime();
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

        // Change the color of the timer based on the time
        if (minutes >= 10) {
            color = "#c33";
        } else if (minutes >= 5) {
            color = "#bf811d";
        } else if (minutes >= 3) {
            color = "#3692e7";
        } else {
            color = "#629924";
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
    timerDisplay.style.fontSize = "18px";
    timerDisplay.style.padding = "2px";
    document.querySelector(".puzzle__tools").appendChild(timerDisplay);

    startTimer();

    // Storage
    function saveTime() {
        const puzzleId = document.querySelector(".infos.puzzle a").innerText;
        const puzzleTime = document.querySelector(".timer").innerText;
        const puzzleData = {
            type: 'puzzle',
            puzzleId,
            puzzleTime,
            minutes,
            seconds,
            color,
            date: new Date().getTime()
        };
        // Guarda en el almacenamiento local de chrome
        chrome.storage.local.set({ [puzzleId]: puzzleData }, () => {
            console.log("Saved puzzle data");
        });
    }

}
