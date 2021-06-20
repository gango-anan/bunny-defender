import style from './main.css';
import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
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
let score = 0;
let scoreText;
let rocks;
//=================================
let platforms;

function preload() {
  this.load.image('titleBg', 'assets/images/TitleBG.png');
  this.load.image('titleImage', 'assets/images/TitleImage.png');
  this.load.image('explosion', 'assets/images/explosion.png');
  this.load.image('ghost', 'assets/images/ghost.png');
  this.load.image('hill', 'assets/images/hill.png');
  this.load.image('loaderBar', 'assets/images/loader_bar.png');
  this.load.image('sky', 'assets/images/sky.png');
  this.load.image('rock', 'assets/images/star.png');
  this.load.image('ground', 'assets/images/platform.png');
  this.load.spritesheet('dude', 'assets/images/spritesheets/dude.png',{frameWidth: 32, frameHeight: 48});
}

function create() {
  this.add.image(0, 0, 'titleBg').setOrigin(0,0);

  platforms = this.physics.add.staticGroup();
  platforms.create(270, 768, 'ground').setScale(2).refreshBody();

  player = this.physics.add.sprite(270, 0, 'dude');
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

  rocks = this.physics.add.group({
    key: 'rock',
    repeat: 8,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  //=================================
  rocks.children.iterate( function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
  
  //=================================
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(rocks, platforms);
  this.physics.add.overlap(player, rocks, collectRock, null, this);
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

function collectRock (player, rock) {
    rock.disableBody(true, true);
    score += 5;
    scoreText.setText('Score: ' + score);
}

new Phaser.Game(config);