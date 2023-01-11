// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=cbcfd07d3a67829365edbdfcf51d614d
// API key - cbcfd07d3a67829365edbdfcf51d614d
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid=cbcfd07d3a67829365edbdfcf51d614d

var sideBar = document.getElementById('side-bar');
var searchInput = document.getElementById('side-bar-search');

var getCityWeather = function (city) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=cbcfd07d3a67829365edbdfcf51d614d';
    var apiURLForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=cbcfd07d3a67829365edbdfcf51d614d';
    
    // console.log(apiURL);
    fetch(apiURL) 
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                renderWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('unable to retrieve weather status');
        });
    
    fetch(apiURLForecast) 
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                renderForecast(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('unable to retrieve forecast');
        });
}

    // data needed from api call are data.name, data.weather[0].main, data.weather[0].icon, data.main.temp, data.main.humidity.
var renderWeather = function (data, city) {
    // 
}

var renderForecast = function (data, city) {

}

// listen to user input
searchInput.addEventListener('submit', function(event) {
    event.preventDefault();

    var city = event.target[0].value.trim();

    if (city) {
        getCityWeather(city)
        document.getElementById('city-input').textContent = '';
    } else {
        alert('Please enter a city name');
    }
});