import { getWrongAnswers } from "./shared.js";

function displayChart() {
    const pieChartElement = document.getElementById("chart");
    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
        labels: ["Right Answers", "Wrong Answers"],
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 2],
                backgroundColor: ["blue", "red"],
            }
        ]
    };

    const config = {
        type: "pie",
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                }
            }
        },
    };
    let chart = new Chart(pieChartElement, config);
}
displayChart();

function displayWrongAnswers() {
    let wrongAnswers = getWrongAnswers();
    let wrongAnswersBody = document.getElementById("wrong-answers-body");
    for (const wrongAnswer of wrongAnswers) {
        wrongAnswersBody.innerHTML += `<tr><td>${wrongAnswer.word}</td><td>${wrongAnswer.translation}</td></tr>`;
    }
}
displayWrongAnswers();