var weatherData = {
city: document.querySelector("#city"),
weather: document.querySelector("#weather"),
temperature: document.querySelector("#temp"),
cityLocal: document.querySelector("#local"),
tempLocal: document.querySelector("#localtemp"),
temperatureValue: 0,
temperatureValueLocal: 0,
units: "°F",
unitsLocal: "°F",
//vars to recall weather api incase of error
retryCount: 0,
retryMax: 4
}

function zipWeatherKey(event) {
if (event.which == 13 || event.keyCode == 13) {
	zipWeather()
	}
else {
	return false
}
}

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
		
	weatherData.temperature.innerHTML = weatherData.temperatureValue +
	weatherData.units;
	}
	
// onload request function for static VB weather
function getLocationAndWeather() {
if (window.XMLHttpRequest) {
	var xhr = new XMLHttpRequest();
	}
else {
	
	var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
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
	
	var TempC = Math.round((cityTemp - 273.15) * 9/5 + 32);
	weatherData.temperature.innerHTML = TempC + "°F";
	weatherData.temperatureValue = TempC;
	}, false);
	
	xhr.addEventListener("error", function(err) {
	console.log(err);
	if (weatherData.retryCount <= weatherData.retryMax) {
	weatherData.retryCount++;
	console.log(weatherData.retryCount);
	getLocationAndWeather();
	return;
		}
	else {
	return;
	}
	}, false);
	
	xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Virginia%20Beach,VA", "APPID=b958779bc9d4571103c9b281e099cf81", true);
	xhr.send();
}

getLocationAndWeather();

function switchUnitsLocal() {
	if (weatherData.unitsLocal == "°C") {
		weatherData.temperatureValueLocal = Math.round(weatherData.temperatureValueLocal * 9/5 + 32);
			weatherData.unitsLocal = "°F";
		}
	else {
		weatherData.temperatureValueLocal = Math.round((weatherData.temperatureValueLocal - 32) *
		5/9);
			weatherData.unitsLocal = "°C";
		}
		
	weatherData.tempLocal.innerHTML = weatherData.temperatureValueLocal +
	weatherData.unitsLocal;
	}

function zipWeather() {
if (window.XMLHttpRequest) {
	var xhr = new XMLHttpRequest();
	}
else {
	
	var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xhr.addEventListener("load", function() {
	
	var response = JSON.parse(xhr.responseText);
	
	console.log(response);
	
	var localCity = response.name;
	var localTemp = response.main.temp;
	
	console.log(localCity, localTemp);
	
	weatherData.weather.innerHTML = localCity;
	
	var TempC = Math.round((localTemp - 273.15) * 9/5 + 32);
	weatherData.tempLocal.innerHTML = TempC + "°F";
	weatherData.temperatureValueLocal = TempC;
	
	/*DOM creation practice, can only be used on 1 submit
	
	var newlocal = document.createElement("h1");
	var newtemp = document.createElement("h1");
	
	var child = document.getElementById("childnode");
	var parent = document.getElementById("parentnode");
	
	newlocal.innerHTML = localCity;
	newtemp.innerHTML = localTemp;
	
	parent.insertBefore(newlocal, child);
	parent.insertBefore(newtemp, child);
	
	$('#zipweather').hide();
	$('#zipsubmit').hide();
	*/
	
	}, false);
	
	
	xhr.addEventListener("error", function(err) {
	console.log(err);
	if (weatherData.retryCount <= weatherData.retryMax) {
		weatherData.retryCount++;
		zipWeather();
		console.log(weatherData.retryCount);
		return;
		}
	else {
	return;
	};
	
	}, false);
	
	xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("zipweather").value, true);
	
	xhr.send();
}



