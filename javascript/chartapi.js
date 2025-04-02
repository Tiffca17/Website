document.addEventListener('DOMContentLoaded', () => {
    updateSocketData();
});

function fetchData() {
    fetch('https://129.213.108.16:8000/faculty')
        .then(response => response.json())
        .then(data => {
            //const latestEntry = data[data.length - 1]; // Get the last entry
            // Update Socket 1
            
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

