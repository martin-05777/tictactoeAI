let board = ["", "", "", "", "", "", "", "", ""];
let moves = { X: [], O: [] };
let currentPlayer = "X";

// Ez a függvény fut le, ha valaki kattint
function handleCellClick(index) {
    if (board[index] !== "") return;

    // 3-as limit kezelése
    if (moves[currentPlayer].length === 3) {
        const oldestIndex = moves[currentPlayer].shift();
        board[oldestIndex] = "";
    }

    board[index] = currentPlayer;
    moves[currentPlayer].push(index);
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // KÜLDÉS A FELHŐBE (Firebase)
    set(ref(db, 'game/'), {
        board: board,
        moves: moves,
        currentPlayer: currentPlayer
    });
}

// EZ FRISSÍTI A KÉPERNYŐT MINDENKINÉL
function updateLocalState(data) {
    board = data.board;
    moves = data.moves;
    currentPlayer = data.currentPlayer;
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, i) => {
        cell.innerText = board[i] || "";
    });
    document.getElementById('status').innerText = `${currentPlayer} jön`;
}