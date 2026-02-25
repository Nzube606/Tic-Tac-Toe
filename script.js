const gameMessage = document.querySelector(".gameMessage");
const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", startGame);
const restartButton = document.querySelector(".restartButton");
restartButton.addEventListener("click", restartGame);
const cell = document.querySelectorAll(".cell");

let gameBoard = ["", "", "", "", "", "", "", "", ""];

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

// function to switch player turns
function switchPlayer() {
  if (currentPlayer === player1) {
    return (currentPlayer = player2);
  } else {
    return (currentPlayer = player1);
  }
}
// To play the markers
function play(index) {
  if (index < 0 || index > 8) {
    throw new Error("Invalid move! Please choose a number between 0 and 8.");
  }
  // check if the cell is empty, if yes, push the current marker to the game board array and update the content if the cell.
  else if (gameBoard[index] === "") {
    gameBoard[index] = currentPlayer.marker;
    cell[index].textContent = currentPlayer.marker;
    // switchPlayer(currentPlayer);
  } else if (gameBoard[index] !== "") {
    // if cell is not empty, throw an error.
    throw new Error("This cell is occupied");
  } else throw new Error("Something is wrong");

  let result = winCheck(currentPlayer); // check if there's a winner or a draw after each move and update the game message accordingly.
  if (result === "There's a winner!") {
    gameMessage.textContent = `${currentPlayer.name} (${currentPlayer.marker}) wins!`;

    gameMessage.style.backgroundColor = "#22da22ff";
    gameMessage.style.color = "white";
    cell.forEach((c) => {
      // remove event listeners to prevent further moves after the game is over.
      c.removeEventListener("click", handleClick);
    });
    restartButton.style.display = "block"; // display the restart button to allow players to start a new game.
  } else if (result === "It's a draw!") {
    gameMessage.textContent = "Oops! It's a draw!";
    gameMessage.style.backgroundColor = "red";
    gameMessage.style.color = "white";
    cell.forEach((c) => {
      // remove event listeners to prevent further moves after the game is over.
      c.removeEventListener("click", handleClick);
    });
    restartButton.style.display = "block";
  } else {
    currentPlayer = switchPlayer(); // switch to the other player for the next turn if the game is not drawn or won.
    // update the game message to indicate the next player's turn.
    gameMessage.textContent = `${currentPlayer.name} (${currentPlayer.marker})'s turn!`;
  }
}

function winCheck(player) {
  const winCombos = [
    // all possible winning combinations of cell indices in the tic-tac-toe grid.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let outcome = "";
  winCombos.forEach((combo) => {
    if (
      // check if the current player's marker occupies all three cells in any of the
      // winning combinations. If yes, set the outcome to indicate that there's a winner.
      gameBoard[combo[0]] === player.marker &&
      gameBoard[combo[1]] === player.marker &&
      gameBoard[combo[2]] === player.marker
    ) {
      outcome = `There's a winner!`;
    }
  });

  if (
    // check for a draw by verifying if all cells are filled and there's no winner.
    gameBoard.every((cell) => cell !== "") &&
    outcome !== `There's a winner!`
  ) {
    outcome = "It's a draw!";
  }

  return outcome;
}

//get player names from users and create player objects
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");

const player1 = new Player(player1Input.value.trim(), "X");
const player2 = new Player(player2Input.value.trim(), "O");

function startGame() {
  // function to handle the start button click and set up the game
  if (player1Input.value.trim() === "" || player2Input.value.trim() === "") {
    alert("Please enter names for both players.");
    return;
  } else if (player1Input.value.trim() === player2Input.value.trim()) {
    alert("Player names must be different!");
    return;
  } else {
    player1.name = player1Input.value.trim();
    player2.name = player2Input.value.trim();
    currentPlayer = player1; // Start with player 1

    const gameSignUp = document.querySelector(".gameSignUp");
    gameSignUp.style.display = "none"; // Hide the sign-up form
    const tictactoeContainer = document.querySelector(".tictactoeContainer");
    tictactoeContainer.style.display = "block"; // Show the game container
    // Update the game message to indicate the first player's turn.
    gameMessage.textContent = `${currentPlayer.name} (${currentPlayer.marker})'s turn!`;
  }
}

// function to handle cell clicks and play the game by calling the play
// function with the appropriate index based on the clicked cell's id.
function handleClick() {
  const index = parseInt(this.id);
  play(index);
}

cell.forEach((c) => {
  // add event listeners to each cell to handle clicks and allow players to make their moves.
  c.addEventListener("click", handleClick);
});

// function to restart the game by resetting the game board, clearing the cell contents,
// re-adding event listeners, and updating the game message and restart button visibility.
function restartGame() {
  cell.forEach((c) => {
    c.textContent = "";
    c.addEventListener("click", handleClick);
  });
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = player1; // Reset to player 1 for the new game
  gameMessage.textContent = `${currentPlayer.name} (${currentPlayer.marker})'s turn`;
  gameMessage.style.backgroundColor = "white";
  gameMessage.style.color = "black";
  restartButton.style.display = "none"; // Hide the restart button until the game is over again.
}
