import {
  getRotate,
  getUserInput,
  isFastMode,
  setUserInput,
  toggleRotate,
} from "./input.js";
import {
  BlockType,
  BlockType90,
  BlockType180,
  BlockType270,
} from "./blockTypes.js";

export const OFFSET = 2;
export const UNIT_WIDTH = 40;
export const UNIT_HEIGHT = 40;
export const CANVAS_WIDTH = 10;
export const CANVAS_HEIGHT = 20;

const BLOCK_SIDE = 4;

const FAST_SPEED = 50;
export let SPEED = 2;

const Color = {
  0: "blue",
  1: "green",
  2: "orange",
  3: "red",
  4: "yellow",
};

export function randomBlock() {
  const randomType = Math.floor(Math.random() * 7);
  const randomColor = Math.floor(Math.random() * 5);
  return new Block({ x: 160, y: 0 }, Color[randomColor], randomType);
}

function hit(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function hitLeft(pos1, pos2) {
  return hit({ x: pos1.x - UNIT_WIDTH, y: pos1.y }, pos2);
}

function hitRight(pos1, pos2) {
  return hit({ x: pos1.x + UNIT_WIDTH, y: pos1.y }, pos2);
}

function hitDown(pos1, pos2) {
  return hit({ x: pos1.x, y: pos1.y + UNIT_HEIGHT }, pos2);
}

function getTakenPositions(blocksOnGround) {
  const takenPositions = [];
  blocksOnGround.forEach((block) => {
    block.getPartPositions().forEach((part) => {
      takenPositions.push({ ...part });
    });
  });
  return takenPositions;
}

export class Block {
  pos;
  type;
  img;
  parts;
  height;
  rotation = 0;
  onGround = false;
  lastMoveTime = 0;

  constructor(pos, color, type) {
    this.type = type;
    this.img = document.getElementById(`block-${color}`);
    this.setParts(this.type);
    this.pos = { x: pos.x, y: pos.y + this.height * UNIT_HEIGHT };
  }

  update(time, blocksOnGround) {
    if (getRotate()) {
      this.increaseRotation();
      toggleRotate();
      this.setParts(this.type);
      while (this.hitsBorder() != 0) {
        console.log("HIT WALL");
        this.pos.x += -1 * this.hitsBorder() * UNIT_WIDTH;
      }
    }
    if (blocksOnGround.length > 0) {
      const hitNeighbour = this.hitsNeighbour(blocksOnGround);
      if (
        (hitNeighbour == -1 && getUserInput() == 1) ||
        (hitNeighbour == 1 && getUserInput() == -1) ||
        hitNeighbour == 0
      ) {
        this.updateX();
      }
    } else this.updateX();
    this.updateY(time, blocksOnGround);
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
    if (this.hitsBorder() == -1 && getUserInput() == -1) return;
    if (this.hitsBorder() == 1 && getUserInput() == 1) return;
    if (!this.onGround) {
      this.pos.x += getUserInput() * UNIT_WIDTH;
      setUserInput(0);
    }
  }

  updateY(time, blocksOnGround) {
    const secondsSinceLastMove = (time - this.lastMoveTime) / 1000;
    if (isFastMode() && secondsSinceLastMove < 1 / FAST_SPEED) return;
    if (!isFastMode() && secondsSinceLastMove < 1 / SPEED) return;
    if (this.hitsGround(blocksOnGround)) this.onGround = true;
    if (this.isOnGround()) return;
    this.lastMoveTime = time;
    this.pos.y += UNIT_HEIGHT;
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

  increaseRotation() {
    this.rotation += 90;
    if (this.rotation == 360) this.rotation = 0;
  }

  getPartPositions() {
    const positions = [];
    for (let row = 0; row < BLOCK_SIDE; row++) {
      for (let col = 0; col < BLOCK_SIDE; col++) {
        if (this.parts[row][col] === 1) {
          const x = this.pos.x + col * UNIT_WIDTH;
          const y = this.pos.y - (3 - row) * UNIT_HEIGHT;
          positions.push({ x: x, y: y });
        }
      }
    }
    return positions;
  }

  hitsBorder() {
    let borderHit = 0;
    this.getPartPositions().forEach((pos) => {
      if (hit(pos, { x: 0, y: pos.y })) borderHit = -1;
      if (hitRight(pos, { x: CANVAS_WIDTH * UNIT_WIDTH, y: pos.y })) {
        borderHit = 1;
      }
    });
    return borderHit;
  }

  hitsNeighbour(blocksOnGround) {
    let neighborHit = 0;
    getTakenPositions(blocksOnGround).forEach((takenPos) => {
      this.getPartPositions().forEach((actPos) => {
        if (hitLeft(actPos, takenPos)) neighborHit = -1;
        if (hitRight(actPos, takenPos)) neighborHit = 1;
      });
    });
    return neighborHit;
  }

  hitsGround(blocksOnGround) {
    let bool = false;
    this.getPartPositions().forEach((actPos) => {
      if (blocksOnGround.length > 0) {
        getTakenPositions(blocksOnGround).forEach((takenPos) => {
          if (hitDown(actPos, takenPos)) bool = true;
        });
      }
      if (hit(actPos, { x: actPos.x, y: CANVAS_HEIGHT * UNIT_HEIGHT })) {
        bool = true;
      }
    });
    return bool;
  }

  setParts(type) {
    switch (this.rotation) {
      case 0:
        this.parts = BlockType[type];
        break;
      case 90:
        this.parts = BlockType90[type];
        break;
      case 180:
        this.parts = BlockType180[type];
        break;
      case 270:
        this.parts = BlockType270[type];
        break;
    }
    this.setHeight();
  }

  isOnGround() {
    return this.onGround;
  }
}
