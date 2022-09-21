//Variables
var searchBox = $("#search");
var searchButton = $("#searchButton");

var currentConditions = $("#current-conditions");
var recentSearches = $("#recent");

//Hide Current conditions and recent searches on page load. Will probably need to change recent searches since it should load if there's local storage
currentConditions.hide();
recentSearches.hide();

//Functions
function getInfo(city) {
  var city = searchBox.val();
  console.log(city);

  var apiKey = "5e5caac541b127539886bcfa14cf538f";
  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;
  console.log(apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          getWeather(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to gather data.");
    });
}

function getWeather(data) {
  var lon = data[0].lon;
  var lat = data[0].lat;

  var apiKey = "5e5caac541b127539886bcfa14cf538f";
  var forecastApiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(forecastApiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to gather data.");
    });
}

function displayWeather(data) {
  currentConditions.show();
  console.log(data);
  $("#city-name").text(searchBox.val());
  $("#temp").text("Temperature: " + data.list[0].main.temp);
  $("#wind").text("Wind: " + data.list[0].wind.speed);
  $("#humidity").text("Humidity: " + data.list[0].main.humidity);
}

//Click Events

$("#searchButton").on("click", getInfo);

//Will need later for 5-day display.
// for (var i = 0; i < weatherForecast.list.length; i+=8) {
//     console.log(weatherForecast.list[i].dt_txt);
//   }
