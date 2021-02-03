let list = [];
let sorting;
let rectWidth;
let listSize = 100;
let comparisons = 0;
let swaps = 0;
let iterations = 0;
let ms = 0;
let seconds = 0;
let fontSize = 20;

let sel;
let playBtn;

let stop = true;

function setup() {
  newList();
  var cnv = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  frameRate(50);
  rectWidth = width / listSize;
  createGui();
}

function resetCounters() {
  comparisons = 0;
  iterations = 0;
  swaps = 0;
  seconds = 0;
  ms = 0;
}

function populateList(min, max) {
  list = [];
  for (var i = 0; i < listSize; i++) {
    list.push(int(random(min, max)));
  }
  resetCounters();
}

function createGui() {
  guiContainer = createDiv();
  guiContainer.position(windowWidth / 2 - width / 2, windowHeight / 2 + height / 2);

  reset = addButton("New", guiContainer, "p5-buttons");
  reset.mousePressed(function() {
    stop = true;
    newList();
  });

  sel = addSelect(guiContainer, ["Bubble Sort", "Insertion Sort", "Shell Sort", "Quick Sort", "Counting Sort"], "p5-select");
  sel.changed(onSelectChange);

  playBtn = addButton("Run", guiContainer, "p5-buttons");
  playBtn.mousePressed(runSort);

  slider = createSlider(3, listSize * 2, listSize);
  slider.parent(guiContainer);
  slider.input(updateSlider);
}

function runSort() {
  if (!stop) {
    stop = true;
    return;
  }
  stop = false;
  switch (sel.value()) {
    case "Bubble Sort":
      bubbleSort();
      break;
    case "Insertion Sort":
      insertionSort();
      break;
    case "Quick Sort":
      quickSort(list, 0, listSize - 1);
      break;
    case "Counting Sort":
      countingSort(slider.value());
      break;
    case "Shell Sort":
      shellSort();
      break;
    default:
      console.error("Error");
      break;
  }
}

function updateSlider() {
  run = false;
  listSize = slider.value();
  newList();
  rectWidth = width / listSize;
}

function newList() {
  run = false;
  populateList(1, 101);
  if (playBtn) {
    playBtn.html("Play");
  }
  resetCounters();
}

function onSelectChange() {
  stop = true;
  newList();
}

function draw() {
  background(0);
  drawValues();
}

async function bubbleSort() {
  for (var i = 0; i < listSize; i++) {
    for (var j = 0; j < listSize - i - 1; j++) {
      iterations++;
      if (stop) {
        return;
      }
      if (list[j] > list[j + 1]) {
        comparisons++;
        swap(list, j, j + 1);
        await sleep(25);
      }
    }
  }
  stop = true;
}

function swap(arr, i, j) {
  var temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
  swaps++;
}

async function insertionSort() {
  for (var i = 0; i < listSize; i++) {
    for (j = i; list[j - 1] > list[j]; j--) {
      iterations++;
      if (stop) {
        return;
      }
      swap(list, j, j - 1);
      await sleep(25);
    }
  }
  stop = true;
}


async function quickSort(list, low, high) {
  if (low < high) {
    comparisons++;
    var pi = await partition(list, low, high);
    if (stop) {
      return;
    }
    await Promise.all([
      quickSort(list, low, pi - 1),
      quickSort(list, pi + 1, high)
    ]);
  }

  if (isSorted(list)) {
    stop = true;
  }
}

async function partition(list, low, high) {
  var pivot = list[high];
  var i = low - 1;
  for (var j = low; j < high; j++) {
    iterations++;
    if (stop) {
      return;
    }
    if (list[j] < pivot) {
      i++;

      await sleep(25);
      swap(list, i, j);
      comparisons++;
    }
  }

  swap(list, i + 1, high);

  return i + 1;
}

function isSorted(list) {
  for (var i = 0; i < list.length - 1; i++) {
    if (list[i] > list[i + 1]) {
      return false;
    }
  }
  return true;
}

async function countingSort(k) {
  var count = new Array(k + 1).fill(0);

  for (var i = 0; i < list.length; i++) {
    iterations++;
    ++count[list[i]];
  }

  for (var i = 1; i <= k; i++) {
    iterations++;
    count[i] = count[i] + count[i - 1];
  }

  var listCopy = [...list];

  for (var i = listCopy.length - 1; i >= 0; i--) {
    iterations++;
    list[--count[listCopy[i]]] = listCopy[i];
    await sleep(25);
  }

  stop = true;
}

async function shellSort() {
  for (var gap = floor(list.length / 2); gap >= 1; gap = floor(gap / 2)) {
    for (var j = gap; j < list.length; j++) {
      for (var i = j - gap; i >= 0; i -= gap) {
        comparisons++;
        if (list[i + gap] > list[i]) {
          break;
        } else {
          swap(list, i + gap, i);
        }
        await sleep(25);
      }
    }
  }
  stop = true;
}

function drawValues() {
  var max = list.reduce(function(a, b) {
    return Math.max(a, b);
  });
  list.forEach(function(n, i) {
    var mapped = map(n, 0, max, 0, 360);
    colorMode(HSB);
    fill(mapped, 255, 255);
    var y = height - (n * height / 100);
    rect(i * rectWidth, y, rectWidth, height - y);
  });

  fill(255);
  textSize(fontSize);
  text("Swaps: " + swaps, 5, fontSize);
  text("Comparisons: " + comparisons, 5, fontSize * 2);
  text("Iterations: " + iterations, 5, fontSize * 3);
  text("Size: " + list.length, 5, fontSize * 4);
  text("Elapsed: " + seconds + "." + ms, 5, fontSize * 5);

  timer();
}

function timer() {
  if (stop) {
    return;
  }
  ms += 20;
  if (ms >= 1000) {
    ms = 0;
    seconds++;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}