import Phaser from 'phaser';
import Boot from './scenes/Boot';
import GameScene from './scenes/GameScene';
import Preloader from './scenes/Preloader';
import Title from './scenes/Title';

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  backgroundColor: '#171642',
  scale: {
    mode: Phaser.Scale.FIT
  },
  physics: {
    default: 'arcade'
  },
  scene: [Boot, Preloader]
}

const game = new Phaser.Game(config);