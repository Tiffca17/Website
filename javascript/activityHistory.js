// document.addEventListener('DOMContentLoaded', () => {
    $(function() {
    let currentPage = "1";
    let debounceTimer;
    let selected = "id";
    

    let start = moment().subtract(29, 'days');
    let end = moment();

    let reportrange = $('#reportrange');
    let searchText = "";

    const searchBar = document.getElementById('search-bar');

// Listen for real-time input
    searchBar.addEventListener('input', () => {
        searchText = searchBar.value;
        currentPage = "1";
        fetchData(currentPage, selected, startDate, endDate,searchText);
    });
    

    function updateDateRange(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        
        startDate = start.format('YYYY-MM-DD'); // Format date as required by the backend
        endDate = end.format('YYYY-MM-DD');
        
        // Fetch data when the date range changes
        fetchData(currentPage, selected, startDate, endDate,searchText);
    }

    reportrange.daterangepicker(
        {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            }
        },function (start, end) { // Callback function
            console.log("Date Range Picker Pressed");
            updateDateRange(start, end); // Call your update function
        }
    );
    

    // Set initial date range
    updateDateRange(moment().subtract(29, 'days'), moment());

    
   
    const buttons = document.querySelectorAll('input[type="radio"]');
    buttons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const selected = event.target.value;  // Get the value of the selected radio button
            console.log(selected);  // Logs the selected value
            
            ['id','plant', 'date', 'time', 'code', 'message'].forEach(filter => {
                document.getElementById(`${filter}-sort`).style.display = filter === selected ? 'inline' : 'none';
            });

            fetchData(currentPage, selected, startDate, endDate, searchText);
        });
      });

      fetchData(currentPage, selected, startDate, endDate, searchText);
    
    function fetchData(page,filter,startDate, endDate, search){
        url = 'https://website-k5ix.onrender.com/activity-history/' + page + "/" + filter + "/" + startDate + "/" + endDate;
        if (search!=""){
            url = url + "/" + search;
        }
        console.log(url);
    
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            table(data.data);
            renderPagination(data.pages,filter);
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    
    function renderPagination(totalPages,order) {
        
        const pagesContainer = document.querySelector("#numbers");
        pagesContainer.innerHTML = ''; // Clear previous buttons

        // console.log(prevContainer);

        const currentPageNum = parseInt(currentPage);

        // Define the range of page buttons to show
        let startPage = Math.max(1, currentPageNum - 2);
        let endPage = Math.min(totalPages, currentPageNum + 2);

        // Ensure only 5 pages are displayed
        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + 4);
            } else {
                startPage = Math.max(1, endPage - 4);
            }
        }


        const prevButton = document.querySelector("#prev-button");
        console.log(prevButton);
        prevButton.disabled = currentPageNum === 1; // Disable if on the first page
        prevButton.addEventListener("click", () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function() {
                if (currentPageNum > 1) {
                    currentPage = (currentPageNum - 1).toString();
                    fetchData(currentPage,order,startDate,endDate,searchText); // Fetch the previous page
                }
            }, 300);
            
        });
        // prevContainer.appendChild(prevButton);

        // Create page number buttons
        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.classList.add("pagination-button");
            if (i === currentPageNum) {
                button.classList.add("active");
            }
            button.addEventListener("click", () => {
                currentPage = i.toString(); // Update current page
                fetchData(currentPage,order,startDate,endDate,searchText); // Fetch data for the clicked page
            });
            pagesContainer.appendChild(button);
        }

        nextButton = document.querySelector("#next-button");
        nextButton.disabled = currentPageNum === totalPages; // Disable if on the last page
        nextButton.addEventListener("click", () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function() {
                if (currentPageNum < totalPages) {
                    currentPage = (currentPageNum + 1).toString();
                    fetchData(currentPage,order,startDate,endDate,searchText); // Fetch the next page
                }
            }, 200);
            
        });
    };
    
    function table(data){
        const tableBody = document.querySelector("#activity-table tbody");
        tableBody.innerHTML = ''
        if(data.length === 0){
            const row = document.createElement("tr");
            const noResultsCell = document.createElement("td");
            noResultsCell.colSpan = 6; // Span all columns
            noResultsCell.textContent = "No results found";
            noResultsCell.style.textAlign = "center";
            row.appendChild(noResultsCell);
            tableBody.appendChild(row);

        }
        else{
            for (let i = 0; i < data.length; i++) {
                const row = document.createElement("tr"); // Create a new row
            
                // Create and populate cells for each field
                const idCell = document.createElement("td");
                idCell.textContent = data[i].id;
                row.appendChild(idCell);
    
                const plantCell = document.createElement("td");
                plantCell.textContent = data[i].plant;
                row.appendChild(plantCell);
            
                const dateCell = document.createElement("td");
                dateCell.textContent = data[i].date;
                row.appendChild(dateCell);
            
                const timeCell = document.createElement("td");
                timeCell.textContent = data[i].time;
                row.appendChild(timeCell);
        
                const codeCell = document.createElement("td");
                codeCell.textContent = data[i].code;
                row.appendChild(codeCell);
        
                const messageCell = document.createElement("td");
                messageCell.textContent = data[i].message;
                row.appendChild(messageCell);
            
                // Append the row to the table body
                tableBody.appendChild(row);
            }
        }

        
    }


});



// function updateTable() {
    
// }