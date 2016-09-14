const _uOF = {};

_uOF.fTemp = null;
_uOF.cTemp = null;

_uOF.weatherAnimation = {
	'Thunderstorm': ['Clear', 0],
	'Drizzle': ['Overcast', 1],
	'Rain': ['Snowing', 2],
	'Snow': ['Raining', 3],
	'Clear': ['Stormy', 4],
	'Clouds': ['Drizzling', 5]
};

_uOF.getWeatherData = (coords, cb) => {
	console.log(coords);
  const xhr = new XMLHttpRequest();
  xhr.onload = () => cb(null, xhr.responseText);
  xhr.onerror = (err) => cb(err);
  xhr.open('POST', 'https://ring-panther.hyperdev.space');
  xhr.send(JSON.stringify(coords));
};

_uOF.switchTemp = () => {
	const degreesElement = document.querySelector('temperature');
	const cfElement = document.querySelector('button');

	if(cfElement.textContent == 'F') {
		degreesElement.textContent = _uOF.cTemp + '°';
		cfElement.textContent = 'C';
	}
	else {
		degreesElement.textContent = _uOF.fTemp + '°';
		cfElement.textContent = 'F';
	}
};

_uOF.setWeather = (data) => {
	_uOF.fTemp = Math.round(data.main.temp * 9.0 / 5.0 - 459.67);
	_uOF.cTemp = Math.round(data.main.temp - 273.15);

	document.querySelector('location').
		textContent = data.name + ', ' + data.sys.country;

	_uOF.switchTemp();

	document.querySelector('weather').			
		textContent = data.weather[0].main;

	document.querySelector('animation').
		classList.add(_uOF.weatherAnimation[data.weather[0].main]);
};

document.querySelector('button').onclick = (e) => _uOF.switchTemp();

_uOF.getWeather = () => {
	if(!navigator.geolocation)
		console.log('no geolocation data');

	const pos = navigator.geolocation.getCurrentPosition((pos) => {
		const coords = {
			'lat': pos.coords.latitude,
			'lon': pos.coords.longitude
		};

		_uOF.getWeatherData(coords, (err, data) => {
			if(err) return console.log(err);
			_uOF.setWeather(JSON.parse(data));
		});
	}, (err) => console.log(err), {'timeout':5000});
};

// _uOF.getWeather();