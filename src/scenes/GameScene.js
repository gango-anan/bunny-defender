export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.totalBunnies;
    this.bunnyGroup;
  }

  create() {
    this.totalBunnies = 20;
    this.buildWorld();
  }


}