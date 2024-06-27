let boardSize = 4;
let board = [];
let score = 0;
let startX, startY;

function initGame(size) {
    boardSize = size;
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    score = 0;
    document.getElementById('score').innerText = score;
    renderBoard();
    addRandomTile();
    addRandomTile();
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    boardElement.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerText = board[row][col] === 0 ? '' : board[row][col];
            boardElement.appendChild(cell);
        }
    }
}

function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length === 0) return;

    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
    renderBoard();
}

function restartGame() {
    initGame(boardSize);
}

function handleKeyPress(event) {
    const key = event.key;
    let moved = false;

    if (key === 'ArrowUp') {
        moved = moveUp();
    } else if (key === 'ArrowDown') {
        moved = moveDown();
    } else if (key === 'ArrowLeft') {
        moved = moveLeft();
    } else if (key === 'ArrowRight') {
        moved = moveRight();
    }

    if (moved) {
        addRandomTile();
    }
}

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    let moved = false;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            moved = moveRight();
        } else {
            moved = moveLeft();
        }
    } else {
        if (deltaY > 0) {
            moved = moveDown();
        } else {
            moved = moveUp();
        }
    }

    if (moved) {
        addRandomTile();
    }
}

function moveUp() {
    let moved = false;
    for (let col = 0; col < boardSize; col++) {
        let merged = false;
        for (let row = 1; row < boardSize; row++) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow > 0 && board[currentRow - 1][col] === 0) {
                    board[currentRow - 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow--;
                    moved = true;
                }
                if (currentRow > 0 && !merged && board[currentRow - 1][col] === board[currentRow][col]) {
                    board[currentRow - 1][col] *= 2;
                    board[currentRow][col] = 0;
                    score += board[currentRow - 1][col];
                    document.getElementById('score').innerText = score;
                    merged = true;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let col = 0; col < boardSize; col++) {
        let merged = false;
        for (let row = boardSize - 2; row >= 0; row--) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow < boardSize - 1 && board[currentRow + 1][col] === 0) {
                    board[currentRow + 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow++;
                    moved = true;
                }
                if (currentRow < boardSize - 1 && !merged && board[currentRow + 1][col] === board[currentRow][col]) {
                    board[currentRow + 1][col] *= 2;
                    board[currentRow][col] = 0;
                    score += board[currentRow + 1][col];
                    document.getElementById('score').innerText = score;
                    merged = true;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < boardSize; row++) {
        let merged = false;
        for (let col = 1; col < boardSize; col++) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol > 0 && board[row][currentCol - 1] === 0) {
                    board[row][currentCol - 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol--;
                    moved = true;
                }
                if (currentCol > 0 && !merged && board[row][currentCol - 1] === board[row][currentCol]) {
                    board[row][currentCol - 1] *= 2;
                    board[row][currentCol] = 0;
                    score += board[row][currentCol - 1];
                    document.getElementById('score').innerText = score;
                    merged = true;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < boardSize; row++) {
        let merged = false;
        for (let col = boardSize - 2; col >= 0; col--) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol < boardSize - 1 && board[row][currentCol + 1] === 0) {
                    board[row][currentCol + 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol++;
                    moved = true;
                }
                if (currentCol < boardSize - 1 && !merged && board[row][currentCol + 1] === board[row][currentCol]) {
                    board[row][currentCol + 1] *= 2;
                    board[row][currentCol] = 0;
                    score += board[row][currentCol + 1];
                    document.getElementById('score').innerText = score;
                    merged = true;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

document.addEventListener('keydown', handleKeyPress);
document.getElementById('board').addEventListener('touchstart', handleTouchStart, false);
document.getElementById('board').addEventListener('touchend', handleTouchEnd, false);
initGame(4);