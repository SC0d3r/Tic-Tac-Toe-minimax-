// hasHumanWon , hasAIWon and isATie functions come from minmax.js file

const topPadding = 0;
let isPlayersTurn = true;
const humanPlayer = 'O';
const aiPlayer = 'X';
let gameFinished = false;

const board = new Board();
function setup() {
  createCanvas(640, 480);
  background('#1e272e');
  drawInfoText();
  drawGameBoard();
}

function draw() {
  if (gameFinished) return;

  if (!isPlayersTurn) {
    const index = minmax();
    const result = board.place(index, aiPlayer);
    const [i, j] = turnIndexIntoColAndRow(index);

    drawPlacement(i, j, aiPlayer);
    isPlayersTurn = true;
    setTimeout(decideOnGame,0);
  }
}

function restart(){
  location.href = '';
}
function decideOnGame() {
  const state = board.state();
  const actions = emptyCells(state);
  if (hasHumanWon(state)) {
    alert('human has won');
    restart();
    gameFinished = true;
  }
  if (hasAIWon(state)) {
    alert('ai has won');
    restart();
    gameFinished = true;
  }
  if (isATie(actions)) {
    alert('game tied');
    restart();
    gameFinished = true;
  }
}
function mouseClicked() {
  if (gameFinished) return;
  const [index, i, j] = calcIndex(mouseX, mouseY);

  if (index !== undefined && isPlayersTurn) {
    const result = board.place(index, humanPlayer);
    if (result === -1) return;// room is full
    drawPlacement(i, j, humanPlayer);
    isPlayersTurn = false;
    setTimeout(decideOnGame,0);
  }
}

function calcIndex(mouseX, mouseY) {
  const cellWidth = width / 3;
  const cellHeight = height / 3;
  const y0 = cellHeight,
    x0 = width / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const startX = i * x0;
      const startY = j * y0;
      if (
        (mouseX >= startX && mouseX <= (startX + cellWidth)) &&
        (mouseY >= startY && mouseY <= (startY + cellHeight))
      ) {
        return [j * 3 + i, i, j];
      }
    }
  }

}

function drawGameBoard() {
  const y0 = height / 3;
  const y1 = 2 * y0;
  const x0 = width / 3;
  const x1 = 2 * x0;

  stroke('#ffa801');
  strokeWeight(3);
  line(0, y0, width, y0);
  line(0, y1, width, y1);

  stroke('#ffa801');
  line(x0, 0, x0, height);
  line(x1, 0, x1, height);

}
function drawPlacement(i, j, player) {
  const cellHeight = height / 3;
  const y0 = cellHeight,
    x0 = width / 3;

  noStroke();
  if (player === humanPlayer) {
    fill('#EA2027');
    const w = cellHeight - 30
    rect(i * x0 + w / 3.2, j * y0 + w / 7.8, w, w);
  } else {
    fill('#009432');
    const w = cellHeight - 30;
    ellipse(j * x0 + w / 1.2, i * y0 + w / 1.6, w);
  }
}
function drawInfoText() {
  fill('#FFC312');
  textSize(15);
  noStroke();
  text("Player : ", 10, 15);
  fill('#EA2027');
  rect(70, 3, 13, 13);

  fill('#FFC312');
  text("Ai : ", 100, 15);
  fill('#009432');
  ellipse(135, 9, 15);
}


function turnIndexIntoColAndRow(index) {
  const i = Math.floor(index / 3);
  const j = Math.floor(index % 3);
  return [i, j];
}

