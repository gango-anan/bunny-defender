import Phaser from 'phaser';
import Boot from './scenes/Boot';

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  physics: {
    default: 'arcade'
  },
  scene: [Boot],
}

const game = new Phaser.Game(config);