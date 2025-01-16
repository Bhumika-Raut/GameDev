const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let alienRemoved = [];
let score = 0; 

// Create the grid
for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

// Draw the invaders
function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!alienRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader');
        }
    }
}

// Remove the invaders
function remove() {
    alienInvaders.forEach(index => squares[index].classList.remove('invader'));
}

// Place the shooter
squares[currentShooterIndex].classList.add('shooter');

// Move the shooter
function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter');
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter);

// Move the invaders
function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width;
        }
        direction = -1;
        goingRight = false;
    } else if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width;
        }
        direction = 1;
        goingRight = true;
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    draw();

    // Check for Game Over
    if (squares[currentShooterIndex].classList.contains('invader') &&
        squares[currentShooterIndex].classList.contains('shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER!';
        clearInterval(invadersId);
    }

    if (alienInvaders.some(invader => invader >= squares.length)) {
        resultsDisplay.innerHTML = 'GAME OVER!';
        clearInterval(invadersId);
    }

    // Check for Win
    if (alienRemoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = `YOU WIN! Final Score: ${score}`;
        clearInterval(invadersId);
    }
}

invadersId = setInterval(moveInvaders, 100);

// Shoot lasers
function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;

        if (currentLaserIndex < 0) {
            clearInterval(laserId);
            return;
        }

        squares[currentLaserIndex].classList.add('laser');

        // Laser hits invader
        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
            clearInterval(laserId);

            const alienIndex = alienInvaders.indexOf(currentLaserIndex);
            alienRemoved.push(alienIndex);

            // Update score
            score += 10;
            resultsDisplay.innerHTML = `Score: ${score}`;

            // Win condition
            if (alienRemoved.length === alienInvaders.length) {
                resultsDisplay.innerHTML = `YOU WIN! Final Score: ${score}`;
                clearInterval(invadersId);
            }
        }
    }

    if (e.key === 'ArrowUp') {
        laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown', shoot);
