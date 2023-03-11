import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  UNIT_WIDTH,
  UNIT_HEIGHT,
  OFFSET,
} from "./Block.js";

const canvas = document.getElementById("canvas");
export const context = canvas.getContext("2d");

context.fillStyle = "#222";

export function drawGrid() {
  for (let row = 0; row < CANVAS_HEIGHT; row++) {
    for (let col = 0; col < CANVAS_WIDTH; col++) {
      context.fillRect(
        col * UNIT_WIDTH + OFFSET,
        row * UNIT_HEIGHT + OFFSET,
        UNIT_WIDTH - OFFSET,
        UNIT_HEIGHT - OFFSET
      );
    }
  }
}

export function clearCanvas() {
  context.clearRect(0, 0, CANVAS_WIDTH * UNIT_WIDTH + OFFSET, CANVAS_HEIGHT * UNIT_HEIGHT + OFFSET);
}
