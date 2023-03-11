import { getUserInput, isFastMode, setUserInput } from "./input.js";

export const OFFSET = 2;
export const UNIT_WIDTH = 40;
export const UNIT_HEIGHT = 40;
export const CANVAS_WIDTH = 10;
export const CANVAS_HEIGHT = 20;

const BLOCK_SIDE = 4;

const FAST_SPEED = 50;
export let SPEED = 1;

export function randomBlock() {
  const randomNumber = Math.floor(Math.random() * 7);
  return new Block({ x: 160, y: 0 }, "blue", randomNumber);
}

export class Block {
  pos;
  type;
  img;
  parts;
  width;
  height;
  onGround = false;
  lastMoveTime = 0;

  constructor(pos, color, type) {
    this.type = type;
    this.img = document.getElementById(`block-${color}`);
    this.initParts(this.type);
    this.setWidth();
    this.setHeight();
    this.pos = { x: pos.x, y: pos.y + this.height * UNIT_HEIGHT };
  }

  update(time) {
    this.updateX();
    const secondsSinceLastMove = (time - this.lastMoveTime) / 1000;
    if (isFastMode() && secondsSinceLastMove < 1 / FAST_SPEED) return;
    if (!isFastMode() && secondsSinceLastMove < 1 / SPEED) return;
    this.lastMoveTime = time;
    this.updateY();
  }

  draw(context) {
    for (let row = this.parts.length - 1; row >= 0; row--) {
      for (let col = 0; col < this.parts[row].length; col++) {
        if (this.parts[row][col] === 1) {
          context.drawImage(
            this.img,
            col * UNIT_WIDTH + OFFSET + this.pos.x,
            row * UNIT_HEIGHT + OFFSET + this.pos.y - BLOCK_SIDE * UNIT_HEIGHT
          );
        }
      }
    }
  }

  updateX() {
    if (getUserInput() === -1 && this.pos.x - UNIT_WIDTH < 0) return;
    if (getUserInput() === 1 && this.pos.x + UNIT_WIDTH > UNIT_WIDTH * CANVAS_WIDTH) return;
    if (!this.onGround) {
      this.pos.x += getUserInput() * UNIT_WIDTH;
      setUserInput(0);
    }
  }

  updateY() {
    if (!this.onGround) {
      this.pos.y += UNIT_HEIGHT;
      this.checkOnGround();
    }
  }

  checkOnGround() {
    if (!(this.pos.y + UNIT_HEIGHT <= CANVAS_HEIGHT * UNIT_HEIGHT)) {
      this.onGround = true;
    }
  }

  setHeight() {
    let emptyRows = 0;
    this.parts.forEach((row) => {
      let emptyCells = 0;
      row.forEach((col) => {
        if (col === 0) emptyCells++;
      });
      if (emptyCells === BLOCK_SIDE) emptyRows++;
    });
    this.height = BLOCK_SIDE - emptyRows;
  }

  setWidth() {
    let emptyCols = 0;
    for (let col = 0; col < BLOCK_SIDE; col++) {
      for (let row = 0; row < BLOCK_SIDE; row++) {
        if (this.parts[row][col] === 1) break;
        if (row === BLOCK_SIDE - 1) emptyCols++;
      }
    }
    this.width = BLOCK_SIDE - emptyCols;
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
          [0, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 0, 0],
        ];
        break;
      case 2:
        this.parts = [
          [0, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 1, 0, 0],
        ];
        break;
      case 3:
        this.parts = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 0, 0],
          [1, 1, 0, 0],
        ];
        break;
      case 4:
        this.parts = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [1, 1, 0, 0],
        ];
        break;
      case 5:
        this.parts = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 0, 0],
          [0, 1, 1, 0],
        ];
        break;
      case 6:
        this.parts = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 1, 0],
        ];
        break;
    }
  }

  isOnGround() {
    return this.onGround;
  }
}
