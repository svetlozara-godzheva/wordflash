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