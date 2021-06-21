import Title from "./Title";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }
  
  preload() {
    let titleText = this.add.image(270, 200, 'titleImage');  
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics(); 
    
    progressBox.fillStyle(0x333222, 0.7);
    progressBox.fillRect(80, 480, 380, 50);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xff9200, 1);
      progressBar.fillRect(90, 492, 360 * value, 25);
    });

    this.load.on('fileprogress', (file) => {
    });
    
    this.load.on('complete', () => {
        progressBar.destroy();
        progressBox.destroy();
        titleText.destroy();
    });

    this.load.image('titleBg', 'assets/images/TitleBG.png');
    this.load.image('explosion', 'assets/images/explosion.png');
    this.load.image('ghost', 'assets/images/ghost.png');
    this.load.image('hill', 'assets/images/hill.png');
    this.load.image('loaderBar', 'assets/images/loader_bar.png');
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('optionsBtn', 'assets/images/options_button.png');
    this.load.image('playBtn', 'assets/images/play_button.png');
    this.load.spritesheet('bunny', "./assets/images/spritesheets/bunny.png", {
      frameHeight: 70,
      frameWidth: 64
    });
    this.load.audio('bgAudio', 'assets/audio/bgm.mp3');
    
    for(let i = 0; i<200; i++) {
      this.load.image('logo'+i, 'assets/images/TitleImage.png');
    }
  }

  create() {
    this.scene.add('Title', Title, true);
  }
}