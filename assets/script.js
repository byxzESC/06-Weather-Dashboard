var sideBarEl = document.getElementById('side-bar');
var searchInput = document.getElementById('side-bar-search');
var currentWeatherEl = document.getElementById('current-weather');
var forecastWeatherEl = document.getElementById('forecast-weather');
var forecastTitleEl = document.getElementById('forecast-title');

var getCityWeather = function (city) {
    currentWeatherEl.innerHTML = "";
    forecastWeatherEl.innerHTML = "";
    
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=cbcfd07d3a67829365edbdfcf51d614d';
    var apiURLForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=cbcfd07d3a67829365edbdfcf51d614d';
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var temperature = data.main.temp;
                    var wind = data.wind.speed;
                    var humidity = data.main.humidity;
                    var weatherIconURL = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
                    renderWeather(temperature, wind, humidity, weatherIconURL, city);
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
                    renderForecast(data.list, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('unable to retrieve forecast');
        });


}

// Acceptance Criteria --- view current weather conditions for that city
// presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
var renderWeather = function (temperature, wind, humidity, weatherIconURL, city) {
    var currentWeatherBlock = document.createElement('div');

    // City name
    var titleEl = document.createElement('h2');
    titleEl.textContent = city;

    // weather ICON
    var weatherIconEl = document.createElement('img');
    weatherIconEl.setAttribute('src', weatherIconURL);

    // weather details
    var contentUl = document.createElement('ul');
    var tempLi = document.createElement('li');
    var windLi = document.createElement('li');
    var humidityLi = document.createElement('li');
    tempLi.textContent = 'Temp: ' + temperature + '°F\n';
    windLi.textContent = 'Wind: ' + wind + ' MPH\n';
    humidityLi.textContent = 'Humidity: ' + humidity + '%';
    contentUl.appendChild(weatherIconEl);
    contentUl.appendChild(tempLi);
    contentUl.appendChild(windLi);
    contentUl.appendChild(humidityLi);


    currentWeatherBlock.appendChild(titleEl);
    titleEl.appendChild(weatherIconEl);

    currentWeatherBlock.appendChild(contentUl);
    currentWeatherEl.append(currentWeatherBlock);
}

// Acceptance Criteria --- view future weather conditions for that city
// presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
var renderForecast = function (data) {
    forecastTitleEl.style.display = 'flex';
    
    for (var i = 0; i < data.length; i++) {
        var timeHolder = data[i].dt_txt.split(" ", 2)[1]
        if (timeHolder === "12:00:00") {

            var forecastBlock = document.createElement('div');
            forecastBlock.classList.add('forecast-box');
            // date of the forecast
            var dateEl = document.createElement('h4');
            dateEl.textContent = data[i].dt_txt.split(" ", 2)[0];

            // weather ICON
            var weatherIconURL = 'https://openweathermap.org/img/wn/' + data[i].weather[0].icon + '.png';
            var weatherIconEl = document.createElement('img');
            weatherIconEl.setAttribute('src', weatherIconURL);

            // weather forecast detail
            var temperature = data[i].main.temp;
            var wind = data[i].wind.speed;
            var humidity = data[i].main.humidity;
            var contentUl = document.createElement('ul');
            var tempLi = document.createElement('li');
            var windLi = document.createElement('li');
            var humidityLi = document.createElement('li');
            tempLi.textContent = 'Temp: ' + temperature + '°F\n';
            windLi.textContent = 'Wind: ' + wind + ' MPH\n';
            humidityLi.textContent = 'Humidity: ' + humidity + '%';

            forecastBlock.appendChild(dateEl);
            contentUl.appendChild(weatherIconEl);
            contentUl.appendChild(tempLi);
            contentUl.appendChild(windLi);
            contentUl.appendChild(humidityLi);
            forecastBlock.appendChild(contentUl);

            forecastWeatherEl.append(forecastBlock);
        }
    }
}

// Acceptance Criteria --- click on a city in the search history, 
// presented with current and future conditions for that city
// render history search buttons
var previousSearch = function (city)  {
    var searchBtn = document.createElement('button');
    searchBtn.textContent = city;
    searchBtn.classList.add("btn", "btn-secondary", "w-100", "py-2", "my-2")

    searchBtn.addEventListener('click', function(event) {
        event.preventDefault();
    
        console.log(event.target.textContent);
        var city = event.target.textContent;

        if (city) {
            getCityWeather(city);
        }
    });

    sideBarEl.appendChild(searchBtn);
}

// listen to user input
searchInput.addEventListener('submit', function (event) {
    event.preventDefault();

    var city = event.target[0].value.trim();

    if (city) {
        previousSearch(city);
        getCityWeather(city);
        document.getElementById('city-input').textContent = '';
    } else {
        alert('Please enter a city name');
    }

    event.target[0].value = "";
});

