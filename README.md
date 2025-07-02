# Weather-Dashboard


A dynamic and responsive **Weather Dashboard** web app that allows users to search for any city and view the **current weather** and a **5-day forecast** using the [OpenWeatherMap API](https://openweathermap.org/api). It also remembers your recent searches and allows toggling between Celsius and Fahrenheit units.

---

## 🎯 Objective

Build a weather application where:
- Users can **search any city**
- See **current weather** and a **5-day forecast**
- Recently searched cities are saved for easy access
- Weather data is pulled from **OpenWeatherMap API**

---

## 📷 Output Preview

- 🔍 Search for a city
- ☀️ Real-time weather with temperature, wind, humidity, and icon
- 📅 5-day weather forecast cards
- 📌 Saved city search history (last 5 cities)
- 🔁 Click history items to reload data
- 🌡️ Unit toggle for °C / °F
- ⚠️ Error messages for invalid city input

---

## ✅ Features

### 🔹 Core Features

1. **City Search**  
   - Input a city name and get weather details

2. **Current Weather Display**  
   - Shows temperature, wind speed, humidity, and weather icon

3. **5-Day Forecast**  
   - Displays weather info in a card layout for the next 5 days

4. **Search History**  
   - Stores the last 5 searched cities in `localStorage`

5. **Clickable History Items**  
   - Click to reload weather data for saved cities

---

### 🔸 Bonus Features

- **Unit Toggle**: Switch between Celsius and Fahrenheit
- **Error Handling**: Displays alert for invalid city names

---

## 🛠 Tech Stack

- **HTML** – Layout and structure
- **CSS** – Styling and responsiveness
- **JavaScript** – Dynamic interactivity, API integration
- **OpenWeatherMap API** – Source of weather data
