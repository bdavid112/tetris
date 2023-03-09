class BlockPart {
  pos;
  color;

  constructor(pos, color) {
    this.pos = pos;
    this.color = color;
  }

  getPos() {
    return this.pos;
  }

  setPos(newPos) {
    this.pos = newPos;
  }

  getColor() {
    return this.color;
  }

  setColor(newColor) {
    this.color = newColor;
  }
}
