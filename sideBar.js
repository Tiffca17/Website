// Get the menu icon and sidebar elements
const menuIcon = document.querySelector('.fa-bars');
const sidebar = document.querySelector('.sideBar');
const content = document.getElementById('main');

// Add click event listener to the menu icon
menuIcon.addEventListener('click', () => {
    // Toggle the 'active' class on the sidebar
    sidebar.classList.toggle('active');

    if (sidebar.classList.contains('active')) {
        content.style.marginLeft = '250px'; // Match sidebar width
    } else {
        content.style.marginLeft = '0';
    }
});
