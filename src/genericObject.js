export class GenericObject {
  constructor(c, x, y, genericImage, width, height) {
    // x:0 e y:0 é o canto superior esquerdo
    // x:100 e y:100 é o canto superior esquerdo
    this.canvas = document.querySelector("canvas");
    this.canvasContext = c;
    this.position = {
      x: x,
      y: y,
    };

    this.width = width;
    this.height = height;

    this.image = genericImage;
  }

  draw() {
    console.log(this.width);
    this.canvasContext.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  decrementXPosition(x) {
    this.position.x -= x;
  }

  incrementXPosition(x) {
    this.position.x += x;
  }
}
