export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  preload() {}

  create(){
    this.add.image(270, 480, 'sky').setOrigin(0, 0);
  }

  update(){}
}