let nodes = [];
let connections = [];
let ellipseWidth = 64;

class Node {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.connections = [];
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
    this.distance = 0;
    this.calculateDistance();
  }

  calculateDistance() {
    var n1 = getNodeByID(this.n1);
    var n2 = getNodeByID(this.n2);
    this.distance = Math.abs(Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2)));
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
      console.log(node.id, neighbour.id, distance, distances[i]);
      if (distance < distances[neighbour.id]) {
        distances[neighbour.id] = distance;
      }
    }
  }

  return distances;
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

function addNode(x, y) {
  nodes.push(new Node(x, y, nodes.length));
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
  console.log(dijkstra());
}

function mouseDragged() {
  if (mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0) {
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

function draw() {
  textAlign(CENTER, CENTER);
  ellipseMode(CENTER);
  background(127);
  connections.forEach(function(connection) {
    strokeWeight(8);
    stroke(0);
    var n1 = getNodeByID(connection.n1);
    var n2 = getNodeByID(connection.n2);
    line(n1.x, n1.y, n2.x, n2.y);
  });

  nodes.forEach(function(node, i) {
    fill(255, 0, 0);
    noStroke();
    ellipse(node.x, node.y, ellipseWidth);
    fill(255);
    text(String.fromCharCode(65 + node.id), node.x, node.y);
  });
}