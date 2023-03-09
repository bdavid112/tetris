import {
  OFFSET,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  UNIT_WIDTH,
  UNIT_HEIGHT,
  context,
} from "./canvas.js";

class Block {
  pos;
  color;
  type;
  img;
  parts;

  constructor(pos, color, type) {
    this.pos = pos;
    this.color = color;
    this.type = type;
    this.img = document.getElementById(`block-${color}`);
    this.initParts(this.type);
  }

  draw() {
    for (let row = 0; row < this.parts.length; row++) {
      for (let col = 0; col < this.parts[row].length; col++) {
        if (this.parts[row][col] === 1) {
          context.drawImage(
            img,
            col * UNIT_WIDTH + OFFSET + this.pos.x,
            row * UNIT_HEIGHT + OFFSET + this.pos.y
          );
        }
      }
    }
  }

  initParts(type) {
    switch (type) {
      case 0:
        this.parts = [
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
        ];
        break;
      case 1:
        this.parts = [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 3:
        this.parts = [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 4:
        this.parts = [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 5:
        this.parts = [
          [0, 0, 0, 0],
          [0, 0, 1, 1],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 6:
        this.parts = [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 1, 1],
          [0, 0, 0, 0],
        ];
        break;
      case 7:
        this.parts = [
          [0, 0, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
        ];
        break;
    }
  }
}