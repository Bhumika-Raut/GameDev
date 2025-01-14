const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const frog = {
  x: canvas.width / 2 - 15,
  y: canvas.height - 30,
  width: 30,
  height: 30,
  color: 'green',
  speed: 5
};

const cars = [
  { x: 0, y: 50, width: 50, height: 30, color: 'red', speed: 2 },
  { x: 200, y: 150, width: 50, height: 30, color: 'blue', speed: 3 },
  { x: 400, y: 250, width: 50, height: 30, color: 'yellow', speed: 4 }
];

let timer = 60;
let isGameRunning = false;
let timerInterval;

const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const timerDisplay = document.getElementById('timer');

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);

function drawFrog() {
  ctx.fillStyle = frog.color;
  ctx.fillRect(frog.x, frog.y, frog.width, frog.height);
}

function drawCars() {
  cars.forEach(car => {
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
    car.x += car.speed;
    if (car.x > canvas.width) {
      car.x = -car.width;
    }
  });
}

function checkCollision() {
  cars.forEach(car => {
    if (frog.x < car.x + car.width &&
        frog.x + frog.width > car.x &&
        frog.y < car.y + car.height &&
        frog.y + frog.height > car.y) {
      resetFrog();
    }
  });
}

function checkWin() {
  if (frog.y <= 0) {
    endGame('You Win!');
  }
}

function update() {
  if (!isGameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrog();
  drawCars();
  checkCollision();
  checkWin();
  requestAnimationFrame(update);
}

function moveFrog(event) {
  if (!isGameRunning) return;
  switch(event.key) {
    case 'ArrowUp':
      frog.y -= frog.speed;
      break;
    case 'ArrowDown':
      frog.y += frog.speed;
      break;
    case 'ArrowLeft':
      frog.x -= frog.speed;
      break;
    case 'ArrowRight':
      frog.x += frog.speed;
      break;
  }
}

function startGame() {
  if (isGameRunning) return;
  isGameRunning = true;
  timer = 60;
  timerDisplay.textContent = `Time: ${timer}`;
  update();
  timerInterval = setInterval(() => {
    if (timer <= 0) {
      endGame('Time\'s Up!');
    } else {
      timer--;
      timerDisplay.textContent = `Time: ${timer}`;
    }
  }, 1000);
}

function pauseGame() {
  isGameRunning = false;
  clearInterval(timerInterval);
}

function endGame(message) {
  isGameRunning = false;
  clearInterval(timerInterval);
  alert(message);
  resetFrog();
}

function resetFrog() {
  frog.x = canvas.width / 2 - 15;
  frog.y = canvas.height - 30;
}

document.addEventListener('keydown', moveFrog);

