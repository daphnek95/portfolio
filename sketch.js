//allow the game to jump through different screens
let state = 0;

//snake segments
let snakeSegments = 5;
let direction = 'right';

//snake starting coords
const xStart = 0;
const yStart = 400;
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;

function setup() {
  createCanvas(600, 500);
  frameRate(15);
  stroke(54, 73, 88);
  strokeWeight(20);
  updateFruitCoordinates();
  for (let i = 0; i < snakeSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  switch(state) {
    case 0: //intro
      background(59, 96, 100);
      snakeSegments = 5;
      updateFruitCoordinates();
      break;
    case 1: //snake game
      background(214, 219, 230);
      for (let i = 0; i < snakeSegments - 1; i++) {
        line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
      }
      updateSnakeCoordinates();
      checkForFruit();
      loop();
      break;
      
  }
}

function updateSnakeCoordinates() {
  for (let i = 0; i < snakeSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
    if (xCor[snakeSegments - 1] > 700) {
      xCor[i] = -100;
    }
    if (xCor[snakeSegments - 1] < -100) {
      xCor[i] = 700;
    }
    if (yCor[snakeSegments - 1] > 600) {
      yCor[i] = -100;
    }
    if (yCor[snakeSegments - 1] < -100) {
      yCor[i] = 600;
    }
    if (xCor.length >= 300) {
      xCor.length = 5;
    }
    if (yCor.length >= 300) {
      yCor.length = 5;
    }
  }
  switch (direction) {
    case 'right':
      xCor[snakeSegments - 1] = xCor[snakeSegments - 2] + diff;
      yCor[snakeSegments - 1] = yCor[snakeSegments - 2];
      break;
    case 'up':
      xCor[snakeSegments - 1] = xCor[snakeSegments - 2];
      yCor[snakeSegments - 1] = yCor[snakeSegments - 2] - diff;
      break;
    case 'left':
      xCor[snakeSegments - 1] = xCor[snakeSegments - 2] - diff;
      yCor[snakeSegments - 1] = yCor[snakeSegments - 2];
      break;
    case 'down':
      xCor[snakeSegments - 1] = xCor[snakeSegments - 2];
      yCor[snakeSegments - 1] = yCor[snakeSegments - 2] + diff;
      break;
  }
}

function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    snakeSegments++;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  /*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */

  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case 65:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 68:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 87:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 83:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}

function mousePressed() {
  if (state==0) {
    state = 1;
  }
}