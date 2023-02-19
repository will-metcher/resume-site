let cellSize = 20;
let cells;
let play = false;
let playBtn;

function setup() {
  var smallestDim = min(windowWidth, windowHeight);
  var w = Math.ceil(smallestDim * 0.8 / cellSize) * cellSize;
  var cnv = createCanvas(w,w);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  cnv.mousePressed(click);

  generateCells();
  createGUI();
}

function generateCells() {
  if (playBtn) {
    pause(false);
  }
  cells = [];
  for (var i = 0; i < width / cellSize; i++) {
    var row = [];
    for (var j = 0; j < height / cellSize; j++) {
      row.push(random() < 0.5);
    }
    cells.push(row);
  }
}

function createGUI() {
  var guiContainer = createDiv();
  guiContainer.position(windowWidth / 2 - width / 2, windowHeight / 2 + height / 2);
  guiContainer.id("gui");

  playBtn = addButton("Run", guiContainer, "p5-buttons");
  playBtn.mousePressed(function() {
    pause();
  });

  var clearBtn = addButton("Clear", guiContainer, "p5-buttons");
  clearBtn.mousePressed(function() {
    clearCells();
  });

  var randomBtn = addButton("Randomize", guiContainer, "p5-buttons");
  randomBtn.mousePressed(function() {
    generateCells();
  });
}

function clearCells() {
  pause(false);
  for (var x = 0; x < cells.length; x++) {
    for (var y = 0; y < cells.length; y++) {
      cells[x][y] = false;
    }
  }
}

function pause(state = !play) {
  play = state;
  if (play) {
    playBtn.html("Pause");
  } else {
    playBtn.html("Run");
  }
}

function isOutOfBounds(x, y) {
  if (cells === undefined || cells[0] === undefined) {
    return false;
  }
  if (x < 0 || x > cells.length - 1 || y < 0 || y > cells.length - 1) {
    return true;
  }
  return false;
}

function numNeighbours(x, y) {
  var num = 0;
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (i == 0 && j == 0) {
        continue;
      }
      var nx = x + i;
      var ny = y + j;
      if (isOutOfBounds(nx, ny)) {
        continue;
      }
      if (cells[nx][ny]) {
        num++;
      }
    }
  }
  return num;
}

async function generate() {
  var nextGeneration = cloneArray(cells);
  for (var x = 0; x < cells.length; x++) {
    for (var y = 0; y < cells.length; y++) {
      var neighbours = numNeighbours(x, y);
      if (cells[x][y]) {
        if (neighbours < 2 || neighbours > 3) {
          nextGeneration[x][y] = false;
        }
      } else {
        if (neighbours == 3) {
          nextGeneration[x][y] = true;
        }
      }
    }
  }
  await sleep(300);
  cells = cloneArray(nextGeneration);
}

function cloneArray(arr) {
  var newArray = []
  for (var i = 0; i < arr.length; i++) {
    newArray[i] = arr[i].slice();
  }
  return newArray;
}


function draw() {
  background(0);
  for (var x = 0; x < cells.length; x++) {
    for (var y = 0; y < cells.length; y++) {
      if (cells[x][y]) {
        fill(255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }

    }
  }

  if (play) {
    generate();
  }
}

function click() {
  if (play) {
    return;
  }
  var x = floor(mouseX / cellSize);
  var y = floor(mouseY / cellSize);
  cells[x][y] = !cells[x][y];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
