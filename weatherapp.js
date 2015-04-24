var weatherData = {
city: document.querySelector("#city"),
weather: document.querySelector("#weather"),
temperature: document.querySelector("#temp"),
temperatureValue: 0,
units: "°F"
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
	
	var TempC = Math.round((cityTemp - 273.15) * 9/5 + 32);
	weatherData.temperature.innerHTML = TempC + "°F";
	weatherData.temperatureValue = TempC;
	}, false);
	
	
	
	xhr.addEventListener("error", function(err) {
	alert("Could not complete request") 
	}, false);
	
	xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Virginia%20Beach,VA", "APPID=b958779bc9d4571103c9b281e099cf81", true);
	xhr.send();
	}
	
	else{
		alert("Unable to fetch location and weather data");
	}
}

getLocationAndWeather();

$(function() {
$('#zipweather').hide();
$('#zipsubmit').hide();
$('#city').hide().fadeIn(2000);
$('#temp').hide().fadeIn(2000, function() {
$('#local').hide().fadeIn(2000, function() {
$('#zipweather').fadeIn(1000, function() {
$('#zipsubmit').fadeIn(1000);
});
});
});
});

function zipWeather() {
if (window.XMLHttpRequest) {
	var xhr = new XMLHttpRequest();
	
	xhr.addEventListener("load", function() {
	
	var response = JSON.parse(xhr.responseText);
	
	console.log(response);
	
	var localCity = response.name;
	var localTemp = response.main.temp;
	
	console.log(localCity, localTemp);
	
	//DOM creation practice, can only be used on 1 submit
	
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
	
	}, false);
	
	xhr.addEventListener("error", function(err) {
	console.log(err);
	}, false);
	
	xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + document.getElementById("zipweather").value, 
	"APPID=b958779bc9d4571103c9b281e099cf81", true);
	
	xhr.send();
	}
	
	else {
		console.log("request didn't send");
		}
	}



