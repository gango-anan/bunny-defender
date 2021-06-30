import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('titleImage', 'assets/images/TitleBG.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}