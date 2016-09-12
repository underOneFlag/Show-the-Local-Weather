const _uOF = {};

_uOF.get = (cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => cb(null, xhr.responseText);
  xhr.onerror = (err) => cb(err);
  xhr.open('POST', '');
  // xhr.setRequestHeader("Accept", "application/json");
  xhr.send();
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