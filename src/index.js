import style from './main.css';
import Phaser from 'phaser';

const canvas = document.getElementById('game-container');

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  canvas,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload,
    create,
    update
  }
}

function preload() {
  this.load.image('titleBg', 'assets/images/TitleBG.png');
  this.load.image('titleImage', 'assets/images/TitleImage.png');
  this.load.image('titleBg', 'assets/images/explosion.png');
  this.load.image('titleBg', 'assets/images/ghost.png');
  this.load.image('titleBg', 'assets/images/hill.png');
  this.load.image('titleBg', 'assets/images/loader_bar.png');
  this.load.image('titleBg', 'assets/images/sky.png');
}

function create() {
  this.add.image(0, 0, 'titleBg').setOrigin(0,0);
}

function update() {
  
}

new Phaser.Game(config);