function addContainer() {
  var guiContainer = createDiv();
  guiContainer.position(windowWidth / 2 - width / 2, windowHeight / 2 + height / 2);
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
  return (mx < w || my < h || my > 0 || my > 0);
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