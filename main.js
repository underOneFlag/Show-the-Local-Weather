const _uOF = {};

_uOF.fTemp = null;
_uOF.cTemp = null;

_uOF.weatherAnimation = {
	'Thunderstorm': 'icon-storm',
	'Drizzle': 'icon-drizzle',
	'Rain': 'icon-rain',
	'Snow': 'icon-snow',
	'Clear': 'icon-sun',
	'Clouds': 'icon-cloud'
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

	const icon = document.querySelector('icon');
	const weatherType = _uOF.weatherAnimation[data.weather[0].main];

	icon.classList.remove('icon-loading');

	if(weatherType !== undefined && weatherType !== 'undefined') {
		icon.classList.add(weatherType);
	}
	else if(data.weather[0].icon) {
		icon.innerHTML = '<img src="http://openweathermap.org/img/w/' +
										  data.weather[0].icon + '.png"/>';
	}
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

_uOF.getWeather();