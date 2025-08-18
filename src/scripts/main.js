'use strict';
/* global confirm */

const Game = require('../modules/Game.class');
const game = new Game();

const button = document.querySelector('.button');

const messageContainer = document.querySelector('.message-container');
const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const messageStart = document.querySelector('.message-start');

function showMessage(messageType) {
  messageContainer.classList.remove('hidden');

  messageLose.classList.add('hidden');
  messageWin.classList.add('hidden');
  messageStart.classList.add('hidden');

  if (messageType === 'lose') {
    messageLose.classList.remove('hidden');
  } else if (messageType === 'win') {
    messageWin.classList.remove('hidden');
  } else if (messageType === 'start') {
    messageStart.classList.remove('hidden');
  }
}

button.addEventListener('click', () => {
  if (game.status === 'idle') {
    game.start();
    showMessage('start');

    button.classList.remove('start');
    button.classList.add('restart');
    button.textContent = 'Restart';
    messageStart.textContent = 'Press "Restart" to start the new Game';
  } else {
    const confirmRestart = confirm('Do you want to start the new game?');

    if (confirmRestart) {
      game.restart();
      game.start();
      showMessage('start');
      button.textContent = 'Restart';
    }
  }
});

document.addEventListener('keydown', (ev) => {
  if (game.status === 'playing') {
    switch (ev.key) {
      case 'ArrowLeft':
        game.moveLeft();
        break;
      case 'ArrowRight':
        game.moveRight();
        break;
      case 'ArrowUp':
        game.moveUp();
        break;
      case 'ArrowDown':
        game.moveDown();
        break;
      default:
        break;
    }
  }

  if (game.isGameOver()) {
    showMessage('lose');
  } else if (game.status === 'win') {
    showMessage('win');
  }
});
