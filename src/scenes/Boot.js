export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('preloaderBar', 'assets/images/loader_bar.png');
    this.load.image('titleImage', 'assets/images/TitleImage.png');
  }

  create() {
    this.scene.start('Preloader');
  }

}