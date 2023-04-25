import spriteRunLeft from "./assets/spriteRunLeft.png";
import spriteRunRight from "./assets/spriteRunRight.png";
import spriteStandLeft from "./assets/spriteStandLeft.png";
import spriteStandRight from "./assets/spriteStandRight.png";

export class Player {
  constructor() {
    // x:0 e y:0 é o canto superior esquerdo
    // x:100 e y:100 é o canto superior esquerdo
    this.canvas = document.querySelector("canvas");

    this.position = { x: 100, y: 100 };
    this.velocity = { x: 0, y: 0 };

    this.width = 66;
    this.height = 150;

    this.image = this.createImage(spriteStandRight);
    this.frames = 0

    this.keys = {
      right: {
        pressed: false,
      },
      left: {
        pressed: false,
      },
    };
  }

  createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    return image;
  }

  draw() {
    this.canvasContext.drawImage(
      this.image,
      177 * this.frames,
      0,
      177 ,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  setCanvasContextValue(c) {
    this.canvasContext = c;
  }

  getPositions() {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.width,
      height: this.height,
      velocity: this.velocity,
    };
  }

  getKeys() {
    return this.keys;
  }

  /*draw() {
    this.canvasContext.fillStyle = "red";
    this.canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
*/
  update(gravity) {
    this.frames++;
    if (this.frames > 28){
      this.frames = 0;
    }
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }

  setPlayerYVelocity(yVelocity) {
    this.velocity.y = yVelocity;
  }

  setPlayerXVelocity(xVelocity) {
    this.velocity.x = xVelocity;
  }

  jump() {
    this.velocity.y -= 20;
  }

  moveRight() {
    this.keys.right.pressed = true;
  }

  stopRight() {
    this.keys.right.pressed = false;
  }

  moveLeft() {
    this.keys.left.pressed = true;
  }

  stopLeft() {
    this.keys.left.pressed = false;
  }
}
