const API_KEY = '96d22cdfc0a96fd0810e547afd0e31b6'; // Replace with your OpenWeatherMap API key
let currentCity = 'London'; // Default city
const fetchWeatherData = async () => {
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&units=metric&appid=${API_KEY}`;
try {
const response = await fetch(API_URL);
if (!response.ok) {
throw new Error(`Network response was not ok: ${response.statusText}`);
}
const data = await response.json();
return data;
} catch (error) {
console.error('Fetch error:', error);
}
};

const displayWeatherData = async () => {
const data = await fetchWeatherData();
if (!data) return;

// Extract and format data
const dates = data.list.map(item => new Date(item.dt_txt).toLocaleDateString());
const temperatures = data.list.map(item => item.main.temp);
const description = data.list[0].weather[0].description; // Weather description
const humidity = data.list[0].main.humidity; // Humidity

// Display additional information
document.getElementById('description').textContent = `Weather Description: ${description}`;
document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;

// Create the chart
const ctx = document.getElementById('weatherChart').getContext('2d');
new Chart(ctx, {
type: 'line',
data: {
labels: dates,
datasets: [{
label: 'Temperature (°C)',
data: temperatures,
borderColor: 'rgba(75, 192, 192, 1)',
backgroundColor: 'rgba(75, 192, 192, 0.2)',
borderWidth: 1
}]
},
options: {
responsive: true,
scales: {
x: {
title: {
display: true,
text: 'Date'
}
},
y: {
title: {
display: true,
text: 'Temperature (°C)'
}
}
}
}
});
};

const handleCityChange = () => {
currentCity = document.getElementById('citySelect').value;
displayWeatherData();
};

// Initialize the app and set up event listener
document.getElementById('citySelect').addEventListener('change', handleCityChange);

// Display weather data for the default city on page load
displayWeatherData();
