var weatherData = {
city: document.querySelector("#city"),
weather: document.querySelector("#weather"),
temperature: document.querySelector("#temp"),
temperatureValue: 0,
units: "C"
}

function switchUnits() {
	if (weatherData.units == "C") {
		weatherData.temperatureValue = Math.round(weatherData.temperatureValue * 9/5 + 32);
			weatherData.units = "F";
		}
	else {
		weatherData.temperatureValue = Math.round((weatherData.temperatureValue - 32) *
		5/9);
			weatherData.units = "C";
		}
		
	weatherData.temperature.innerHTML = weatherData.temperatureValue +
	weatherData.units;
	}
	
function getLocationAndWeather() {
if (window.XMLHttpRequest) {
	var xhr = new XMLHttpRequest();
	
	xhr.addEventListener("load", function() {
	var response = JSON.parse(xhr.responseText)
	
	
	console.log(response);
	
	var position = {
		latitude: response.latitude,
		longitude: response.longitude
	};
	
	var cityName = response.name;
	var cityTemp = response.main.temp;
	
	console.log(cityName);
	console.log(cityTemp);
	
	weatherData.city.innerHTML = cityName;
	
	var TempC = Math.round(cityTemp - 273.15);
	weatherData.temperature.innerHTML = TempC + "C";
	weatherData.temperatureValue = TempC;
	}, false);
	
	
	
	xhr.addEventListener("error", function(err) {
	alert("Could not complete request") 
	}, false);
	
	xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Virginia%20Beach,VA", true);
	xhr.send();
	}
	
	else{
		alert("Unable to fetch location and weather data");
	}
}

getLocationAndWeather();