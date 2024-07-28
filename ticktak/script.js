document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const gameInfo = document.getElementById("gameInfo");
    const restartButton = document.getElementById("restartButton");

    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = () => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const checkDraw = () => {
        return board.every(cell => cell !== null);
    };

    const handleCellClick = (e) => {
        const index = e.target.getAttribute("data-index");

        if (!gameActive || board[index]) return;

        board[index] = currentPlayer;
        e.target.innerText = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameInfo.innerText = `Player ${winner} wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            gameInfo.innerText = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            gameInfo.innerText = `Player ${currentPlayer}'s turn`;
        }
    };

    const restartGame = () => {
        board.fill(null);
        gameBoard.querySelectorAll(".cell").forEach(cell => (cell.innerText = ""));
        currentPlayer = "X";
        gameActive = true;
        gameInfo.innerText = `Player ${currentPlayer}'s turn`;
    };

    gameBoard.addEventListener("click", handleCellClick);
    restartButton.addEventListener("click", restartGame);
});
