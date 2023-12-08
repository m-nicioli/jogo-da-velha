let currentPlayer = 'X';
let player1 = { name: '', wins: 0 };
let player2 = { name: '', wins: 0 };
let mode = 'pvp';
let gameEnded = false;

function cadastrarJogador(playerNumber) {
    const playerName = document.getElementById(`player${playerNumber}`).value;
    if (playerNumber === 1) {
        player1.name = playerName;
        document.getElementById("player1-wins").innerText = `Vitórias: ${player1.wins}`;
    } else {
        player2.name = playerName;
        document.getElementById("player2-wins").innerText = `Vitórias: ${player2.wins}`;
    }

    if (player1.name && player2.name) {
        startGame();
    }
}

function startGame() {
    document.getElementById("player1-wins").innerText = `Vitórias: ${player1.wins}`;
    document.getElementById("player2-wins").innerText = `Vitórias: ${player2.wins}`;
    document.getElementById("reset").style.visibility = 'visible';
    document.getElementById("message").innerText = '';

    gameEnded = false;
    currentPlayer = 'X';
    renderBoard();
}

function cellClick(cell) {
    if (!gameEnded && cell.innerText === '') {
        cell.innerText = currentPlayer;
        if (checkWinner()) {
            displayWinner();
        } else if (checkDraw()) {
            displayDraw();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function renderBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;
        cell.onclick = function() {
            cellClick(this);
        };
        gameBoard.appendChild(cell);
    }
}

function checkWinner() {
    const cells = document.getElementsByClassName('cell');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].innerText !== '' && cells[a].innerText === cells[b].innerText && cells[b].innerText === cells[c].innerText) {
            if (currentPlayer === 'X') {
                player1.wins++;
            } else {
                player2.wins++;
            }
            return true;
        }
    }

    return false;
}

function checkDraw() {
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        if (cell.innerText === '') {
            return false;
        }
    }
    return true;
}

function displayWinner() {
    gameEnded = true;
    document.getElementById("message").innerText = `Parabéns, ${currentPlayer === 'X' ? player1.name : player2.name} venceu!`;
}

function displayDraw() {
    gameEnded = true;
    document.getElementById("message").innerText = 'Empate!';
}

function reiniciar() {
    player1 = { name: '', wins: 0 };
    player2 = { name: '', wins: 0 };
    document.getElementById("reset").style.visibility = 'hidden';
    document.getElementById("message").innerText = '';
    document.getElementById("player1").value = '';
    document.getElementById("player2").value = '';
    currentPlayer = 'X';
    gameEnded = false;
    renderBoard();
}