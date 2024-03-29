import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
    this.ready = false;
  }

  preload() {
    const titleText = this.add.image(0, 0, 'titleImage').setOrigin(0, 0);
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x050511, 0.5);
    progressBox.fillRect(80, 600, 380, 50);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xff9200, 1);
      progressBar.fillRect(90, 612, 360 * value, 25);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      titleText.destroy();
    });
    this.load.html('form', 'assets/images/form.html');
    this.load.image('title', 'assets/images/TitleImage.png');
    this.load.image('explosion', 'assets/images/explosion.png');
    this.load.image('ghost', 'assets/images/ghost.png');
    this.load.image('hill', 'assets/images/hill.png');
    this.load.image('sky', 'assets/images/sky.png');
    this.load.spritesheet('bunny', 'assets/images/spritesheets/bunny.png', { frameHeight: 70, frameWidth: 64 });
    this.load.atlasXML('bunnyAtlas', 'assets/images/spritesheets/bunny.png', 'assets/images/spritesheets/bunny.xml');
    this.load.atlasXML('spaceRock', 'assets/images/spritesheets/SpaceRock.png', 'assets/images/spritesheets/SpaceRock.xml');
    this.load.image('explosion', 'assets/images/explosion.png');
    this.load.image('ghost', 'assets/images/ghost.png');
    this.load.image('laser', 'assets/images/bullet.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('buttons', 'assets/images/buttons.png');
    this.load.image('pauseBtn', 'assets/images/pause.png');
    this.load.image('backBtn', 'assets/images/back.png');
    this.load.audio('explosion', 'assets/audio/explosion.mp3');
    this.load.audio('select', 'assets/audio/select.mp3');
    this.load.audio('hurt', 'assets/audio/hurt.mp3');
    this.load.audio('bgAudio', 'assets/audio/bgm.mp3');
  }

  update() {
    if (this.cache.audio.exists('bgAudio') && this.ready === false) {
      this.ready = true;
      this.scene.start('StorageScene');
    }
  }
}
