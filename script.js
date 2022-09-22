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
  var id = $("#week").children(); //.attr("#id") ?

  for (var i = 1; i < data.list.length; i += 8) {
    console.log(data.list.length);
    var date = data.list[i].dt_txt;
    var forecastTemp = data.list[i].main.temp;
    var forecastWind = data.list[i].wind.speed;
    var forecastHumidity = data.list[i].main.humidity;

    if (i === 1) {
      console.log(date);
      $("#week")
        .children(0)
        .html(
          "<p>" +
            `${date}` +
            "</p> <p>Temp: " +
            forecastTemp[i] +
            "</p><p>Wind: " +
            forecastWind[i] +
            "</p><p>Humidity: " +
            forecastHumidity[i] +
            "</p>"
        );
    } else if (i === 9) {
      $("#week")
        .children(1)
        .html(
          "<div><p>" +
            date[9] +
            "</p> <p>Temp: " +
            forecastTemp[9] +
            "</p><p>Wind: " +
            forecastWind[9] +
            "</p><p>Humidity: " +
            forecastHumidity[9] +
            "</p></div>"
        );
    } else if (i === 17) {
      $("#week")
        .children(2)
        .html(
          "<div><p>" +
            date[17] +
            "</p> <p>Temp: " +
            forecastTemp[17] +
            "</p><p>Wind: " +
            forecastWind[17] +
            "</p><p>Humidity: " +
            forecastHumidity[17] +
            "</p></div>"
        );
    } else if (i === 25) {
      $("#week")
        .children(3)
        .html(
          "<div><p>" +
            date[25] +
            "</p> <p>Temp: " +
            forecastTemp[25] +
            "</p><p>Wind: " +
            forecastWind[25] +
            "</p><p>Humidity: " +
            forecastHumidity[25] +
            "</p></div>"
        );
    } else if (i === 33) {
      $("#week")
        .children(4)
        .html(
          "<div><p>" +
            date[33] +
            "</p> <p>Temp: " +
            forecastTemp[33] +
            "</p><p>Wind: " +
            forecastWind[33] +
            "</p><p>Humidity: " +
            forecastHumidity[33] +
            "</p></div>"
        );
    }
  }
}

//Click Events

$("#searchButton").on("click", getInfo);
