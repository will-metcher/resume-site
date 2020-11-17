let list = [];
var i = 0;
var j = 0;
var sorting;
var rectWidth;

let sel;

let run = false;
let algorithm = "Bubble";

let startingValues = {
	"Bubble" : {
		i  : 0,
		j : 0
	},
	"Insertion" : {
		i : 1,
		j : 1
	}
}

function setup() {
	newList();	
	var cnv = createCanvas(720, 480);
  	var x = (windowWidth - width) / 2;
  	var y = (windowHeight - height) / 2;
  	cnv.position(x, y);
	frameRate(60);
	rectWidth = width / list.length;
	createGui();
}

function populateList() {
	list = [];
	for(var i = 0; i < 100; i++) {
		list.push(int(random(0,101)));
	}	
}

function createGui() {
	reset = createButton("New");
	reset.position(windowWidth/2-width/2,windowHeight/2+height/2);
	reset.mousePressed(newList);

	sel = createSelect();
	sel.position(windowWidth/2-width/2+50,windowHeight/2+height/2);
	sel.option("Bubble Sort");
	sel.option("Insertion Sort");
	sel.changed(onSelectChange);

	start = createButton("Play");
	start.position(windowWidth/2-width/2 + 160, windowHeight/2+height/2);
	start.mousePressed(function() {
		run = !run;
		if(run) {
			start.label = "Pause";
		} else {
			start.html = "Play";
		}
	});
}

function newList() {
	run = false;
	populateList();
}

function onSelectChange() {
	run = false;
	algorithm = sel.value().split(" ")[0];
	i = startingValues[algorithm].i;
	j = startingValues[algorithm].j;
}

function draw() {
	background(0);
	drawValues();

	if(!run) {
		return;
	}

	switch(algorithm) {
		case "Bubble":
			bubbleSort();
			break;
		case "Insertion":
			insertionSort();
			break;
		default:
			return;
	}
}

function bubbleSort() {

	if(list[j] > list[j+1]) {
		var temp = list[j];
		list[j] = list[j+1];
		list[j+1] = temp;
	}
	j++;
	if(j >= list.length-i-1) {
		i++;
		j = 0;
	}
}

function insertionSort() {
	if(i >= list.length) {
		return;
	}

	if(!sorting) {
		j = i;
	}

	if(list[j] < list[j-1] && j >= 0) {
		sorting = true;
		var temp = list[j-1];
		list[j-1] = list[j];
		list[j] = temp;
		j--;
	} else {
		sorting = false;
	}
	
	if(!sorting) {
		i++;
	}
}

function generateList() {
	for(var i = 0; i < 100; i++) {
		list.push(int(random(0,101)));
	}
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