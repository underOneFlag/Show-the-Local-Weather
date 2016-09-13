const _uOF = {};

_uOF.getWeatherData = (coords, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => cb(null, xhr.responseText);
  xhr.onerror = (err) => cb(err);
  xhr.open('POST', 'https://ring-panther.hyperdev.space/');
  xhr.send(JSON.stringify(coords));
};

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
			console.log(data);
		});
	}, (err) => console.log(err), {'timeout':5000});
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