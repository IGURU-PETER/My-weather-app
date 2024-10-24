// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.querySelector('.city-name');
    const dateTime = document.querySelector('.date-time');
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind-speed');

    const apiKey = '15587b238b0b9e3aedd98409947567c4';

    const fetchWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        }
    };

    const displayWeather = (data) => {
        const { name, sys, main, weather, wind } = data;
        cityName.textContent = `${name}, ${sys.country}`;
        dateTime.textContent = new Date().toLocaleString();
        weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
        temperature.textContent = `${Math.round(main.temp)}°C`;
        description.textContent = weather[0].description;
        humidity.textContent = main.humidity;
        windSpeed.textContent = wind.speed;
    };

    // Fetch weather for a specific city when the search button is clicked
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    // Automatically fetch weather based on the user's location
    const fetchWeatherByLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(data => displayWeather(data))
                    .catch(error => alert('Unable to fetch weather data.'));
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    // Call the location-based weather fetching function on page load
    fetchWeatherByLocation();
});
