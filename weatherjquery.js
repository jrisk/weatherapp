var weatherData = {
city: document.querySelector("#city"),
weather: document.querySelector("#weather"),
temperature: document.querySelector("#temp"),
cityLocal: document.querySelector("#local"),
tempLocal: document.querySelector("#localtemp"),
temperatureValue: 0,
temperatureValueLocal: 0,
units: "°F",
unitsLocal: "°F"
}

$.ajax({
type: 'GET',
url: 'http://api.openweathermap.org/data/2.5/weather?q=Virginia%20Beach,VA',
APPID: 'b958779bc9d4571103c9b281e099cf81',
data: {},
dataType: 'json',
success: function (data) {
console.log(data);
$('#weather').html(data.name);
// javascript style
var tempF = Math.round((data.main.temp - 273.15) * 9/5 + 32);
$('#temp').html(tempF + '°F');
weatherData.temperatureValue = tempF;
}});

function switchUnits() {
	if (weatherData.units == "°C") {
		weatherData.temperatureValue = Math.round(weatherData.temperatureValue * 9/5 + 32);
			weatherData.units = "°F";
		}
	else {
		weatherData.temperatureValue = Math.round((weatherData.temperatureValue - 32) *
		5/9);
			weatherData.units = "°C";
		}
		
	$('#temp').html(weatherData.temperatureValue + weatherData.units);
	}

