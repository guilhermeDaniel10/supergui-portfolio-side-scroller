import { Player } from "./player.js";
import { Platform } from "./platform.js";

import platform from "./assets/platform.png";
console.log(platform);

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gravity = 1;

let scrollOffset = 0;

const player = new Player();
const platforms = [new Platform(c, 200, 100), new Platform(c, 400, 200)];

player.setCanvasContextValue(c);
animate();
addEventListeners();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update(gravity);
  platforms.forEach((platform) => {
    platform.draw();
  });
  playerSideMovementVelocity();
  console.log(scrollOffset);
  detectPlayerCollisionWithPlatform();

  if(scrollOffset > 2000){
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
  } else if (playerKeys.left.pressed) {
    scrollOffset -= 5;
    platforms.forEach((platform) => {
      platform.increamentPlatformXPosition(5);
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
