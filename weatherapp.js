<script> 

var weatherData = {
city: document.querySelector("#city"),
weather: document.querySelector("#weather"),
temperature: document.querySelector("#temperature"),
temperateValue: 0,
units: "C"
}

function switchUnits() {
	if (weatherData.units == "C") {
		weatherData.temperatureValue = 
		roundTemperature(weatherData.temperatureValue * 9/5 + 32);
			weatherData.units = "F";
		}
	else {
		weatherData.temperatureValue = 
		roundTemperature((weatherData.temperatureValue - 32) *
		5/9);
			weatherData.units = "C";
		}
		
	weatherData.temperature.innerHTML = weatherData.temperatureValue +
	weatherData.units + ", ";
	}
	
function getLocationAndWeather() {
if (window.XMLHttpRequest) {
	var xhr = new XMLHttpRequest();
	
	xhr.addEventListener("load", function() {}, false);
	xhr.addEventListener("error", function() {}, false);
	
	xhr.open("GET", "<URL>", true);
	xhr.send();
	}
	
	else{
		alert("Unable to fetch location and weather data");
	}
}



function apicalling() {
var server = require('http');
server.XMLHttpRequest();
}
</script>