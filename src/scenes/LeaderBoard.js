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
    const allScores = JSON.parse(localStorage.getItem('scores'));
    const xCord = this.cameras.main.width;
    const yCord = this.cameras.main.height;
    this.add.text(xCord*0.5 - 170 , yCord*0.5 - 100, 'LEADER BOARD', { fontSize: '48px', fill: '#fff'});
  
    allScores.sort((a, b) => {
      const recordedScoreA = a.recordedScore;
      const recordedScoreB = b.recordedScore;
      if (recordedScoreB < recordedScoreA) {
        return -1;
      }
      if (recordedScoreB > recordedScoreA) {
        return 1;
      }
      return 0;
    });

    let stepper = 0;
    if (allScores != null) {
      for (let index = 0; allScores[index] && index < 5; index++) {
        const scorePosition = [xCord*0.5 - 170, yCord*0.5 + stepper];
        this.add.text(...scorePosition, `${allScores[index].username}: ${ allScores[index].recordedScore }`, { fontSize: '32px', fill: '#fff'})
        .setOrigin(0,0);
        stepper += 50;
      }
    }
  }

}