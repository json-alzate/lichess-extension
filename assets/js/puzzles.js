// función para recuperar los puzzles almacenados en el local storage de chrome
function getSavedPuzzles() {
    chrome.storage.local.get(null, (data) => {
        console.log(data);
        const savedPuzzles = Object.values(data);
        let countGreen = 0;
        let countBlue = 0;
        let countOrange = 0;
        let countRed = 0;
        savedPuzzles.forEach((puzzle) => {
            // const puzzleId = puzzle.puzzleId;
            // const puzzleTime = puzzle.puzzleTime;
            const puzzleMinutes = puzzle.minutes;
            // const puzzleSeconds = puzzle.seconds;
            // const color = puzzle.color;
            // const puzzleData = { puzzleId, puzzleTime, puzzleMinutes, puzzleSeconds, color };

            // Sum the number of puzzles by minutes
            if (puzzleMinutes >= 10) {
                countRed++;
            } else if (puzzleMinutes >= 5) {
                countOrange++;
            } else if (puzzleMinutes >= 3) {
                countBlue++;
            } else {
                countGreen++;
            }

        });
        makeDoughnutChart(countGreen, countBlue, countOrange, countRed);

    });
}

// make doughnut chart
function makeDoughnutChart(countGreen, countBlue, countOrange, countRed) {
    const ctx = document.getElementById('doughnut-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["< 3 min", "3 - 5 min", "5 - 10 min", "> 10 min"],
            datasets: [{
                data: [countGreen, countBlue, countOrange, countRed],
                backgroundColor: [
                    'rgba(98, 153, 36)',
                    'rgba(54, 146, 231)',
                    'rgba(191, 129, 29)',
                    'rgba(204, 51, 51)'
                ]
            }]
        }
    });

    myChart.render();

}


getSavedPuzzles();
