const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;

let ballPosition = [270, 40];
let ballDirection = [2, 2];
let paddlePosition = [230, 10];

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [];
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
        blocks.push(new Block(10 + col * 110, 210 + row * 30));
    }
}

function addBlocks() {
    for (let block of blocks) {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('block');
        blockDiv.style.left = block.bottomLeft[0] + 'px';
        blockDiv.style.bottom = block.bottomLeft[1] + 'px';
        grid.appendChild(blockDiv);
    }
}
addBlocks();

const paddle = document.createElement('div');
paddle.classList.add('paddle');
paddle.style.left = paddlePosition[0] + 'px';
paddle.style.bottom = paddlePosition[1] + 'px';
grid.appendChild(paddle);

const ball = document.createElement('div');
ball.classList.add('ball');
ball.style.left = ballPosition[0] + 'px';
ball.style.bottom = ballPosition[1] + 'px';
grid.appendChild(ball);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && paddlePosition[0] > 0) {
        paddlePosition[0] -= 20;
    } else if (e.key === 'ArrowRight' && paddlePosition[0] < boardWidth - blockWidth) {
        paddlePosition[0] += 20;
    }
    paddle.style.left = paddlePosition[0] + 'px';
});

function moveBall() {
    ballPosition[0] += ballDirection[0];
    ballPosition[1] += ballDirection[1];
    ball.style.left = ballPosition[0] + 'px';
    ball.style.bottom = ballPosition[1] + 'px';
    checkCollisions();
}

function checkCollisions() {
    if (ballPosition[0] <= 0 || ballPosition[0] >= boardWidth - ballDiameter) {
        ballDirection[0] *= -1;
    }
    if (ballPosition[1] >= boardHeight - ballDiameter) {
        ballDirection[1] *= -1;
    }

    if (
        ballPosition[0] >= paddlePosition[0] &&
        ballPosition[0] <= paddlePosition[0] + blockWidth &&
        ballPosition[1] <= paddlePosition[1] + 20
    ) {
        ballDirection[1] *= -1;
    }

    const blocksDivs = Array.from(document.querySelectorAll('.block'));
    blocksDivs.forEach((blockDiv, index) => {
        const block = blocks[index];
        if (
            ballPosition[0] > block.bottomLeft[0] &&
            ballPosition[0] < block.bottomRight[0] &&
            ballPosition[1] > block.bottomLeft[1] &&
            ballPosition[1] < block.topLeft[1]
        ) {
            blocksDivs[index].remove();
            blocks.splice(index, 1);
            ballDirection[1] *= -1;
        }
    });

    if (ballPosition[1] <= 0) {
        clearInterval(ballTimerId);
        alert('Game Over!');
    }

    if (blocks.length === 0) {
        clearInterval(ballTimerId);
        alert('You Win!');
    }
}

const ballTimerId = setInterval(moveBall, 30);
