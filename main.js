const _uOF = {};

_uOF.getWeatherData = function blue(lat, lon, cb) {
	const url = 'http://api.openweathermap.org/data/2.5/weather?' + 
							'lat=' + lat + '&lon=' + lon + '&callback=test';
	// const url = 'http://www.openweathermap.org';
  // const url = 'http://www.google.com/';
  const xhr = new XMLHttpRequest();
  xhr.onload = () => cb(null, xhr.responseText);
  xhr.onerror = (err) => cb(err);
  xhr.open('GET', url);
  // xhr.setRequestHeader("Accept", "application/json");
  xhr.send();
};

_uOF.getWeather = function red() {
	if(!navigator.geolocation)
		console.log('no geolocation data');

	const pos = navigator.geolocation.getCurrentPosition(function green(pos) {
		console.log(pos);
		_uOF.getWeatherData(pos.latitude, pos.longitude, function g(err, data) {
			if(err) return console.log(err);
			cnosole.log(data);
		});
	}, (err) => {
		console.log(err);
		_uOF.getWeatherData(-122, 45, (err, data) => {
			console.log(err||data);
		});
	}, {'timeout':5000});
};

_uOF.weather = {
	'clear': ['Clear', 0],
	'overcast': ['Overcast', 1],
	'snowing': ['Snowing', 2],
	'raining': ['Raining', 3],
	'stormy': ['Stormy', 4],
	'light-rain': ['Drizzling', 5]
};

_uOF.switchTemp = (deg, cf) => {
	deg = Number(deg);
	if(cf == 'C')
		return Math.round(deg * 9 / 5 + 32) + '°';
	else
		return Math.round((deg - 32) * 5 / 9) + '°';
};

document.querySelector('button').onclick = (e) => {
	_uOF.cf = e.target.textContent;
	const degreesElement = e.target.previousElementSibling;
	const degrees = degreesElement.textContent.match(/\d+/)[0];
	degreesElement.textContent = _uOF.switchTemp(degrees, _uOF.cf);
	e.target.textContent = _uOF.cf == 'C' ? 'F' : 'C';
};

_uOF.getWeather();