// window.onload = () => {
//   getCityByLatLong();
// };
getCityByLatLong();
// const iframe = document.getElementById('weatherMapFrame');

// // Replace the placeholders with the actual lat and lon values
// const lat = 12.9762;
// const lon = 77.6033;
// const url = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=radar&lat=${lat}&lon=${lon}`;

// // Set the iframe source with the updated URL
// iframe.src = url;
function search(event) {
  if(event.keyCode == 13) {
    getWeatherAndForecast();
  }
}

function getWeatherAndForecast() {
  const cityInput = document.getElementById("city-input");
  city = cityInput.value;
  fetchWeather(city);
  fetchForecast(city);
}



function fetchWeather(city){
// console.log('Inside fetchweather : '+city);
  // Make an API call to retrieve weather data for the city
  // Replace the URL with your actual API endpoint
//const url = 'https://192.168.1.7:8090/weather/'+city;
const url = 'http://'+location.hostname+':8090/weather/'+city;
// console.log(url);
// console(xhr.getResponseHeader());
xhr.open('GET',url,true);
 xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); xhr.setRequestHeader('Access-Control-Allow-Origin', '*');  
xhr.send();

xhr.onload = () =>{
  
  // we can change the data type to json also by
 
 if(xhr.status == 200){

  const data = JSON.parse(xhr.response);
  var dataCoordss = [data.coord.lat,data.coord.lon];
 
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  localStorage.setItem('lat', lat);
  localStorage.setItem('lon', lon);
  // window.location.href = 'news.html';



  document.getElementById("day").innerHTML  = getWeekDay(data.dt);
    document.getElementById("date").innerHTML = getCurrentDate(data.dt);
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML = `${data.main.temp}<sup>o</sup>C<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`;
    
    if(data.rain && data.rain["1h"]){
      document.getElementById("1h").innerHTML =`${data.rain["1h"]} <img src="images/icon-umberella.png">`;

    }
    else{
      document.getElementById("1h").innerHTML =`${data.weather[0].description} <img src="images/icon-umberella.png">`;

    }

    document.getElementById("wind").innerHTML = `<img src="images/icon-wind.png" alt="">${data.wind["speed"]}m/s`;
    document.getElementById("deg").innerHTML = `<img src="images/icon-compass.png" alt="">${data.wind["deg"]}`;
 
 }
 else{
    alert("Incorrect City "+xhr.status.toString());
    alert("Please enter correct City");
    window.location.reload();
 }
  
};

}

function fetchForecast(city){
  // var container = document.getElementById("forecast-container");
  // container.innerHTML = "h";
  const xhr = new XMLHttpRequest();

  // console.log(city);
  //const url = 'https://192.168.1.7:8083/forecast/'+city;
const url = 'http://'+location.hostname+':8083/forecast/'+city;
  // console.log(url);
  xhr.open('GET',url,true);
  xhr.send();

  xhr.onload = () => {
    if(xhr.status == 200){
      var data = JSON.parse(xhr.response);
  
var forecastContainer = document.getElementById("forecast-container");
// Clear the container
forecastContainer.innerHTML = '';

data.list.forEach((element) =>  {
  const date = timeConverter(element.dt_txt);
  const icon = element.weather[0].icon;
  const tempMax = element.main.temp_max;
  const tempMin = element.main.temp_min;

  const forecastItem = createForecastItem(date,icon,tempMax,tempMin);
  forecastContainer.appendChild(forecastItem);

});
}

    else if (xhr.status == 404 || city.length == 0  ){
      alert("Incorrect City "+xhr.status.toString());
      alert("Please enter correct City");
      window.location.reload();
    }
   
  }
}

function createForecastItem(date, icon, tempMax,tempMin) {
  const forecastItem = document.createElement("div");
  forecastItem.classList.add("forecast");

  const forecastHeader = document.createElement("div");
  forecastHeader.classList.add("forecast-header");

  const timeContainer = document.createElement("div");
  timeContainer.classList.add("day");
  timeContainer.textContent = date;
  forecastHeader.appendChild(timeContainer);

  const forecastContent = document.createElement("div");
  forecastContent.classList.add("forecast-content");

  const forecastIcon = document.createElement("div");
  forecastIcon.classList.add("forecast-icon");
  const iconImg = document.createElement("img");
  iconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  iconImg.alt = "";
  forecastIcon.appendChild(iconImg);
  forecastContent.appendChild(forecastIcon);

  const degree = document.createElement("div");
  degree.classList.add("degree");
  degree.innerHTML = `${tempMax}<sup>o</sup>C`;
  forecastContent.appendChild(degree);

  const small = document.createElement("small");
  small.innerHTML = `${tempMin}<sup>o</sup>C`;
  forecastContent.appendChild(small);

  forecastItem.appendChild(forecastHeader);
  forecastItem.appendChild(forecastContent);

  return forecastItem;
}

function getCityByLatLong(){
  if ("geolocation" in navigator) {
    // Prompt user for permission to access their location
    navigator.geolocation.getCurrentPosition(
      // Success callback function
      (position) => {
        // Get the user's latitude and longitude coordinates
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
  
        // Do something with the location data, e.g. display on a map
        // console.log(`Latitude: ${lat}, longitude: ${lng}`);
        const apiUrl = 'https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng+'&format=json';
      
      axios.get(apiUrl)
        .then(response => {
          const data = response.data;
          const city  = data.address["city"];
          // console.log('Location: ' + city);
          fetchWeather(city);
          fetchForecast(city);
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
      },
      // Error callback function
      (error) => {
        // Handle errors, e.g. user denied location sharing permissions
        console.error("Error getting user location:", error);
      }
    );
  } else {
    // Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
    return alert('Please turn on the location'+getCityByLatLong());
  }
}



function getWeekDay(dt){
  var date = new Date(dt * 1000);
  var day_from_date = date.getDay();
    if(day_from_date == 0){
       return 'Sunday';
    }
    else if(day_from_date == 1){
      return 'Monday';
    }
    else if(day_from_date == 2){
      return 'Tuesday';
    }
    else if(day_from_date == 3){
      
      return 'Wednesday';
    }
    else if(day_from_date == 4){
    
      return 'Thursday';
    }
    else if(day_from_date == 5){
    
      return 'Friday';
    }
    else if(day_from_date == 6){
   
      return 'Saturday';
    }
    else{
     
        return 'Invalid Day';
    }
}

function getCurrentDate(dt) {
 var day = new Date(dt * 1000);
 return `${day.toLocaleString('default', { day: 'numeric' })} ${day.toLocaleString('default', { month: 'long' })} ${day.toLocaleString('default', { year: 'numeric' })}`
 
 }

    function timeConverter(isoTime){
      const timestamp = new Date(isoTime).getTime() / 1000; // Convert to UNIX timestamp
      const istOffset = 5.5 * 60 * 60; // IST offset in seconds
      const istTimestamp = timestamp + istOffset; // Add IST offset
      const istDate = new Date(istTimestamp * 1000); // Convert back to JavaScript Date object
   
      const options = {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      };
      return  `${istDate.toLocaleString('default', { day: 'numeric' })} 
               ${istDate.toLocaleString('default', { month: 'long' })} \n
               ${istDate.toLocaleString('default', { year: 'numeric' })} \n
               ${istDate.toLocaleString("en-US", options)}`;      
              
    }

  