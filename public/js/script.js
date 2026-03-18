// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = navMenu?.querySelectorAll('a');
    navLinks?.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('.car').forEach(car => {
        car.addEventListener('click', () => {
            alert('You clicked on ' + car.querySelector('h2').textContent);
        });
    });
});