class CreateLink {
  constructor(href, text, x, y, className) {
    this.href = href;
    this.text = text;
    this.x = x;
    this.y = y;
    this.className = className;

    this.link = createA(href, text, ["_blank"]);
    this.link.addClass(this.className);
  }

  draw() {
    this.link.position(this.x, this.y);
    this.link.center("left");
  }

  removeLink() {
    this.link.remove();
  }
}
