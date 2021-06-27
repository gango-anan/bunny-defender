import Phaser from "phaser";

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('CreditsScene');
  }

  create(){
    this.buildBackground();
    this.displayCredits();
    this.backButton();
  }

  buildBackground() {
    this.add.image(0, 0, 'sky').setOrigin(0,0);
    this.add.image(270, 200, 'title');
  }

  displayCredits() {
    const creditTitle = this.add.text(100, 380, 'CREDIT GOES TO', { fontSize: '32px', fill: '#fff'});
    const frecodCamp = this.add.text(20, 480, 'FREECODE CAMP', { fontSize: '24px', fill: '#fff'});
    this.add.text(20, 530, '(https://www.freecodecamp.org/)', { fontSize: '24px', fill: '#fff'});
    const youTube = this.add.text(20, 600, 'YOUTUBE', { fontSize: '24px', fill: '#fff'});
    this.add.text(20, 630, '(https://www.youtube.com/)', { fontSize: '24px', fill: '#fff'});
    const phaserTeam = this.add.text(20, 700, 'PHASER TEAM', { fontSize: '24px', fill: '#fff'});
    this.add.text(20, 730, '(https://phaser.io/phaser3)', { fontSize: '24px', fill: '#fff'});
  }

  backButton() {
    const backBtn = this.add.image(this.cameras.main.width - 16, this.cameras.main.height - 16, 'backBtn')
    .setOrigin(1)
    .setScale(2.5)
    .setInteractive();
    backBtn.on('pointerup', () => {
      this.scene.start('TitleScene')
    });
  }
}