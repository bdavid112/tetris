import "./Block.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const OFFSET = 2;
const UNIT_WIDTH = 40;
const UNIT_HEIGHT = 40;

context.fillStyle = "#222";

for (let row = 0; row < 20; row++) {
  for (let col = 0; col < 10; col++) {
    context.fillRect(
      col * UNIT_WIDTH + OFFSET,
      row * UNIT_HEIGHT + OFFSET,
      UNIT_WIDTH - OFFSET,
      UNIT_HEIGHT - OFFSET
    );
  }
}

let block = new Block({ x: 0, y: 0 }, "blue", 0);
