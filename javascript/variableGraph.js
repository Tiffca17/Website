// let firstDisplayBox = document.getElementsByClassName("box");

// firstDisplayBox[0].style.display = "block";
// let firstDisplayCircle = document.getElementsByClassName("circle");
// firstDisplayCircle[0].style.color = "black";
// firstDisplayCircle[0].style.borderBottom = "2px solid #FF6F61";

// function circleClick (n){
    
//     showBoxes(n);
//     colorChange(n);
// }

// function showBoxes(i){
//     const infoBox = document.getElementById("infoBox");
//     let boxes = document.getElementsByClassName("box");
//     switch (i){
//         case 0:
//             boxes[0].style.display = "block";
//             infoBox.style.background = "linear-gradient(to right, #edc85d, #fbe39b )";
//             boxes[1].style.display = "none";
//             boxes[2].style.display = "none";
//             boxes[3].style.display = "none";
//             break;
//         case 1:
//             infoBox.style.background = "linear-gradient(to right, #edc85d, #fbe39b )";
//             boxes[1].style.display = "block";
//             boxes[0].style.display = "none";
//             boxes[2].style.display = "none";
//             boxes[3].style.display = "none";
//             break;
//         case 2:
//             boxes[2].style.display = "block";
//             boxes[0].style.display = "none";
//             boxes[1].style.display = "none";
//             boxes[3].style.display = "none";
//             break;
//         case 3:
//             boxes[3].style.display = "block";
//             boxes[0].style.display = "none";
//             boxes[1].style.display = "none";
//             boxes[2].style.display = "none";
//             break;
//         default:
//             boxes[0].style.display = "block";
//             boxes[1].style.display = "none";
//             boxes[2].style.display = "none";
//             boxes[3].style.display = "none";
//             break;
//     }

// }

// function colorChange(i){
//     let circles = document.getElementsByClassName("circle");
//     switch (i){
//         case 0:
//             circles[0].style.color = "black";
//             circles[1].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[2].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[3].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[0].style.borderBottom = "2px solid #FF6F61";
//             circles[1].style.borderBottom = "none";
//             circles[2].style.borderBottom = "none";
//             circles[3].style.borderBottom = "none";

//             break;
//         case 1:
//             circles[0].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[1].style.color = "black";
//             circles[2].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[3].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[1].style.borderBottom = "2px solid #FF6F61";
//             circles[0].style.borderBottom = "none";
//             circles[2].style.borderBottom = "none";
//             circles[3].style.borderBottom = "none";
//             break;
//         case 2:
//             circles[0].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[1].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[2].style.color = "black";
//             circles[3].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[2].style.borderBottom = "2px solid #FF6F61";
//             circles[0].style.borderBottom = "none";
//             circles[1].style.borderBottom = "none";
//             circles[3].style.borderBottom = "none";
//             break;
//         case 3:
//             circles[0].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[1].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[2].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[3].style.color = "black";
//             circles[3].style.borderBottom = "2px solid #FF6F61";
//             circles[0].style.borderBottom = "none";
//             circles[2].style.borderBottom = "none";
//             circles[1].style.borderBottom = "none";
//             break;
//         default:
//             circles[0].style.color = "black";
//             circles[1].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[2].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[3].style.color = "rgba(0, 0, 0, 0.4)";
//             circles[0].style.borderBottom = "2px solid #FF6F61";
//             circles[1].style.borderBottom = "none";
//             circles[2].style.borderBottom = "none";
//             circles[3].style.borderBottom = "none";
//             break;
//     }
// }

// Initial setup
let firstDisplayBox = document.getElementsByClassName("box");
let firstDisplayCircle = document.getElementsByClassName("circle");
const infoBox = document.getElementById("infoBox");
infoBox.style.background = "linear-gradient(to right, #002767 , #5e92e6)"

firstDisplayBox[0].style.display = "block";
firstDisplayCircle[0].style.color = "white";
firstDisplayCircle[0].style.borderBottom = "2px solid white";

// Circle click handler
function circleClick(n) {
    showBoxes(n);
    colorChange(n);
}

// Show boxes
function showBoxes(i) {
    const infoBox = document.getElementById("infoBox");
    let boxes = document.getElementsByClassName("box");

    // Hide all boxes and reset background
    Array.from(boxes).forEach((box, index) => {
        box.style.display = index === i ? "block" : "none";
    });

    // Set background gradient
    const gradients = [
        "linear-gradient(to right, #002767 , #5e92e6)",
        "white",
        "white",
        "linear-gradient(to right, #9bd796, #d8f2c7)"
    ];
    infoBox.style.background = gradients[i] || gradients[0];
}

// Change circle colors
function colorChange(i) {
    let circles = document.getElementsByClassName("circle");

    // Reset all circles
    Array.from(circles).forEach((circle, index) => {
        circle.style.color = index === i ? "black" : "rgba(0, 0, 0, 0.4)";
        circle.style.borderBottom = index === i ? "2px solid white" : "none";
    });
}
