let list = [];
var i = 0;
var j = 0;
var sorting;
var rectWidth;
var listSize = 100;

let sel;
let sliderLabel;
let playBtn;

let stop = true;

function setup() {
	newList();	
	var cnv = createCanvas(720, 480);
  	var x = (windowWidth - width) / 2;
  	var y = (windowHeight - height) / 2;
  	cnv.position(x, y);
	frameRate(60);
	rectWidth = width / listSize;
	createGui();
}

function populateList() {
	list = [];
	for(var i = 0; i < listSize; i++) {
		list.push(int(random(0,101)));
	}	
}

function createGui() {
	reset = createButton("New");
	reset.position(windowWidth/2-width/2,windowHeight/2+height/2);
	reset.mousePressed(function() {
		stop = true;
		newList();
	});

	sel = createSelect();
	sel.position(windowWidth/2-width/2+50,windowHeight/2+height/2);
	sel.option("Bubble Sort");
	sel.option("Insertion Sort");
	sel.option("Quick Sort")

	sel.changed(onSelectChange);

	playBtn = createButton("Run");
	playBtn.position(windowWidth/2-width/2 + 160, windowHeight/2+height/2);
	playBtn.mousePressed(function() {
		if(!stop) {
			stop = true;
			return;
		}
		switch(sel.value()) {
			case "Bubble Sort":
				stop = false;
				bubbleSort();
				break;
			case "Insertion Sort":
				stop = false;
				insertionSort();
				break;
			case "Quick Sort":
				stop = false;
				quickSort(list, 0,listSize-1);
				break;
			default:
				console.log("Error");
				break;
		}
	});

	slider = createSlider(1,200,100);
	slider.position(windowWidth/2-width/2 + 220, windowHeight/2+height/2);
	slider.input(updateSlider);
	sliderLabel = createP(slider.value());
	sliderLabel.position((windowWidth/2-width/2) + 360, windowHeight/2+height/2);
}

function updateSlider() {
	run = false;
	listSize = slider.value();
	newList();
	sliderLabel.html(listSize);
	rectWidth = width / listSize;
}

function newList() {
	run = false;
	populateList();
	if(playBtn) {
		playBtn.html("Play");
	}
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
	for(var i = 0; i < listSize; i++) {
		for(var j = 0; j < listSize-i-1; j++) {
			if(stop) {
				return;
			}
			if(list[j] > list[j+1]) {
				var temp = list[j];
				list[j] = list[j+1];
				list[j+1] = temp;
				await sleep(25);
			}
		}
	}
}

async function insertionSort() {
	for(var i = 0; i < listSize; i++) {
		for(j = i; list[j-1] > list[j]; j--) {
			if(stop) {
				return;
			}
			var temp = list[j-1];
			list[j-1] = list[j];
			list[j] = temp;
			await sleep(25);
		}
	}
}


async function quickSort(list, low, high) {
	if(low < high) {
		var pi = await partition(list, low, high);
		if(stop) {
			return;
		}
		await Promise.all([
			quickSort(list, low, pi-1),
			quickSort(list, pi+1, high)
		]);
	}
}

async function partition(list, low, high) {
	var pivot = list[high];
	var i = low - 1;
	for(var j = low; j < high; j++) {
		if(stop) {
			return;
		}
		if(list[j] < pivot) {
			i++;

			await sleep(25);
			var temp = list[i];
			list[i] = list[j];
			list[j] = temp;
		}
	}

	var temp = list[i+1];
	list[i+1] = list[high];
	list[high] = temp;

	return i+1;
}

function drawValues() {
	list.forEach(function(n, i) {
		if(i === j) {
			fill(255);
		} else {
			var mapped = map(n,0,100,0,255);
			colorMode(HSB);
			fill(mapped,255,255);
		}
		var y = height - (n * height / 100);
		rect(i * rectWidth, y, rectWidth, height - y);
	});
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}