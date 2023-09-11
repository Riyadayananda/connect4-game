document.addEventListener("DOMContentLoaded", function () {
    const numRows = 6;
    const numCols = 7;
    let currentPlayer = 1; // Player 1 starts
    let gameOver = false;

    const cells = document.querySelectorAll(".cell");

 // Function to check if a player has won
function checkWin(row, col) {
    const discClass = currentPlayer === 1 ? "player1-disc" : "player2-disc";

    // Check horizontally
    let horizontalCount = 0;
    for (let i = -3; i <= 3; i++) {
        const c = col + i;
        if (c >= 0 && c < numCols) {
            const index = row * numCols + c;
            if (cells[index].classList.contains(discClass)) {
                horizontalCount++;
                if (horizontalCount === 4) {
                    return true;
                }
            } else {
                horizontalCount = 0;
            }
        }
    }

    // Check vertically
    let verticalCount = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i;
        if (r >= 0 && r < numRows) {
            const index = r * numCols + col;
            if (cells[index].classList.contains(discClass)) {
                verticalCount++;
                if (verticalCount === 4) {
                    return true;
                }
            } else {
                verticalCount = 0;
            }
        }
    }

    // Check diagonally (from top-left to bottom-right)
    let diagonalCount1 = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i;
        const c = col + i;
        if (r >= 0 && r < numRows && c >= 0 && c < numCols) {
            const index = r * numCols + c;
            if (cells[index].classList.contains(discClass)) {
                diagonalCount1++;
                if (diagonalCount1 === 4) {
                    return true;
                }
            } else {
                diagonalCount1 = 0;
            }
        }
    }

    // Check diagonally (from top-right to bottom-left)
    let diagonalCount2 = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i;
        const c = col - i;
        if (r >= 0 && r < numRows && c >= 0 && c < numCols) {
            const index = r * numCols + c;
            if (cells[index].classList.contains(discClass)) {
                diagonalCount2++;
                if (diagonalCount2 === 4) {
                    return true;
                }
            } else {
                diagonalCount2 = 0;
            }
        }
    }

    return false;
}


    // Function to handle a player's move
    function handleMove(col) {
        if (gameOver) return;

        for (let row = numRows - 1; row >= 0; row--) {
            const index = row * numCols + col;
            const cell = cells[index];

            if (!cell.classList.contains("player1-disc") && !cell.classList.contains("player2-disc")) {
                const discClass = currentPlayer === 1 ? "player1-disc" : "player2-disc";
                cell.classList.add(discClass);

                // Check for a win
                if (checkWin(row, col)) {
                    document.getElementById("message").textContent = `Player ${currentPlayer} wins!`;
                    gameOver = true;
                } else {
                    // Switch players
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                    document.getElementById("message").textContent = `Player ${currentPlayer}'s turn`;
                }
                break;
            }
        }
    }

    // Add click event listeners to each cell to handle player moves
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            const col = index % numCols;
            handleMove(col);
        });
    });

    // Reset the game
    document.getElementById("reset-button").addEventListener("click", () => {
        cells.forEach((cell) => {
            cell.classList.remove("player1-disc", "player2-disc");
        });
        currentPlayer = 1;
        gameOver = false;
        document.getElementById("message").textContent = "Player 1's turn";
    });
});
