import { randomBlock } from "./Block.js";
import { clearCanvas, context, drawGrid } from "./canvas.js";
import "./input.js";

window.requestAnimationFrame(gameLoop);

function gameLoop(time) {
  window.requestAnimationFrame(gameLoop);
  update(time);
  render();
}

let actualBlock = randomBlock();
const blocksOnGround = [];

function update(time) {
  actualBlock.update(time, blocksOnGround);
  if (actualBlock.isOnGround()) {
    blocksOnGround.push(actualBlock);
    actualBlock = randomBlock();
  }
}

function render() {
  clearCanvas();
  drawGrid();
  actualBlock.draw(context);
  blocksOnGround.forEach((block) => {
    block.draw(context);
  });
}