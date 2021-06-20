import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  physics: {
    default: 'arcade'
  },
  scene: [],
}

new Phaser.Game(config);