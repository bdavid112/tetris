class Block {
  pos;
  img;
  shape;

  constructor(pos, color, type) {
    this.pos = pos;
    this.getImg(color);
    this.defineShape(type);
  }

  getImg(color) {
    switch (color) {
      case "blue":
        this.img = document.getElementById("block_blue.png");
    }
  }

  defineShape(type) {
    switch (type) {
      case 0:
        this.shape = [
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
        ];
        break;
      case 1:
        this.shape = [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 3:
        this.shape = [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 4:
        this.shape = [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 5:
        this.shape = [
          [0, 0, 0, 0],
          [0, 0, 1, 1],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 6:
        this.shape = [
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 1, 1],
          [0, 0, 0, 0],
        ];
        break;
      case 7:
        this.shape = [
          [0, 0, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
        ];
        break;
    }
  }
}
