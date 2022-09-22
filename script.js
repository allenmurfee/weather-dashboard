//Variables
var searchBox = $("#search");
var searchButton = $("#searchButton");

var currentConditions = $("#current-conditions");
var searchHistory = $("#history");
var fiveDayForecast = $("#forecast");

//Hide Current conditions and recent searches on page load. Will probably need to change recent searches since it should load if there's local storage
currentConditions.hide();
searchHistory.hide();
fiveDayForecast.hide();

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
  $("#temp").text("Temperature: " + data.list[0].main.temp + " F");
  $("#wind").text("Wind: " + data.list[0].wind.speed + " MPH");
  $("#humidity").text("Humidity: " + data.list[0].main.humidity + "%");

  createForecastCards(data);
}

function createForecastCards(data) {
  fiveDayForecast.show();

  for (var i = 1; i < data.list.length; i += 8) {
    var date = data.list[i].dt_txt;
    var forecastTemp = data.list[i].main.temp;
    var forecastWind = data.list[i].wind.speed;
    var forecastHumidity = data.list[i].main.humidity;

    if (i === 1) {
      $("#week").append(
        "<div class='bg-light border' ><p>" +
          date +
          "</p> <p>Temp: " +
          forecastTemp +
          "</p><p>Wind: " +
          forecastWind +
          "</p><p>Humidity: " +
          forecastHumidity +
          "</p></div>"
      );
    } else if (i === 9) {
      $("#week").append(
        "<div class='bg-secondary border'><p>" +
          date +
          "</p> <p>Temp: " +
          forecastTemp +
          "</p><p>Wind: " +
          forecastWind +
          "</p><p>Humidity: " +
          forecastHumidity +
          "</p></div>"
      );
    } else if (i === 17) {
      $("#week").append(
        "<div class='bg-light border'><p>" +
          date +
          "</p> <p>Temp: " +
          forecastTemp +
          "</p><p>Wind: " +
          forecastWind +
          "</p><p>Humidity: " +
          forecastHumidity +
          "</p></div>"
      );
    } else if (i === 25) {
      $("#week").append(
        "<div class='bg-secondary border'><p>" +
          date +
          "</p> <p>Temp: " +
          forecastTemp +
          "</p><p>Wind: " +
          forecastWind +
          "</p><p>Humidity: " +
          forecastHumidity +
          "</p></div>"
      );
    } else if (i === 33) {
      $("#week").append(
        "<div class='bg-light border'><p>" +
          date +
          "</p> <p>Temp: " +
          forecastTemp +
          "</p><p>Wind: " +
          forecastWind +
          "</p><p>Humidity: " +
          forecastHumidity +
          "</p></div>"
      );
    }
  }
}

//Click Events

$("#searchButton").on("click", getInfo);
