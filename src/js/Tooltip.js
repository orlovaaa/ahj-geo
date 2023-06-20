export default class Tooltip {
	constructor() {
	  this.text = '';
	}

	showTooltip(text) {
	  this.text = text;

	  const errorContainer = document.createElement('div');
	  errorContainer.classList.add('error-container');

	  const dataText = document.createElement('p');
	  dataText.classList.add('text');
	  dataText.textContent = this.text;

	  errorContainer.appendChild(dataText);

	  const userCoords = document.querySelector('.popup__position');
	  userCoords.offsetParent.appendChild(errorContainer);
	  //errorContainer.style.top = `${userCoords.offsetTop + userCoords.offsetHeight / 2 - errorContainer.offsetHeight / 2}px`;
	  //errorContainer.style.left = `${userCoords.offsetLeft + userCoords.offsetWidth + 5}px`;
	}
}
