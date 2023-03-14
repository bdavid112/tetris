let userInput = 0;
let fastMode = false;
let rotate = false;

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      userInput = -1;
      break;
    case "ArrowRight":
      userInput = 1;
      break;
    case "ArrowDown":
      fastMode = true;
      break;
    case "Space":
      toggleRotate();
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowDown":
      fastMode = false;
      break;
  }
});

export function isFastMode() {
  return fastMode;
}

export function getRotate() {
  return rotate;
}

export function toggleRotate() {
  rotate = !rotate;
}

export function getUserInput() {
  return userInput;
}

export function setUserInput(input) {
  userInput = input;
}
