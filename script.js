const cells = document.querySelectorAll(".cell");
const playerXScoreSpan = document.querySelector("#playerXScore");
const playerOScoreSpan = document.querySelector("#playerOScore");
const resetBtn = document.querySelector("#resetBtn");
const toastDiv = document.querySelector(".toast");
const draws = document.querySelector("#draws");

const playerX = "X";
const playerO = "O";
let playerXScore = 0;
let playerOScore = 0;
let currentLevel = 1;
let flag = true;
let currentPlayer = playerX;
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
const drawStrings = [
  "no one wins",
  "draw",
  "its a draw",
  "better luck next time",
  "no one makes it",
  "its a tie",
];

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

function cellClicked(e) {
  if (flag) {
    if (e.target.innerHTML === "") {
      e.target.appendChild(addImg(currentPlayer));
      checkWin();
      checkDraw();
      if (currentPlayer === playerX) {
        currentPlayer = playerO;
      } else {
        currentPlayer = playerX;
      }
    }
  }
}

function addImg(type) {
  const img = document.createElement("img");
  img.src = `${type}.png`;
  img.alt = type;
  return img;
}

function checkWin() {
  for (let i = 0; i < winCombos.length; i++) {
    const winCombo = winCombos[i];
    const cell1 = cells[winCombo[0]];
    const cell2 = cells[winCombo[1]];
    const cell3 = cells[winCombo[2]];
    if (
      cell1.innerHTML !== "" &&
      cell1.innerHTML === cell2.innerHTML &&
      cell1.innerHTML === cell3.innerHTML
    ) {
      toast(`Player ${currentPlayer} wins!`);
      updateScore();
      currentLevel++;
      flag = false;
      setTimeout(() => {
        reset();
        toast("level " + currentLevel);
      }, 2000);
    }
  }
}

function checkDraw() {
  if ([...cells].every((cell) => cell.innerHTML !== "")) {
    const drawString =
      drawStrings[Math.floor(Math.random() * drawStrings.length)];
    toast(drawString);
    draws.textContent++;
    currentLevel++;
    setTimeout(() => {
      reset();
      toast("level " + currentLevel);
    }, 2000);
  }
}

function updateScore() {
  if (currentPlayer === playerX) {
    playerXScore++;
    playerXScoreSpan.textContent = playerXScore;
  } else {
    playerOScore++;
    playerOScoreSpan.textContent = playerOScore;
  }
}

function reset() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  flag = true;
}

resetBtn.addEventListener("click", () => {
  if ([...cells].some((cell) => cell.innerHTML !== "") || currentLevel > 1) {
    reset();
    flag = false;
    playerXScore = 0;
    playerOScore = 0;
    playerXScoreSpan.textContent = playerXScore;
    playerOScoreSpan.textContent = playerOScore;
    currentLevel = 1;
    setTimeout(() => {
      toast("level " + currentLevel);
      flag = true;
    }, 2000);
    toast("Game Reset!");
  }
});

function toast(msg) {
  toastDiv.classList.add("show");
  toastDiv.textContent = msg;
  setTimeout(() => {
    toastDiv.classList.remove("show");
  }, 1000);
}
