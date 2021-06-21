export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('titleImage', 'assets/images/TitleImage.png');
  }

  create() {
    this.scene.start('Preloader');
  }

}