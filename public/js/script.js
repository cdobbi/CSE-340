document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.car').forEach(car => {
        car.addEventListener('click', () => {
            alert('You clicked on ' + car.querySelector('h2').textContent);
        });
    });
});