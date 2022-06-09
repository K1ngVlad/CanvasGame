console.log('Игра запущена');

const canvas = document.querySelector('.render');
const ctx = canvas.getContext('2d');
console.log('Контекст получен');
console.log(ctx);
// ctx.fillRect(64, 64, 64, 64);

class Object {
  constructor(positionX, positionY, width, height, sprite) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
  }

  render() {
    ctx.drawImage(
      this.sprite,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
}

class Player extends Object {
  constructor(positionX, positionY, width, height, sprite) {
    super(positionX, positionY, width, height, sprite);
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  moveX() {
    this.positionX += this.xSpeed;
  }

  moveY() {
    this.positionY += this.ySpeed;
  }

  focus() {
    ctx.restore();
    ctx.save();
    const canvasHeight = window.innerHeight * 0.8;
    const canvasWidth = window.innerWidth * 0.8;
    ctx.translate(
      -this.positionX + canvasWidth / 2 - this.width / 2,
      -this.positionY + canvasHeight / 2 - this.height / 2
    );
  }
}

class Cat extends Player {
  constructor(position, width, height, playerName, sprite) {
    super(position, width, height, playerName, sprite);
  }
}

class Mouse extends Player {
  constructor(position, width, height, playerName, sprite) {
    super(position, width, height, playerName, sprite);
  }
}

const wingImg = new Image();
const plImg = new Image();
wingImg.src = 'img/pngwing.png';
plImg.src = 'img/WhiteKing.png';
const newPlayer = new Player(0, 0, 64, 64, plImg);
const newPlayer2 = new Player(64, 64, 64, 64, plImg);
const obj = new Object(32, 32, 64, 64, wingImg);

let choisenPlayer = newPlayer;

const left = keyboard('ArrowLeft'),
  up = keyboard('ArrowUp'),
  right = keyboard('ArrowRight'),
  down = keyboard('ArrowDown'),
  space = keyboard(' ');

left.press = () => {
  choisenPlayer.xSpeed = -5;
};

left.release = () => {
  if (right.isUp) {
    choisenPlayer.xSpeed = 0;
  } else {
    choisenPlayer.xSpeed = 5;
  }
};

right.press = () => {
  choisenPlayer.xSpeed = 5;
};

right.release = () => {
  if (left.isUp) {
    choisenPlayer.xSpeed = 0;
  } else {
    choisenPlayer.xSpeed = -5;
  }
};

up.press = () => {
  choisenPlayer.ySpeed = -5;
};

up.release = () => {
  choisenPlayer.ySpeed = 0;
};

down.press = () => {
  choisenPlayer.ySpeed = 5;
};

down.release = () => {
  choisenPlayer.ySpeed = 0;
};

space.press = () => {
  if (choisenPlayer === newPlayer) {
    choisenPlayer = newPlayer2;
    newPlayer.xSpeed = 0;
    newPlayer.ySpeed = 0;
  } else {
    choisenPlayer = newPlayer;
    newPlayer2.xSpeed = 0;
    newPlayer2.ySpeed = 0;
  }
};

const clearScreen = () => {
  const canvasHeight = window.innerHeight * 0.8;
  const canvasWidth = window.innerWidth * 0.8;
  ctx.clearRect(
    choisenPlayer.positionX - canvasWidth / 2 + choisenPlayer.width / 2,
    choisenPlayer.positionY - canvasHeight / 2 + choisenPlayer.height / 2,
    canvasWidth,
    canvasHeight
  );
};

const startGame = () => {
  clearScreen();
  choisenPlayer.moveX();
  choisenPlayer.moveY();
  choisenPlayer.focus();
  newPlayer.render();
  newPlayer2.render();
  obj.render();
};

wingImg.onload = () => {
  plImg.onload = () => {
    // setTimeout(startGame(), 10);
    setInterval(startGame, 10);
    // startGame();
  };
};
