//Variables
var searchBox = $("#search");
var searchButton = $("#searchButton");

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
  getWeather(city);
}

function getWeather(geoData) {
  var apiKey = "5e5caac541b127539886bcfa14cf538f";
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lat +
    "&appid=" +
    apiKey;

  var lon = geoData[0].lon;
  var lat = geoData[0].lat;
  console.log(lon);
}

//Click Events

$("#searchButton").on("click", getInfo);

//Will need later for 5-day display.
// for (var i = 0; i < weatherForecast.list.length; i+=8) {
//     console.log(weatherForecast.list[i].dt_txt);
//   }
