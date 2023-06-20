import AddMessage from './AddMessage';
import ErrorModal from './ErrorModal';
import Tooltip from './Tooltip';

export default class DataForm {
	constructor(container) {
		if (typeof container === 'string') {
			this.container = document.querySelector(container);
		} else {
			this.container = container;
		}

		this.error = '';
		this.dataArray = null;
		this.userMessage = null;
		this.addMessage = new AddMessage();

		this.showPosition = this.showPosition.bind(this);
		this.getDataInput = this.getDataInput.bind(this);
		this.handleErrorPosition = this.handleErrorPosition.bind(this);
	}

	showPosition(position) {
		if (!position) {
			return;
		}

		const modal = document.querySelector('.popup');

		if (modal) {
			this.error.closeModalError(modal);
			this.userMessage.focus();
		}

		this.addMessage.addMessageInContainer(this.message);

		const { latitude } = position.coords;
		const { longitude } = position.coords;

		const dataGeoPosition = document.querySelectorAll('.message-item__geo');

		const lastMessage = [...dataGeoPosition].pop();

		lastMessage.textContent = `[${latitude}, ${longitude}]`;

		const messageValue = document.querySelector('.main__textarea');
		messageValue.value = '';
	}

	checkInput(data) {
		let dataCoords = data.replace(/\[|\]/g, '');

		dataCoords = dataCoords.replace(/\s/g, '');
		dataCoords = dataCoords.replace(/−/g, '-');

		this.dataArray = dataCoords.split(',');

		if (this.dataArray.length > 2 || this.dataArray.length <= 1) {
			const tooltip = new Tooltip();

			tooltip.showTooltip('Введите 2 значения');

			return false;
		}

		for (const item of this.dataArray) {
			if (Number.isNaN(Number(item))) {
				const tooltip = new Tooltip();

				tooltip.showTooltip('Введите цифры');
				return false;
			}
		}

		const latitude = this.dataArray[0];
		const longitude = this.dataArray[1];

		return {
			coords:
        {
        	latitude,
        	longitude,
        },
		};
	}

	getDataInput(e) {
		e.preventDefault();

		const data = e.target.closest('.popup__inner').querySelector('.popup__position').value;
		this.showPosition(this.checkInput(data));
	}

	handleErrorPosition() {
		const self = this;

		const modal = document.querySelector('.popup');
		if (modal) {
			return;
		}
		const text = `<p>Что-то пошло не так</p><p>К сожалению, нам не удалось определить Ваше местоположение, пожалуйста,
дайте разрешение на использование геолокации, либо введите координаты вручную</p><p>Широта и долгота через запятую</p>`;

		this.error = new ErrorModal(text);
		this.error.showModalError();

		const butOK = document.querySelector('.button-ok');
		const butCancel = document.querySelector('.button-cancel');

		const dataCoords = document.querySelector('.popup__position');

		dataCoords.focus();

		dataCoords.addEventListener('keydown', (e) => {
			const tooltipMessage = document.querySelector('.error-container');

			if (tooltipMessage) {
				tooltipMessage.remove();
			}

			if (e.key === 'Enter') {
				e.preventDefault();
				this.getDataInput(e);
			}
		});

		butOK.addEventListener('click', self.getDataInput);

		butCancel.addEventListener('click', () => {
			const modalContainer = document.querySelector('.popup');

			if (modalContainer) {
				this.error.closeModalError(modalContainer);
				this.userMessage.focus();
			}
		});
	}

	init() {
		this.userMessage = this.container.querySelector('.main__textarea');

		this.userMessage.focus();
		this.userMessage.addEventListener('keydown', (e) => {
			if (e.key !== 'Enter') {
				return;
			}

			const { geolocation } = navigator;

			if (geolocation && e.target.value.trim() !== '') {
				e.preventDefault();
				this.message = e.target.value;

				geolocation.getCurrentPosition(this.showPosition, this.handleErrorPosition);
			}
		});
	}
}
