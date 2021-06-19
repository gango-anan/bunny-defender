import style from './main.css';
import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

let player;
let cursors;

function preload() {
  this.load.image('titleBg', 'assets/images/TitleBG.png');
  this.load.image('titleImage', 'assets/images/TitleImage.png');
  this.load.image('explosion', 'assets/images/explosion.png');
  this.load.image('ghost', 'assets/images/ghost.png');
  this.load.image('hill', 'assets/images/hill.png');
  this.load.image('loaderBar', 'assets/images/loader_bar.png');
  this.load.image('sky', 'assets/images/sky.png');
  this.load.spritesheet('dude', 'assets/images/spritesheets/dude.png',{frameWidth: 32, frameHeight: 48});
}

function create() {
  this.add.image(0, 0, 'titleBg').setOrigin(0,0);

  player = this.physics.add.sprite(270, 786, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
}

new Phaser.Game(config);