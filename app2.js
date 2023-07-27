// function getLatLong(city) {
//     const apiUrl = 'https://nominatim.openstreetmap.org/search?q=' + city + '&format=json';

//     axios.get(apiUrl)
//         .then(response => {
//             const data = response.data;
//             if (data.length > 0) {
//                 const lat = data[0].lat;
//                 const lon = data[0].lon;
//                 console.log('Latitude:', lat);
//                 console.log('Longitude:', lon);
//             } else {
//                 console.log('No results found for the city:', city);
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }


// const axios = require('axios');

function getLatLong() {
    const cityInput = document.getElementById("city-input");
    city = cityInput.value;
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;

    axios.get(apiUrl)
        .then(response => {
            const data = response.data;
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                console.log('Latitude:', lat);
                console.log('Longitude:', lon);
                const iframe = document.getElementById('iframeid');
				const url = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=radar&lat=${lat}&lon=${lon}&zoom=12`;
		
				// Set the iframe source with the updated URL
				iframe.src = url;
				console.log('Call from app2.js : '+url);
            } else {
                console.log('No results found for the city:', city);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Example usage:

