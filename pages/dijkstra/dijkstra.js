let nodes = [];
let connections = [];
let ellipseWidth = 64;
let addingConnection = false;
let newConnections = [];
let simWidth = 0;

class Node {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.connections = [];
    this.selected = false;
  }

  addConnection(node) {
    if (!this.connections.includes(node)) {
      this.connections.push(node);
    }
  }
}

class Connection {
  constructor(n1, n2) {
    this.n1 = n1;
    this.n2 = n2;
    this.distance = Infinity;
    this.calculateDistance();
  }

  calculateDistance() {
    var n1 = getNodeByID(this.n1);
    var n2 = getNodeByID(this.n2);
    this.distance = Math.round(Math.abs(Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2))));
  }
}

function dijkstra() {
  var distances = [0];
  for (var i = 0; i < nodes.length - 1; i++) {
    distances.push(Infinity);
  }

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    for (var n = 0; n < node.connections.length; n++) {
      var neighbour = getNodeByID(node.connections[n]);
      var distance = distances[i] + getConnection(node.id, neighbour.id).distance;
      if (distance < distances[neighbour.id]) {
        distances[neighbour.id] = distance;
      }
    }
  }

  updateTable(distances);
}

function getNodeByID(id) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) {
      return nodes[i];
    }
  }
  return null;
}

function doesConnectionExist(n1, n2) {
  for (var i = 0; i < connections.length; i++) {
    if ((connections[i].n1 == n1 && connections[i].n2 == n2) || (connections[i].n1 == n2 && connections[i].n2 == n1)) {
      return true;
    }
  }
  return false;
}

function getConnection(n1, n2) {
  for (var i = 0; i < connections.length; i++) {
    if ((connections[i].n1 == n1 && connections[i].n2 == n2) || (connections[i].n1 == n2 && connections[i].n2 == n1)) {
      return connections[i];
    }
  }
  return null;
}

function addNode(x = simWidth / 2, y = height / 2) {
  nodes.push(new Node(x, y, nodes.length));
  document.getElementById("dijikstra-table").append(addTableRow([String.fromCharCode(65 + nodes[nodes.length - 1].id), 0], false, (nodes.length - 1).toString()));
}

function addConnection(n1, n2) {
  if (!doesConnectionExist(n1, n2)) {
    connections.push(new Connection(n1, n2));
  }
  getNodeByID(n1).addConnection(n2);
  getNodeByID(n2).addConnection(n1);
}

function setup() {
  var cnv = createCanvas(1080, 720);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  simWidth = width * 0.75;
  createGUI();
  frameRate(60);
  addNode(100, 100);
  addNode(300, 300);
  addNode(500, 100);
  addNode(500, 400);
  addNode(700, 150);
  addNode(720, 550);
  addConnection(0, 1);
  addConnection(1, 2);
  addConnection(2, 5);
  addConnection(2, 3);
  addConnection(1, 3);
  addConnection(2, 4);
  addConnection(4, 5);
  addConnection(3, 5);
  addConnection(0, 2);
  dijkstra();
}

function mouseDragged() {
  if (!isMouseInBounds(mouseX, mouseY, simWidth, height) || addingConnection) {
    return;
  }
  var node = getNodeByID(getElementClicked(mouseX, mouseY));
  if (node == null) {
    return;
  }
  node.x = mouseX;
  node.y = mouseY;
  connections.forEach(function(connection) {
    connection.calculateDistance();
  });

  dijkstra();
}

function mousePressed() {
  nodes.forEach(function(node) {
    node.selected = false;
  });

  if (!isMouseInBounds(mouseX, mouseY, simWidth, height)) {
    return;
  }
  var node = getNodeByID(getElementClicked(mouseX, mouseY));
  if (node == null) {
    return;
  }
  if (addingConnection && !newConnections.includes(node.id)) {
    newConnections.push(node.id);
  }
  node.selected = true;
}

function getElementClicked(x, y) {
  var r = ellipseWidth / 2;
  for (var i = 0; i < nodes.length; i++) {
    if (x <= nodes[i].x + r && x >= nodes[i].x - r && y <= nodes[i].y + r && y >= nodes[i].y - r) {
      return nodes[i].id;
    }
  }
  return -1;
}

function createGUI() {
  var guiContainer = addContainer();

  var addNodeBtn = addButton("Add Node", guiContainer, "p5-buttons");
  addNodeBtn.mousePressed(function() {
    addNode();
  });

  var addConnectionBtn = addButton("Add Connection", guiContainer, "p5-buttons");
  addConnectionBtn.mousePressed(function() {
    addingConnection = true;
  })

  var resetBtn = addButton("Reset", guiContainer, "p5-buttons");
  resetBtn.mousePressed(function() {
    location.reload();
  });

  var helpBtn = addButton("Help", guiContainer, "p5-buttons");
  helpBtn.mousePressed(function() {
    toggleHelpPopup();
  });

  var tableDiv = createDiv();
  tableDiv.id("tableDiv");
  tableDiv.position(windowWidth / 2 + width / 4, (windowHeight - height) / 2);
  tableDiv.size(width - simWidth, height);

  var table = document.createElement("table");
  table.id = "dijikstra-table";


  table.append(addTableRow(["Node", "Shortest path from A"], true));

  tableDiv.child(table);
}

function updateTable(distances) {
  for (var i = 0; i < nodes.length; i++) {
    var cell = document.getElementsByClassName(i)[1];
    cell.innerHTML = distances[i];
  }
}

function toggleHelpPopup() {
  var popup = document.getElementById("help-popup");
  if (window.getComputedStyle(popup).visibility == 'hidden') {
    popup.style.visibility = "visible";
  } else {
    popup.style.visibility = "hidden";
  }
}

function draw() {
  textAlign(CENTER, CENTER);
  ellipseMode(CENTER);
  background(127);
  textSize(20);
  connections.forEach(function(connection) {
    strokeWeight(8);
    stroke(0);
    var n1 = getNodeByID(connection.n1);
    var n2 = getNodeByID(connection.n2);
    line(n1.x, n1.y, n2.x, n2.y);
    var midX = (n1.x + n2.x) / 2;
    var midY = (n1.y + n2.y) / 2;
    stroke(255);
    strokeWeight(0);
    fill(255);
    text(connection.distance, midX, midY);
  });

  nodes.forEach(function(node, i) {
    fill(255, 0, 0);
    if (node.selected) {
      fill(0, 140, 186);
    }
    noStroke();
    ellipse(node.x, node.y, ellipseWidth);
    fill(255);
    text(String.fromCharCode(65 + node.id), node.x, node.y);
  });

  if (newConnections.length == 2) {
    addConnection(newConnections[0], newConnections[1]);
    dijkstra();
    newConnections = [];
    addingConnection = false;
  }

  drawTable();
}

function drawTable() {
  fill(255);
  strokeWeight(2);
  stroke(0);
  rect(simWidth, 0, width - simWidth, height);
}