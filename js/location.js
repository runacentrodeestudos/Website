// Initialize Leaflet map
document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('leaflet-map').setView([38.53761, -8.89188], 16);
    
    // Add black and white tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        className: 'grayscale-tiles'
    }).addTo(map);
    
    // Add marker for Av. de Angola 12B, 2900-052 Setúbal
    var marker = L.marker([38.53761, -8.89188]).addTo(map);
    marker.bindPopup('<b>Cognita</b><br>Av. de Angola 12B<br>2900-052 Setúbal').openPopup();
});
