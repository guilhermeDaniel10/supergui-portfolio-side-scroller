export class Platform {
  constructor(c, x, y, platformImage) {
    // x:0 e y:0 é o canto superior esquerdo
    // x:100 e y:100 é o canto superior esquerdo
    this.canvas = document.querySelector("canvas");
    this.canvasContext = c;
    this.position = {
      x: x,
      y: y,
    };

    this.image = platformImage;
    const platform = this; // save "this" for use inside the event listener
    platformImage.addEventListener("load", function () {
      platform.width = platformImage.width; // set the width property
      platform.height = platformImage.height; // set the height property
    });
  }

  setPlatformXPosition(x) {
    this.position.x = x;
  }

  decreamentPlatformXPosition(x) {
    this.position.x -= x;
  }

  increamentPlatformXPosition(x) {
    this.position.x += x;
  }

  setPlatformYPosition(y) {
    this.position.y = y;
  }

  setCanvasContextValue(c) {
    this.canvasContext = c;
  }

  draw() {
    this.canvasContext.drawImage(this.image, this.position.x, this.position.y);
  }

  getPositions() {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.width,
      height: this.height,
    };
  }
}
