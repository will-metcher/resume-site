function addButton(text, parent, css) {
  button = createButton(text);
  button.parent(parent);
  if (css != null) {
    button.addClass(css);
  }
  return button;
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