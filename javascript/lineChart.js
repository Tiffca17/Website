const xValues = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const yValues = [5600, 4321, 543, 7654, 2345, 1234, 1345, 6543, 6432, 3452, 4536, 7643];
const yValuesBH = [578, 421, 5436, 8654, 6345, 3234, 4345, 2543, 2432, 1452, 6536, 5643];
const yValuesCV = [4328, 4211, 7464, 854, 1245, 5434, 645, 7543, 4432, 152, 3336, 4643];


function gradient(colourStart){
    const ctxLine = document.getElementById('myChart').getContext('2d');
    const gradientLine1 = ctxLine.createLinearGradient(0, 0, 0, 400);
    gradientLine1.addColorStop(0, colourStart); // Lighter shade
    gradientLine1.addColorStop(1, 'rgba(30, 144, 255, 0)');   // Fade to transparent
    return gradientLine1
}

new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{ 
            label: "Relief Bush (Tonnes)",
            data: yValues,
            borderColor: "#103c74",
            backgroundColor: gradient("#103c74"),
            tension: 0.5,
            fill: true
        }, {
            label: "Black Heath (Tonnes)",
            data: yValuesBH,
            borderColor: "#FF6F61",
            backgroundColor: gradient("#FF6F61"),
            tension: 0.5,
            fill: true
        },
        {
            label: "Cedar Valley (Tonnes)",
            data: yValuesCV,
            borderColor: "#edc85d",
            backgroundColor: gradient("#edc85d"),
            tension: 0.5,
            fill: true
        }]
    },
    options: {
        legend: {display: false},
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: "white",
                titleColor: "#042a0b",
                bodyColor: "#042a0b",
                titleFont: { weight: 'bold' },
                padding: 10,
                cornerRadius: 10,
                borderColor: "#cccccc",
                borderWidth: "1",
                xAlign: "left"
            },
            legend: {
                display: false // Hides the legend
            }
        },
        scales: {
            x: {
                grid: {
                    display: false // Removes the grid lines for the x-axis
                }
            },
            y: {
                grid: {
                    display: false // Removes the grid lines for the y-axis
                }
            }
        }
    }
});