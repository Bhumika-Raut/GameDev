const columns = 7;
const rows = 6;
let currentPlayer = 'red';
const board = Array.from({ length: rows }, () => Array(columns).fill(null));

const createBoard = () => {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.row = row;
            cellDiv.dataset.col = col;
            cellDiv.addEventListener('click', () => handleCellClick(row, col));
            boardDiv.appendChild(cellDiv);
        }
    }
};

const handleCellClick = (row, col) => {
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            document.querySelector(`[data-row="${r}"][data-col="${col}"]`).classList.add(currentPlayer);
            if (checkWin(r, col)) {
                setTimeout(() => alert(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`), 100);
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'red' ? 'blue' : 'red'; 
            }
            break;
        }
    }
};

const checkWin = (row, col) => {
    const directions = [
        { row: 1, col: 0 },   
        { row: 0, col: 1 },   
        { row: 1, col: 1 },   
        { row: 1, col: -1 },  
    ];

    for (let { row: dr, col: dc } of directions) {
        let count = 1;  

        for (let i = 1; i < 4; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            if (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        for (let i = 1; i < 4; i++) {
            const r = row - dr * i;
            const c = col - dc * i;
            if (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 4) {
            return true;
        }
    }
    return false;
};

const resetGame = () => {
    board.forEach(row => row.fill(null));
    createBoard();
    currentPlayer = 'red';
};

document.addEventListener('DOMContentLoaded', () => {
    createBoard();
});
