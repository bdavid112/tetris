import "./Block.js";

const canvas = document.getElementById("canvas");
export const context = canvas.getContext("2d");

export const OFFSET = 2;
export const CANVAS_WIDTH = 402;
export const CANVAS_HEIGHT = 402;
export const UNIT_WIDTH = 40;
export const UNIT_HEIGHT = 40;

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