import "./style.css";
import { Player } from "./player.js";
import { Platform } from "./platform.js";
import { GenericObject } from "./genericObject.js";
import platform from "./assets/Plataforma_relva.png";
import hills from "./assets/hills.png";
import clerigos from "./assets/background-clerigos-better.png";
import cloud from "./assets/cloud.png";
import porto from "./assets/transferir.png";
import infoBlock from "./assets/info_block.png";
import ponte from "./assets/pontedluis.png";
import casamusica from "./assets/casadamusica.png";



const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
const gravity = 1;
let scrollOffset = 0;

let platformWidth;
let platforms;
let player;

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

player = new Player();

platforms = [
  new Platform(c, -1, 470, createImage(platform)),
  new Platform(c, 579, 470, createImage(platform)),
  new Platform(c, 320, 250, createImage(infoBlock)),
];

const genericObjects = [
  new GenericObject(c, 200, -10, createImage(clerigos), 110, 500),
  new GenericObject(c, 600, 27, createImage(cloud), 200, 100),
  new GenericObject(c, 600, 27, createImage(cloud), 200, 100),
  new GenericObject(c, 380, 270, createImage(casamusica), 280, 200),

  //new GenericObject(c, 60, 28, createImage(cloud), 2400, 1316),
];

player.setCanvasContextValue(c);
animate();
addEventListeners();

function animate() {
  requestAnimationFrame(animate);
  let my_gradient = c.createLinearGradient(0, 0, 0, 170);
  my_gradient.addColorStop(0, "#38a3d1");
  my_gradient.addColorStop(0.7, "#90dffe");

  c.fillStyle = my_gradient;
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update(gravity);
  playerSideMovementVelocity();
  console.log(scrollOffset);
  detectPlayerCollisionWithPlatform();

  if (scrollOffset > 2000) {
    console.log("win");
  }
}

function playerSideMovementVelocity() {
  const playerPositions = player.getPositions();
  const playerKeys = player.getKeys();

  if (playerKeys.right.pressed && playerPositions.x < 400) {
    player.setPlayerXVelocity(5);
  } else if (playerKeys.left.pressed && playerPositions.x > 100) {
    player.setPlayerXVelocity(-5);
  } else {
    player.setPlayerXVelocity(0);
  }

  if (playerKeys.right.pressed) {
    scrollOffset += 5;
    platforms.forEach((platform) => {
      platform.decreamentPlatformXPosition(5);
    });

    genericObjects.forEach((genericObject) => {
      genericObject.decrementXPosition(2);
    });
  } else if (playerKeys.left.pressed) {
    scrollOffset -= 5;
    platforms.forEach((platform) => {
      platform.increamentPlatformXPosition(5);
    });

    genericObjects.forEach((genericObject) => {
      genericObject.incrementXPosition(2);
    });
  }
}

function detectPlayerCollisionWithPlatform() {
  const playerPositions = player.getPositions();

  platforms.forEach((platform) => {
    const platformPositions = platform.getPositions();

    if (
      playerPositions.y + playerPositions.height <= platformPositions.y &&
      playerPositions.y + playerPositions.height + playerPositions.velocity.y >=
        platformPositions.y &&
      playerPositions.x + playerPositions.width >= platformPositions.x &&
      playerPositions.x <= platformPositions.x + platformPositions.width
    ) {
      player.setPlayerYVelocity(0);
    }
  });
}

function addEventListeners() {
  addEventListener("keydown", ({ key }) => {
    switch (key) {
      case "a":
        player.moveLeft();
        break;
      case "d":
        player.moveRight();
        break;
      case "w":
        console.log("jump up");
        player.jump();
        break;
      case "s":
      //player.duck();
    }
  });

  addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "a":
        player.stopLeft();
        break;
      case "d":
        player.stopRight();
        break;
      case "w":
        //player.jump();
        break;
      case "s":
      //player.duck();
    }
  });
}
