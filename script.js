//Variables
var searchBox = $("#search");
var searchButton = $("#searchButton");
var clearButton = $("#clearButton");

var currentConditions = $("#current-conditions");
var searchHistory = $("#history");
var fiveDayForecast = $("#forecast");

var searchList = [];

//Hide content on page load
currentConditions.hide();
fiveDayForecast.hide();

recent();

//Functions
function getInfo(city) {
  var apiKey = "5e5caac541b127539886bcfa14cf538f";
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;
  console.log(apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          getWeather(city, data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to gather data.");
    });
}

function getWeather(city, data) {
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
          console.log(data);
          displayWeather(city, data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to gather data.");
    });
}

function displayWeather(city, data) {
  currentConditions.show();
  console.log(data);
  var upperCaseCity = upperCase(city);
  $("#city-name").text(upperCaseCity + ", " + data.list[0].dt_txt);
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
    var card = $("#week").append(
      "<div class='col-2 m-2 card bg-light border' ><p>" +
        date +
        "</p> <p>Temp: " +
        forecastTemp +
        " F </p><p>Wind: " +
        forecastWind +
        " MPH</p><p>Humidity: " +
        forecastHumidity +
        "%</p></div>"
    );
    $("#week").append(card);


    // if (i === 1) {
    //   $("#week").append(append);
    // } else if (i === 9) {
    //   $("#week").append(append);
    // } else if (i === 17) {
    //   $("#week").append(append);
    // } else if (i === 25) {
    //   $("#week").append(append);
    // } else if (i === 33) {
    //   $("#week").append(append);
    // }
  }
}

function saveInfo(city) {
  console.log("city", city);
  var upperCaseCity = upperCase(city);
  var line = $("<li class = 'history-hover'>" + upperCaseCity + "</li>");
  $("#history").append(line);
  searchList.push(upperCaseCity);
  console.log(searchList);
  localStorage.setItem("local", JSON.stringify(searchList));

  // var child = $("#history").children().attr("li");
  line.click(function () {
    $("#week").children().remove();
    var city = $(this).text();
    getInfo(city);
  });
}

function recent() {
  var grab = JSON.parse(localStorage.getItem("local"));
  if (grab != null) {
    for (var i = 0; i < grab.length; i++) {
      saveInfo(grab[i]);
    }
  }
}

function upperCase(city) {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

//Click Events

$("#searchButton").on("click", () => {
  getInfo(searchBox.val());
  saveInfo(searchBox.val());
  $("#week").children().remove();
  searchBox.val("");
});

clearButton.on("click", () => {
  localStorage.clear();
  $("#history").children().remove();
});
