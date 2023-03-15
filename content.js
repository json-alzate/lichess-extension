// Tiempos
/*
    < 1 minuto: green
    > 3 minutos: blue
    > 5 minutos: Yellow
    > 7 minutos: orange
    > 10 minutos: red
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
    let color = "#22CFCF";


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
            color = "#FF6384";
        } else if (minutes >= 5) {
            color = "#FF9020";
        } else if (minutes >= 3) {
            color = "#FFC234";
        } else if (minutes >= 1) {
            color = "#36A2EB";
        } else {
            color = "#22CFCF";
        }


        // if (minutes >= 5) {
        //     color = "red";
        // } else if (minutes >= 3) {
        //     color = "orange";
        // }

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

    // Storage
    function saveTime() {
        const puzzleId = document.querySelector(".infos.puzzle a").innerText;
        const puzzleTime = document.querySelector(".timer").innerText;
        const puzzleData = { type: 'puzzle', puzzleId, puzzleTime, minutes, seconds, color };
        // Guarda en el almacenamiento local de chrome
        chrome.storage.local.set({ [puzzleId]: puzzleData }, () => {
            console.log("Saved puzzle data");
        });
    }

}
