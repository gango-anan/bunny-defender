import Phaser from "phaser";

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create(){
    this.buildBackground();
    this.displayBestScores();
  }

  buildBackground() {
    this.add.image(0, 0, 'sky').setOrigin(0,0);
    this.add.image(270, 200, 'title');
  }

  displayBestScores() {
    const bestScore = localStorage.getItem('bestScore');
    const xCord = this.cameras.main.width;
    const yCord = this.cameras.main.height;
    this.add.text(xCord*0.5 - 170 , yCord*0.5 - 100, 'LEADER BOARD', { fontSize: '48px', fill: '#fff'});
    const scoreLabel = this.add.text(xCord*0.5 - 170 , yCord*0.5, `Name: ${ bestScore }`, { fontSize: '32px', fill: '#fff'})
                          .setOrigin(0,0);
  }
}