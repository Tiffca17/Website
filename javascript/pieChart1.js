const ctx1 = document.getElementById("pieChart1").getContext("2d");
const gradient1 = ctx1.createLinearGradient(0, 0, ctx1.canvas.width, 0); // Horizontal gradient
gradient1.addColorStop(0, "#002767"); // Start color
gradient1.addColorStop(0.5, "#134492"); // Middle color
gradient1.addColorStop(1, "#2e5daa"); // End color

const xValues1 = ["Stone Dust", "3/4 Stone", "Chemical Grade Stone"];
const yValues1 = [55,34,11];
const barColors1 = [gradient1, "gold", "coral"]; // Use gradients here

new Chart("pieChart1", {
    type: "doughnut",
    data: {
        labels: xValues1,
        datasets: [{
            backgroundColor: barColors1, // Apply gradients
            data: yValues1
        }]
    },
    options: {
        // rotation: -90,
        // circumference: 180,
        plugins: {
            legend: {
                display: false // Hides the legend
            }
        }    
    }
});
