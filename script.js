const gameMessage = document.querySelector(".gameMessage");
const gameSignUp = document.querySelector(".gameSignUp");
const tictactoeContainer = document.querySelector(".tictactoeContainer");
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector(".restartButton");
const cell = document.querySelectorAll(".cell");
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

let gameBoard = ["", "", "", "", "", "", "", "", ""];

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

const player1 = new Player(player1Input.value.trim(), "X");
const player2 = new Player(player2Input.value.trim(), "O");

let currentPlayer = "";
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
  } else if (gameBoard[index] === "") {
    gameBoard[index] = currentPlayer.marker;
    cell[index].textContent = currentPlayer.marker;
    // switchPlayer(currentPlayer);
  } else if (gameBoard[index] !== "") {
    throw new Error("This cell is occupied");
  } else throw new Error("Something is wrong");

  let result = winCheck(currentPlayer);
  // console.log(result);
  if (result === "There's a winner!") {
    console.log(`Gameover! ${currentPlayer.name} wins!`);
    gameMessage.textContent = `${currentPlayer.name} (${currentPlayer.marker}) wins!`;
    // gameMessage.style.border = "2px solid green";
    gameMessage.style.backgroundColor = "#22da22ff";
    gameMessage.style.color = "white";
    cell.forEach((c) => {
      c.removeEventListener("click", handleClick);
    });
    restartButton.style.display = "block";
    currentPlayer = player1;
    // return "Gameover!!!!!";
  } else if (result === "It's a draw!") {
    gameMessage.textContent = "Oops! It's a draw!";
    gameMessage.style.backgroundColor = "red";
    gameMessage.style.color = "white";
    cell.forEach((c) => {
      c.removeEventListener("click", handleClick);
    });
    restartButton.style.display = "block";
    currentPlayer = player1;
  } else {
    currentPlayer = switchPlayer();
    gameMessage.textContent = `${currentPlayer.name} (${currentPlayer.marker})'s turn!`;
    // currentPlayer = switchPlayer(currentPlayer);
  }
}

function winCheck(player) {
  const winCombos = [
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
      gameBoard[combo[0]] === player.marker &&
      gameBoard[combo[1]] === player.marker &&
      gameBoard[combo[2]] === player.marker
    ) {
      outcome = `There's a winner!`;
    }
  });

  if (
    gameBoard.every((cell) => cell !== "") &&
    outcome !== `There's a winner!`
  ) {
    outcome = "It's a draw!";
  }

  return outcome;
}

// play(0);
// play(3);
// play(1);
// play(4);
// play(2);
// play(5);

function startGame() {
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

    gameSignUp.style.display = "none"; // Hide the sign-up form
    tictactoeContainer.style.display = "block"; // Show the game container
    gameMessage.textContent = `${currentPlayer.name} (${currentPlayer.marker})'s turn!`;
    return currentPlayer;
  }
}

function handleClick() {
  const index = parseInt(this.id);
  play(index);
  // gameResult = play(index);
  console.log(gameBoard);
  console.log(`${currentPlayer.name}'s turn!`);
}

cell.forEach((c) => {
  // let currentPlayer = player2;
  c.addEventListener("click", handleClick);
});

function restartGame() {
  cell.forEach((c) => {
    c.textContent = "";
    c.addEventListener("click", handleClick);
  });
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameMessage.textContent = `${currentPlayer.name} (${currentPlayer.marker})'s turn`;
  gameMessage.style.backgroundColor = "white";
  gameMessage.style.color = "black";
  restartButton.style.display = "none";
}
