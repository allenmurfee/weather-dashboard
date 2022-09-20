//Variables
var searchBox = document.querySelector("#search");

//Functions
var getWeather = function (user) {
  var apiKey = "5e5caac541b127539886bcfa14cf538f";
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

//   fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayWeather(data, user);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert("Unable to connect to GitHub");
//     });
};

//Click Events
