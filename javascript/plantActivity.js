
// A function to update the crusher status dynamically
function updateStatus(status, plant, messages) {
    const plantIndex = {
        "Relief Bush": 0,
        "Cedar Valley": 1,
        "Black Heath": 2
    };
    
    
    // Determine the index based on the plant name
    const index = plantIndex[plant];
    if (index === undefined) return; // If the plant is not recognized, exit

    const circleColor = status === "CS" ? "rgb(208, 16, 16)" : "rgb(36, 217, 36)";
    const messageColor = status === "CS" ? "rgb(250, 140, 140)" : "rgb(200, 255, 200)" 
    console.log("hi");
    const message = status === "CS" ? "Stopped" : "Running";

    // Update styles and messages
    // circles[index].style.backgroundColor = circleColor;
    console.log(index);
    // console.log(circles[index]);
    messages[index].style.backgroundColor = messageColor;
    messages[index].style.color = circleColor;
    messages[index].innerHTML = message;
}

// Example usage for crusher


// console.log("hello");

function fetchData(){

    // const crusherCircles = document.getElementsByClassName("crusher-status-circle");
    const crusherMessages = document.getElementsByClassName("crusher-status-message");
    // const screenCircles = document.getElementsByClassName("screen-status-circle");
    const screenMessages = document.getElementsByClassName("screen-status-message");

    // console.log(crusherCircles);

    fetch("https://website-k5ix.onrender.com/status")
    .then(response => response.json())
    .then((data) => {
        // Log the received data for debugging
        console.log(data[0].plant);
        // if (data[0].machine === "Crusher") {
        //     updateStatus(data[0].code, data[0].plant, crusherMessages);
        // }
        
        // // Example usage for screen
        // if (data[0].machine === "Screen") {
        //     updateStatus(data[0].code, data[0].plant, screenMessages);
        // }
        data.forEach(entry => {
            if (entry.machine === "Crusher") {
                updateStatus(entry.code, entry.plant, crusherMessages);
            }
            if (entry.machine === "Screen") {
                updateStatus(entry.code, entry.plant, screenMessages);
            }
        })


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

fetchData();
setInterval(fetchData, 5000);


if (data.machine == "Crusher"){
    if(data.code == "CS"){
        if(data.plant == "Relief Bush"){
            crusherCircles[0].style.backgroundColor = "red";
            crusherMessages[0].style.backgroundColor = "red";
            crusherMessages[0].innerHTML = "Stopped";
        };
        if(data.plant == "Cedar Valley"){
            crusherCircles[1].style.backgroundColor = "red";
            crusherMessages[1].style.backgroundColor = "red";
            crusherMessages[1].innerHTML = "Stopped";
        };
        if(data.plant == "Black Heath"){
            crusherCircles[2].style.backgroundColor = "red";
            crusherMessages[2].style.backgroundColor = "red";
            crusherMessages[2].innerHTML = "Stopped";
        }
    }
    else{
        if(data.plant == "Relief Bush"){
            crusherCircles[0].style.backgroundColor = "green";
            crusherMessages[0].style.backgroundColor = "green";
            crusherMessages[0].innerHTML = "Running";
        };
        if(data.plant == "Cedar Valley"){
            crusherCircles[1].style.backgroundColor = "green";
            crusherMessages[1].style.backgroundColor = "green";
            crusherMessages[1].innerHTML = "Running";
        };
        if(data.plant == "Black Heath"){
            crusherCircles[2].style.backgroundColor = "green";
            crusherMessages[2].style.backgroundColor = "green";
            crusherMessages[2].innerHTML = "Running";
        }
    }

}
