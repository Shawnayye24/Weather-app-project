let now = new Date();
let todaysDate = document.querySelector("#todays-date");
let todaysTime = document.querySelector("#todays-time");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
todaysDate.innerHTML = `${month} ${date}, ${year} `;
todaysTime.innerHTML = `Time: ${hours}:${minutes}`;

function showWeatherCondition(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temperature");
  let currentWeatherDecscription = document.querySelector(
    "#current-weather-type"
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let currentHighTemp = document.querySelector("#high-temp");
  let currentLowTemp = document.querySelector("#low-temp");

  fahrenheitTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  currentWeatherDecscription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  currentHighTemp.innerHTML = Math.round(response.data.main.temp_max);
  currentLowTemp.innerHTML = Math.round(response.data.main.temp_min);
}

function searchCity(city) {
  let apiKey = "96771e971243152d6b8948878c26adde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "96771e971243152d6b8948878c26adde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitTemperature = null;
searchCity("New york");
