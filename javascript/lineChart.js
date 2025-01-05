document.addEventListener('DOMContentLoaded', () => {
    // Update data every 5 seconds
    setInterval(updateLineGraph, 1000);
});

// Initialize chart globally to update it dynamically later
let chart;


function updateLineGraph() {
    // Fetch data from both endpoints asynchronously
    Promise.all([
        fetch('http://127.0.0.1:8000/relief-month-sum').then(response => response.json()),
        fetch('http://127.0.0.1:8000/cv-month-sum').then(responsecv => responsecv.json()),
        fetch('http://127.0.0.1:8000/bh-month-sum').then(responsebh => responsebh.json())
    ])
    .then(([data, datacv, databh]) => {
        // Log the received data for debugging
        console.log('Fetched Data for Relief Bush:', data);
        console.log('Fetched Data for Cedar Valley:', datacv);
        console.log('Fetched Data for Cedar Valley:', databh);

        // Now that both datasets are fetched, update the graph
        graph_plot(data, datacv, databh);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function gradient(ctx, colorStart) {
    const gradientLine1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradientLine1.addColorStop(0, colorStart); // Lighter shade
    gradientLine1.addColorStop(1, 'rgba(30, 144, 255, 0)'); // Fade to transparent
    return gradientLine1;
}

function graph_plot(returned_data, returned_datacv, returned_databh) {
    const allMonths = Array.from(new Set([
        ...returned_data.map(faculty => faculty.month_name),
        ...returned_datacv.map(faculty => faculty.month_name),
        ...returned_databh.map(faculty => faculty.month_name)
    ]));

    const sortedMonths = allMonths.sort((a, b) => {
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });

    const yValues = sortedMonths.map(month => {
        const entry = returned_data.find(faculty => faculty.month_name === month);
        return entry ? entry.sum : 0;
    });

    const yValuescv = sortedMonths.map(month => {
        const entry = returned_datacv.find(faculty => faculty.month_name === month);
        return entry ? entry.sum : 0;
    });

    const yValuesbh = sortedMonths.map(month => {
        const entry = returned_databh.find(faculty => faculty.month_name === month);
        return entry ? entry.sum : 0;
    });

    const ctx = document.getElementById('myChart').getContext('2d');

    // Check if the chart already exists, and update it
    if (chart) {
        chart.data.labels = sortedMonths; // Update x-axis labels
        chart.data.datasets[0].data = yValues; // Update dataset
        chart.data.datasets[1].data = yValuescv;
        chart.data.datasets[2].data = yValuesbh;
        chart.update(); // Update the chart
    } else {
        // Create a new chart if it doesn't exist
        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: sortedMonths,
                datasets: [{
                    label: "Relief Bush (Tonnes)",
                    data: yValues,
                    borderColor: "#103c74",
                    backgroundColor: gradient(ctx, "#103c74"),
                    tension: 0.5,
                    fill: true,
                },
                {
                    label: "Cedar Valley (Tonnes)",
                    data: yValuescv,
                    borderColor: "#edc85d",
                    backgroundColor: gradient(ctx, "#edc85d"),
                    tension: 0.5,
                    fill: true,
                },
                {
                    label: "Black Heath (Tonnes)",
                    data: yValuesbh,
                    borderColor: "#FF6F61",
                    backgroundColor: gradient(ctx, "#FF6F61"),
                    tension: 0.5,
                    fill: true
                }
            ]
            },
            options: {
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
                        borderWidth: 1,
                        xAlign: "left",
                    },
                    legend: {
                        display: false, // Hides the legend
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false, // Removes grid lines for x-axis
                        },
                    },
                    y: {
                        grid: {
                            display: false, // Removes grid lines for y-axis
                        },
                    },
                },
            },
        });
    }
}
