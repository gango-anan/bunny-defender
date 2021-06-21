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

  buildWorld = ()=> {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(270, 780, 'hill');
    this.add.image(270, 880, 'hill');
    this.buildBunnies();
  }

  update() {}

}