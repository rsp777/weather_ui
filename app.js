window.onload = () => {
  getCityByLatLong();
};
function search(event) {
  if(event.keyCode == 13) {
    getWeather();
    getForecast();
  }
}
function getWeather() {
  const cityInput = document.getElementById("city-input");
  city = cityInput.value;
  console.log('City ; '+city);
  fetchWeather(city);
}

function fetchWeather(city){
  const xhr = new XMLHttpRequest();
console.log('Inside fetchweather : '+city);
  // Make an API call to retrieve weather data for the city
  // Replace the URL with your actual API endpoint
const url = 'https://192.168.1.7:8090/weather/'+city;
console.log(url);
// console(xhr.getResponseHeader());
xhr.open('GET',url,true);
 xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); xhr.setRequestHeader('Access-Control-Allow-Origin', '*');  
xhr.send();

xhr.onload = () =>{
  
  // we can change the data type to json also by
  console.log(xhr.status);
 if(xhr.status == 200){

  const data = JSON.parse(xhr.response);
  console.log(data);
  const weatherInfo = document.getElementById("weather-info");
  console.log(weatherInfo);
  // console.log("Rain : "+Object.keys(data.rain)[0].value);
  // console.log("Rain : "+data.rain["1h"]);
  console.log("Speed : "+data.wind["speed"]);
  console.log("Wind Direction : "+data.wind["deg"]);
  console.log("Current Date : "+getCurrentDate(data.dt));
  console.log("Current Day : "+getWeekDay(date.dt));


  // console.log("Dateeeee : "+timeConverter(data.dt));

    // document.getElementById("current").innerHTML = `Current Weather`;
    // document.getElementById("city").innerHTML = data.name;
    // document.getElementById("temp").innerHTML = `${data.main.temp}<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`;
    // document.getElementById("humd").innerHTML = `Humidity: ${data.main.humidity}%`;
    // document.getElementById("desc").innerHTML = `Description: ${data.weather[0].description}`;


    document.getElementById("day").innerHTML  = getWeekDay(data.dt);
    document.getElementById("date").innerHTML = getCurrentDate(data.dt);
    
    document.getElementById("city").innerHTML = data.name;
    // console.log('Event  : '+event.keyCode);
    document.getElementById("temp").innerHTML = `${data.main.temp}<sup>o</sup>C<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`;
    
    if(data.rain && data.rain["1h"]){
      document.getElementById("1h").innerHTML =`${data.rain["1h"]} <img src="images/icon-umberella.png">`;

    }
    else{
      document.getElementById("1h").innerHTML =`${data.weather[0].description} <img src="images/icon-umberella.png">`;

    }

    document.getElementById("wind").innerHTML = `<img src="images/icon-wind.png" alt="">${data.wind["speed"]}m/s`;
    document.getElementById("deg").innerHTML = `<img src="images/icon-compass.png" alt="">${data.wind["deg"]}`;

    // document.getElementById("deg").innerHTML = windDirection()
    // ${data.rain["1h"]}
    // document.getElementById("humd").innerHTML = `Humidity: ${data.main.humidity}%`;
    // document.getElementById("desc").innerHTML = `Description: ${data.weather[0].description}`
 
 }
 else{
    alert("Incorrect City "+xhr.status.toString());
    alert("Please enter correct City");
    window.location.reload();
 }
  
};

}

function getForecast(){
  const cityInput = document.getElementById("city-input");
  const city = cityInput.value;
  console.log('City ; '+city);
  fetchForecast(city);
}

function fetchForecast(city){
  // var container = document.getElementById("forecast-container");
  // container.innerHTML = "h";
  const xhr = new XMLHttpRequest();

  console.log(city);
  const url = 'https://192.168.1.7:8083/forecast/'+city;

  console.log(url);
  xhr.open('GET',url,true);
  xhr.send();

  xhr.onload = () => {

    console.log('Status : '+xhr.status);

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
      console.log(xhr.status)
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
  // iconImg.width = 110;
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

// function displayForecast(forecastData) {
//   const forecastContainer = document.getElementById("forecast-container");
//   forecastContainer.innerHTML = ""; // Clear the existing content

//   forecastData.forEach((forecast) => {
//     const date = forecast.date;
//     const icon = forecast.icon;
//     const temperatureHigh = forecast.temperatureHigh;
//     const temperatureLow = forecast.temperatureLow;

//     const forecastItem = createForecastItem(date, icon, temperatureHigh, temperatureLow);
//     forecastContainer.appendChild(forecastItem);
//   });
// }

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
        console.log(`Latitude: ${lat}, longitude: ${lng}`);
        const apiUrl = 'https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lng+'&format=json';
        console.log('API URL : '+apiUrl);
      axios.get(apiUrl)
        .then(response => {
          const data = response.data;
          const city  = data.address["city"];
          console.log('Location: ' + city);
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
    return alert('Please turn on the location'+getLatLong());
  }
}



function getWeekDay(dt){
  var date = new Date(dt * 1000);
  var day_from_date = date.getDay();
  console.log('Dayyy : '+day_from_date);
    if(day_from_date == 0){
      console.log('day_from_date is : '+day_from_date);
       return 'Sunday';
    }
    else if(day_from_date == 1){
      console.log('day_from_date is : '+day_from_date);
      return 'Monday';
    }
    else if(day_from_date == 2){
      console.log('day_from_date is : '+day_from_date);
      return 'Tuesday';
    }
    else if(day_from_date == 3){
      console.log('day_from_date is : '+day_from_date);
      return 'Wednesday';
    }
    else if(day_from_date == 4){
      console.log('day_from_date is : '+day_from_date);
      return 'Thursday';
    }
    else if(day_from_date == 5){
      console.log('day_from_date is : '+day_from_date);
      return 'Friday';
    }
    else if(day_from_date == 6){
      console.log('day_from_date is : '+day_from_date);
      return 'Saturday';
    }
    else{
      console.log('day_from_date is : '+day_from_date);
        return 'Invalid Day';
    }
}

function getCurrentDate(dt) {
 var day = new Date(dt * 1000);
 return `${day.toLocaleString('default', { day: 'numeric' })} ${day.toLocaleString('default', { month: 'long' })} ${day.toLocaleString('default', { year: 'numeric' })}`
 
 }

// function getDatee(dt){
//   var date = new Date(dt * 1000).getDate();
//   console.log('DAteeeeeeeeeeeeeee : '+date);
//   // var date = new Date(dt).getDay(); 
//    return date;
// }

    function timeConverter(isoTime){
      const timestamp = new Date(isoTime).getTime() / 1000; // Convert to UNIX timestamp
      const istOffset = 5.5 * 60 * 60; // IST offset in seconds
      const istTimestamp = timestamp + istOffset; // Add IST offset
      const istDate = new Date(istTimestamp * 1000); // Convert back to JavaScript Date object
      console.log('Tarik : '+istDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      return istDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }); 
    }

