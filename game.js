import { randomBlock } from "./Block.js";
import { clearCanvas, context, drawGrid } from "./canvas.js";
import "./input.js";

window.requestAnimationFrame(gameLoop);

function gameLoop(time) {
  window.requestAnimationFrame(gameLoop);
  update(time);
  render();
}

const blocks = [];

function update(time) {
  createNewBlock();
  blocks.forEach((block) => {
    block.update(time);
  });
}

function render() {
  clearCanvas();
  drawGrid();
  blocks.forEach((block) => {
    block.draw(context);
  });
}

function createNewBlock() {
  if (blocks.length === 0 || blocks[blocks.length - 1].isOnGround()) {
    blocks.push(randomBlock());
  }
}
