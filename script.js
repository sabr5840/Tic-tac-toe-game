"use strict";

let gameIsOver = false;
let player1Score = 0;
let player2Score = 0;

window.addEventListener("load", start);

function start() {
    console.log("game started");
    makeBoardClick();
}

function selectCell(row, col) {
    if (readFromCell(row, col) === 0 && !gameIsOver) {
        writeToCell(row, col, currentPlayer);
        displayBoard();
        if (checkForWinner(currentPlayer)) {
            console.log(`Player ${currentPlayer} wins!`);
            updateScores();
            gameIsOver = true;
        } else {
            nextTurn();
        }
        return true;
    } else {
        return false;
    }
}

function updateScores() {
    if (currentPlayer === 1) {
        player1Score++;
        document.getElementById("player1Score").textContent = `${player1Score} wins`;
    } else if (currentPlayer === 2) {
        player2Score++;
        document.getElementById("player2Score").textContent = `${player2Score} wins`;
    }
}

function makeBoardClick() {
    document.querySelector("#board")
        .addEventListener("click", boardClicked);

    document.querySelector("#try-again-btn").addEventListener("click", resetGame);
}

function resetGame() {
    model.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            writeToCell(rowIndex, colIndex, 0);
        });
    });

    currentPlayer = 1;
    gameIsOver = false;
    displayBoard();
    console.log("Game reset");
}
function resetGame() {
    model.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            writeToCell(rowIndex, colIndex, 0);
        });
    });

    currentPlayer = 1;
    gameIsOver = false;
    displayBoard();
    console.log("Game reset");
}

function boardClicked(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    console.log(`Clicked on row: ${row} col: ${col}`);
    selectCell(row, col);
}

function displayBoard() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const value = readFromCell(row, col);
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

            switch (value) {
                case 0:
                    cell.textContent = " ";
                    break;
                case 1:
                    cell.textContent = "X";
                    break;
                case 2:
                    cell.textContent = "O";
                    break;
            }
        }
    }
}

const model = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

function writeToCell(row, col, value) {
    model[row][col] = value;
}

function readFromCell(row, col) {
    return model[row][col];
}

let currentPlayer = 1;

function nextTurn() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
        computerTurn();
    } else if (currentPlayer === 2) {
        currentPlayer = 1;
    }
}

function playerTurn() {
}

function computerTurn() {
    const availableCells = [];

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (readFromCell(row, col) === 0) {
                availableCells.push([row, col]);
            }
        }
    }

    if (availableCells.length === 0) {
        console.log("Game over");
    } else {
        const index = Math.floor(Math.random() * availableCells.length);
        const [row, col] = availableCells[index];
        selectCell(row, col);
    }
}

function checkForWinner(player) {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (
            (readFromCell(i, 0) === player && readFromCell(i, 1) === player && readFromCell(i, 2) === player) ||
            (readFromCell(0, i) === player && readFromCell(1, i) === player && readFromCell(2, i) === player)
        ) {
            return true;
        }
    }

    if (
        (readFromCell(0, 0) === player && readFromCell(1, 1) === player && readFromCell(2, 2) === player) ||
        (readFromCell(0, 2) === player && readFromCell(1, 1) === player && readFromCell(2, 0) === player)
    ) {
        return true;
    }

    return false;
}
