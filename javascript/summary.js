let selected = "relief-bush";
let selectedRadio = document.getElementById(selected);
selectedRadio.style.borderBottom = "3px solid #fcef39";

const buttons = document.querySelectorAll('input[name="summary-filter"]');
    buttons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            selected = event.target.value;  // Get the value of the selected radio button
            console.log(selected);  // Logs the selected value
            
            buttons.forEach(btn => {
                const btnElement = document.getElementById(btn.value);
                if (btnElement) {
                    btnElement.style.borderBottom = "none"; // Reset border
                }
            });

            selectedRadio = document.getElementById(selected);
            selectedRadio.style.borderBottom = "3px solid #fcef39";
            
            // ['relief-bush','black-heath', 'cedar-valley'].forEach(filter => {
            //     document.getElementById(`${filter}-sort`).style.display = filter === selected ? 'inline' : 'none';
            // });

            // fetchData(currentPage, selected, startDate, endDate, searchText);
        });
      });