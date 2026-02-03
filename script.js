const apiKey = "cc1fba2ec4a24508fd6913da06d2b5a6
"; // Replace with your OpenWeatherMap API key

const button = document.getElementById("getWeatherBtn");
const weatherDiv = document.getElementById("weather");

button.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeather(city);
    } else {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name } = data;
    const { temp } = data.main;
    const { description } = data.weather[0];

    weatherDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Description: ${description}</p>
    `;
}
