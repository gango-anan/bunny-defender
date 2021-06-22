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

  buildBunnies() {
    this.bunnyGroup = this.add.group();
    this.bunnyGroup.enableBody = true;
    let atlasTexture = this.textures.get('bunnyAtlas');
    let frames = atlasTexture.getFrameNames();
    for(let i=0; i<this.totalBunnies; i++) {
      let x = Phaser.Math.Between(-10, this.game.renderer.width-50);
      let y = Phaser.Math.Between(this.game.renderer.height-180, this.game.renderer.height-60);
      let b = this.bunnyGroup.create(x, y, 'bunnyAtlas',frames[i]);
      b.setOrigin(0.5, 0.5);
      this.assignBunnyMovement(b);
    }
  }

  assignBunnyMovement(b) {
    const bposition = Math.floor(Phaser.Math.Between(50, this.game.renderer.width-50));
    const bdelay = Phaser.Math.Between(2000, 6000);
    if(bposition < b.x){
      b.setFlipX(true);
    }
    else{
      b.setFlipX(false);
    }
    const t = this.tweens.add({
      targets: b,
      x: bposition,
      duration: 3500,
      ease: 'Linear',
      repeat: -1,
 
      delay: bdelay,
    });
  }

  update() {}

}