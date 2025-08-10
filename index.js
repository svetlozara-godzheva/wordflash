import { getAverageQuizTime, getStatistic, getWrongAnswers } from "./shared.js";

function displayChart() {
    const pieChartElement = document.getElementById("chart");
    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
        labels: ["Right Answers", "Wrong Answers"],
        datasets: [
            {
                data: [getStatistic("right-answers-count"), getStatistic("wrong-answers-count")],
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

function displayStatistics() {
    let statistics = document.getElementById("statistics");
    statistics.innerHTML = `<li class="list-group-item">Average Quiz Time: ${getAverageQuizTime()} sec</li>
                            <li class="list-group-item">Total Wrong Answers: ${getStatistic("wrong-answers-count")}</li>
                            <li class="list-group-item">Total Right Answers: ${getStatistic("right-answers-count")}</li>`;
}
displayStatistics();