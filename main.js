/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/AddMessage.js
class AddMessage {
  constructor() {
    this.valueMessage = null;
    this.date = new Date().toLocaleDateString('ru-RU');
  }
  addMessageInContainer(value) {
    this.valueMessage = value;
    const listItemUserMessage = document.createElement('div');
    listItemUserMessage.classList.add('message-item');
    const messageTime = document.createElement('div');
    messageTime.classList.add('message-item__time');
    messageTime.textContent = `${this.date} ${new Date().toLocaleTimeString('ru-RU').slice(0, -3)}`;
    const messageText = document.createElement('div');
    messageText.classList.add('message-item__text');
    messageText.textContent = this.valueMessage;
    const dataGeoPosition = document.createElement('div');
    dataGeoPosition.classList.add('message-item__geo');
    listItemUserMessage.appendChild(messageTime);
    listItemUserMessage.appendChild(messageText);
    listItemUserMessage.appendChild(dataGeoPosition);
    const messageList = document.querySelector('.main__messages');
    messageList.append(listItemUserMessage);
  }
}
;// CONCATENATED MODULE: ./src/js/ErrorModal.js
class ErrorModal {
  constructor(text) {
    this.text = text;
    this.modalEl = null;
  }
  createModalError() {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('popup');
    const contentModal = document.createElement('div');
    contentModal.classList.add('popup__inner');
    const textContainer = document.createElement('div');
    textContainer.classList.add('popup__text');
    textContainer.innerHTML = this.text;
    const form = document.createElement('form');
    form.classList.add('popup__form');
    const enterData = document.createElement('input');
    enterData.setAttribute('name', 'dataCoords');
    enterData.classList.add('popup__position');
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('popup__buttons');
    const buttonOk = document.createElement('button');
    buttonOk.classList.add('button', 'button-ok');
    buttonOk.textContent = 'OK';
    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('button', 'button-cancel');
    buttonCancel.textContent = 'Oтмена';
    form.appendChild(enterData);
    buttonContainer.appendChild(buttonCancel);
    buttonContainer.appendChild(buttonOk);
    contentModal.appendChild(textContainer);
    contentModal.appendChild(form);
    contentModal.appendChild(buttonContainer);
    modalContainer.appendChild(contentModal);
    const container = document.querySelector('.container');
    container.appendChild(modalContainer);
  }
  showModalError() {
    this.createModalError();
  }
  closeModalError(modal) {
    this.modalEl = modal;
    this.modalEl.remove();
  }
}
;// CONCATENATED MODULE: ./src/js/Tooltip.js
class Tooltip {
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
  }
}
;// CONCATENATED MODULE: ./src/js/DataForm.js



class DataForm {
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
    const {
      latitude
    } = position.coords;
    const {
      longitude
    } = position.coords;
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
      coords: {
        latitude,
        longitude
      }
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
    dataCoords.addEventListener('keydown', e => {
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
    this.userMessage.addEventListener('keydown', e => {
      if (e.key !== 'Enter') {
        return;
      }
      const {
        geolocation
      } = navigator;
      if (geolocation && e.target.value.trim() !== '') {
        e.preventDefault();
        this.message = e.target.value;
        geolocation.getCurrentPosition(this.showPosition, this.handleErrorPosition);
      }
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const container = document.querySelector('.main__inner');
const dataForm = new DataForm(container);
dataForm.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map