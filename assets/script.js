// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=cbcfd07d3a67829365edbdfcf51d614d
// API key - cbcfd07d3a67829365edbdfcf51d614d
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

var sideBar = document.getElementById('side-bar');
var searchInput = document.getElementById('side-bar-search');

var getCityWeather = function () {
    
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