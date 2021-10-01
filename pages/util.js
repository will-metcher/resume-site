function addContainer(position = "bottom") {
  var guiContainer = createDiv();
  if (position == "bottom") {
    guiContainer.position(windowWidth / 2 - width / 2, windowHeight / 2 + height / 2);
  }
  guiContainer.id("gui");
  return guiContainer;
}

function addButton(text, parent, css) {
  button = createButton(text);
  button.parent(parent);
  if (css != null) {
    button.addClass(css);
  }
  return button;
}

function isMouseInBounds(mx, my, w, h) {
  return (mx < w && my < h && my > 0 && my > 0);
}

function addSelect(parent, options, css) {
  sel = createSelect();
  sel.parent(parent);
  for (var i = 0; i < options.length; i++) {
    sel.option(options[i]);
  }
  sel.addClass(css);
  return sel;
}

function addTableRow(cells, isHeading = false, rowId = "") {
  var row = document.createElement("tr");
  for (var i = 0; i < cells.length; i++) {
    if (isHeading) {
      row.append(addTableHeading(cells[i]));
    } else {
      row.append(addTableCell(cells[i], rowId));
    }
  }
  return row;
}

function addTableHeading(title) {
  var th = document.createElement("th");
  th.innerHTML = title;
  return th;
}

function addTableCell(text, css = "") {
  var td = document.createElement("td");
  td.innerHTML = text;
  if (css != "") {
    td.classList.add(css);
  }
  return td;
}

function randomInt(max = 100) {
  return Math.round(Math.random() * max);
}

function absVector(v) {
  return createVector(Math.abs(v.x), Math.abs(v.y));
}