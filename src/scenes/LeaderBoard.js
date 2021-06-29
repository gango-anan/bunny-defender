import Phaser from "phaser";
import RemoteStorage from '../RemoteStorage';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create(){
    this.buildBackground();
    this.displayBestScores();
    this.backButton();
  }

  buildBackground() {
    this.add.image(0, 0, 'sky').setOrigin(0,0);
    this.add.image(270, 200, 'title');
  }

  displayBestScores() {
    const xCord = this.cameras.main.width;
    const yCord = this.cameras.main.height;
    this.add.text(xCord*0.5 - 170 , yCord*0.5 - 100, 'LEADER BOARD', { fontSize: '48px', fill: '#fff'});

    const leaderBoard = new RemoteStorage();
    const fetchedScores = leaderBoard.fetchScores();

    let stepper = 0;
    fetchedScores.then((data) => {
      const leadingScores = data.result
      this.sortData(leadingScores);

      if (leadingScores != null) {
        for (let index = 0; leadingScores[index] && index < 5; index++) {
          const scorePosition = [xCord*0.5 - 170, yCord*0.5 + stepper];
          this.add.text(...scorePosition, `${leadingScores[index].user}: ${ leadingScores[index].score }`, { fontSize: '32px', fill: '#fff'})
          .setOrigin(0,0);
          stepper += 50;
        }
      }
    })
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

  sortData(data) {
    data.sort((a, b) => {
      const recordedScoreA = a.score;
      const recordedScoreB = b.score;
      if (recordedScoreB < recordedScoreA) {
        return -1;
      }
      if (recordedScoreB > recordedScoreA) {
        return 1;
      }
      return 0;
    });
  }

}