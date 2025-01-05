let firstDisplayBox = document.getElementsByClassName("box");
firstDisplayBox[0].style.display = "block";
let firstDisplayCircle = document.getElementsByClassName("circle");
firstDisplayCircle[0].style.color = "black";
firstDisplayCircle[0].style.borderBottom = "2px solid #FF6F61";

function circleClick (n){
    
    showBoxes(n);
    colorChange(n);
}

function showBoxes(i){
    let boxes = document.getElementsByClassName("box");
    switch (i){
        case 0:
            boxes[0].style.display = "block";
            boxes[1].style.display = "none";
            boxes[2].style.display = "none";
            boxes[3].style.display = "none";
            break;
        case 1:
            boxes[1].style.display = "block";
            boxes[0].style.display = "none";
            boxes[2].style.display = "none";
            boxes[3].style.display = "none";
            break;
        case 2:
            boxes[2].style.display = "block";
            boxes[0].style.display = "none";
            boxes[1].style.display = "none";
            boxes[3].style.display = "none";
            break;
        case 3:
            boxes[3].style.display = "block";
            boxes[0].style.display = "none";
            boxes[1].style.display = "none";
            boxes[2].style.display = "none";
            break;
        default:
            boxes[0].style.display = "block";
            boxes[1].style.display = "none";
            boxes[2].style.display = "none";
            boxes[3].style.display = "none";
            break;
    }

}

function colorChange(i){
    let circles = document.getElementsByClassName("circle");
    switch (i){
        case 0:
            circles[0].style.color = "black";
            circles[1].style.color = "rgba(0, 0, 0, 0.4)";
            circles[2].style.color = "rgba(0, 0, 0, 0.4)";
            circles[3].style.color = "rgba(0, 0, 0, 0.4)";
            circles[0].style.borderBottom = "2px solid #FF6F61";
            circles[1].style.borderBottom = "none";
            circles[2].style.borderBottom = "none";
            circles[3].style.borderBottom = "none";

            break;
        case 1:
            circles[0].style.color = "rgba(0, 0, 0, 0.4)";
            circles[1].style.color = "black";
            circles[2].style.color = "rgba(0, 0, 0, 0.4)";
            circles[3].style.color = "rgba(0, 0, 0, 0.4)";
            circles[1].style.borderBottom = "2px solid #FF6F61";
            circles[0].style.borderBottom = "none";
            circles[2].style.borderBottom = "none";
            circles[3].style.borderBottom = "none";
            break;
        case 2:
            circles[0].style.color = "rgba(0, 0, 0, 0.4)";
            circles[1].style.color = "rgba(0, 0, 0, 0.4)";
            circles[2].style.color = "black";
            circles[3].style.color = "rgba(0, 0, 0, 0.4)";
            circles[2].style.borderBottom = "2px solid #FF6F61";
            circles[0].style.borderBottom = "none";
            circles[1].style.borderBottom = "none";
            circles[3].style.borderBottom = "none";
            break;
        case 3:
            circles[0].style.color = "rgba(0, 0, 0, 0.4)";
            circles[1].style.color = "rgba(0, 0, 0, 0.4)";
            circles[2].style.color = "rgba(0, 0, 0, 0.4)";
            circles[3].style.color = "black";
            circles[3].style.borderBottom = "2px solid #FF6F61";
            circles[0].style.borderBottom = "none";
            circles[2].style.borderBottom = "none";
            circles[1].style.borderBottom = "none";
            break;
        default:
            circles[0].style.color = "black";
            circles[1].style.color = "rgba(0, 0, 0, 0.4)";
            circles[2].style.color = "rgba(0, 0, 0, 0.4)";
            circles[3].style.color = "rgba(0, 0, 0, 0.4)";
            circles[0].style.borderBottom = "2px solid #FF6F61";
            circles[1].style.borderBottom = "none";
            circles[2].style.borderBottom = "none";
            circles[3].style.borderBottom = "none";
            break;
    }
}