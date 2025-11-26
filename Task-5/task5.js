const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfo.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    weatherInfo.innerHTML = "Fetching weather data...";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const { temp, humidity } = data.main;
    const condition = data.weather[0].description;

    weatherInfo.innerHTML = `
      <h3>${data.name}</h3>
      <p>Temperature: ${temp}°C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Condition: ${condition}</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `Error: ${error.message}`;
  }
});