var weatherData = {
temperatureValue: 0,
localTemperatureValue: 0,
units: "°F",
localUnits: "°F"
}

$.ajax({
type: 'GET',
url: 'http://api.openweathermap.org/data/2.5/weather?q=Virginia%20Beach,VA',
APPID: 'b958779bc9d4571103c9b281e099cf81',
data: {},
dataType: 'json',
success: function (data) {
console.log(data);
$('#city').html(data.name);
// javascript style
var tempF = Math.round((data.main.temp - 273.15) * 9/5 + 32);
$('#temp').html(tempF + '°F');
weatherData.temperatureValue = tempF;
},
timeout: 3000,
retryCount: 0,
retryLimit: 5,
error: function(jqXHR, textStatus, errorThrown) { 
this.retryCount++;
	if (this.retryCount <= this.retryLimit) {
	//try again
	$.ajax(this);
	return;
	};
return;
}
});

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
	
function zipWeatherKey(event) {
if (event.which == 13 || event.keyCode == 13) {
	zipWeather()
	}
else {
	return false
}
}

function zipWeather() {
$.ajax({
type: 'GET',
url: 'http://api.openweathermap.org/data/2.5/weather?q=' + $("#zipweather").val(),
APPID: 'b958779bc9d4571103c9b281e099cf81',
data: {},
dataType: 'json',
success: function(data) {
console.log(data.name);
$('#weather').html(data.name);
//change from kelvin
var localTempF = Math.round((data.main.temp - 273.15) * 9/5 + 32);
$('#localtemp').html(localTempF + weatherData.localUnits);
weatherData.localTemperatureValue = localTempF;
},
timeout: 3000,
retryCount: 0,
retryLimit: 5,
error: function(jqXHR, textStatus, errorThrown) { 
this.retryCount++;
	if (this.retryCount <= this.retryLimit) {
	//try again
	$.ajax(this);
	return;
	}
return;
}
});
};

function switchUnitsLocal() {
if (weatherData.localUnits === "°F") {
	weatherData.localTemperatureValue = Math.round((weatherData.localTemperatureValue - 32) * 5/9);
	weatherData.localUnits = "°C";
	}
else {
	weatherData.localTemperatureValue = Math.round(weatherData.localTemperatureValue * 9/5 + 32);
	weatherData.localUnits = "°F";
	}
$('#localtemp').html(weatherData.localTemperatureValue + weatherData.localUnits);
}


