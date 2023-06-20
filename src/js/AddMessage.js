export default class AddMessage {
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
