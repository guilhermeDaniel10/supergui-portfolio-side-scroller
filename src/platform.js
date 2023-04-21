export class Platform {
    constructor(c, x, y) {
      // x:0 e y:0 é o canto superior esquerdo
      // x:100 e y:100 é o canto superior esquerdo
      this.canvas = document.querySelector("canvas");
      this.canvasContext = c;
      this.position = {
        x: x,
        y: y,
      };
  
      this.width = 200;
      this.height = 20;
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
      this.canvasContext.fillStyle = "blue";
      this.canvasContext.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height,
        this.height
      );
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
  