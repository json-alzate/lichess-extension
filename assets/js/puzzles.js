// funcion para recuperar los puzzles almacenados en el local storage de chrome
function getSavedPuzzles() {
    chrome.storage.local.get(null, (data) => {
        console.log("Retrieved saved puzzles");
        console.log(data);
        const savedPuzzles = Object.values(data);
        let countGreen = 0;
        let countBlue = 0;
        let countYellow = 0;
        let countOrange = 0;
        let countRed = 0;
        savedPuzzles.forEach((puzzle) => {
            const puzzleId = puzzle.puzzleId;
            const puzzleTime = puzzle.puzzleTime;
            const puzzleMinutes = puzzle.minutes;
            const puzzleSeconds = puzzle.seconds;
            const color = puzzle.color;
            const puzzleData = { puzzleId, puzzleTime, puzzleMinutes, puzzleSeconds, color };

            // Sum the number of puzzles by minutes
            if (puzzleMinutes >= 10) {
                countRed++;
            } else if (puzzleMinutes >= 5) {
                countOrange++;
            } else if (puzzleMinutes >= 3) {
                countYellow++;
            } else if (puzzleMinutes >= 1) {
                countBlue++;
            } else {
                countGreen++;
            }

        });
        makeDoughnutChart(countGreen, countBlue, countYellow, countOrange, countRed);

    });
}

// make doughnut chart
function makeDoughnutChart(countGreen, countBlue, countYellow, countOrange, countRed) {
    const ctx = document.getElementById('doughnut-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [countGreen, countBlue, countYellow, countOrange, countRed],
                backgroundColor: [
                    'rgba(34, 207, 207, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 205, 52, 0.2)',
                    'rgba(255, 144, 32, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(34, 207, 207, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 205, 52, 1)',
                    'rgba(255, 144, 32, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    myChart.render();

}


getSavedPuzzles();
