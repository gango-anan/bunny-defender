import Phaser from 'phaser';
import Boot from './scenes/Boot';
import Preloader from './scenes/Preloader';
import GameScene from './scenes/GameScene';
import TitleScene from './scenes/Title';
import LeaderBoard from './scenes/LeaderBoard';

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  backgroundColor: '#171642',
  scale: {
    mode: Phaser.Scale.FIT
  },
  physics: {
    default: 'arcade',
    arcade: { debug: true, }
  },
  scene: [Boot, Preloader, TitleScene ,GameScene, LeaderBoard]
}

const game = new Phaser.Game(config);