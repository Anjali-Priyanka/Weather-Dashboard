// Your OpenWeatherMap API key
const apiKey = "f2f36fb7b143e2b3195d9eeeaac8ecbe";

// Default unit (metric = Celsius, imperial = Fahrenheit)
let unit = "metric";

// Fetch current weather data
function fetchWeather(city) {
  let cityName = city || document.getElementById("cityInput").value.trim();

  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  // API call for current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);

      // Display temperature and wind unit based on selected system
      const tempUnit = unit === "metric" ? "°C" : "°F";
      const windUnit = unit === "metric" ? "M/S" : "MPH";

      // Show weather info
      document.getElementById("currentWeather").classList.remove("hidden");
      document.getElementById("cityName").innerText = `${data.name} (${new Date().toISOString().split("T")[0]})`;
      document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}${tempUnit}`;
      document.getElementById("wind").innerText = `Wind: ${data.wind.speed} ${windUnit}`;
      document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
      document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("description").innerText = data.weather[0].description;

      saveHistory(cityName);
      fetchForecast(cityName);
    })
    .catch(error => {
      alert("Error: " + error.message);
      document.getElementById("currentWeather").classList.add("hidden");
      document.getElementById("forecast").innerHTML = "";
    });
}

// Fetch 5-day forecast data
function fetchForecast(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const tempUnit = unit === "metric" ? "°C" : "°F";
      const windUnit = unit === "metric" ? "M/S" : "MPH";

      let forecastHTML = "";

      // Show 5 forecast cards (every 24 hours)
      for (let i = 7; i <= 31; i += 8) {
        const day = data.list[i];
        forecastHTML += `
          <div class="bg-gray-600 text-white p-4 rounded">
            <h3 class="text-center">${day.dt_txt.split(" ")[0]}</h3>
            <div class="flex justify-center my-2">
              <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="w-12 h-12" />
            </div>
            <p>Temp: ${day.main.temp}${tempUnit}</p>
            <p>Wind: ${day.wind.speed} ${windUnit}</p>
            <p>Humidity: ${day.main.humidity}%</p>
          </div>`;
      }

      document.getElementById("forecast").innerHTML = forecastHTML;
    })
    .catch(() => {
      document.getElementById("forecast").innerHTML = "";
    });
}

// Save searched city to history (max 5)
function saveHistory(city) {
  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
  history = history.filter(item => item !== city); // Avoid duplicates
  history.unshift(city); // Add to beginning
  if (history.length > 5) history.pop(); // Keep only 5
  localStorage.setItem("weatherHistory", JSON.stringify(history));
  renderHistory();
}

// Show search history buttons
function renderHistory() {
  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
  let buttons = "";
  history.forEach(city => {
    buttons += `<button onclick="fetchWeather('${city}')" class="w-full bg-gray-200 py-1 rounded mb-1">${city}</button>`;
  });
  document.getElementById("history").innerHTML = buttons;
}

// Use current location (geolocation)
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Get weather from lat/lon
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          fetchWeather(data.name);
        });
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Toggle unit between Celsius and Fahrenheit
function toggleUnits() {
  unit = unit === "metric" ? "imperial" : "metric";
  const currentCity = document.getElementById("cityInput").value.trim();
  if (currentCity) {
    fetchWeather(currentCity);
  } else {
    alert("Unit changed. Please search for a city to see changes.");
  }
}

// Run once on page load
renderHistory();
