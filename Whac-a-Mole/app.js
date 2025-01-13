const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');
const restartButton = document.querySelector('#restart');

let score = 0;
let hitPosition = null;
let timerId = null;
let timeLeft = 60;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });
    const randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id === hitPosition) {
            score++;
            scoreDisplay.textContent = score;
            hitPosition = null;
        }
    });
});

function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

function countDown() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerId);
        clearInterval(countdownTimerId);
        alert(`GAME OVER! Your Final Score is ${score}`);
        restartGame();
    }
}

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
    moveMole();
    countdownTimerId = setInterval(countDown, 1000);
}

function restartGame() {
    clearInterval(timerId);
    clearInterval(countdownTimerId);
    squares.forEach(square => square.classList.remove('mole'));
}

restartButton.addEventListener('click', () => {
    restartGame();
    startGame();
});

startGame();
