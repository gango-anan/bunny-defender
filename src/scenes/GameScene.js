export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.totalBunnies;
    this.bunnyGroup;
    this.totalSpaceRocks;
    this.spaceRockGroup;
    this.gameover;
    this.burst;
  }

  create() {
    this.gameover = false;
    this.totalBunnies = 20;
    this.totalSpaceRocks = 13;
    this.buildWorld();
  }

  buildWorld = ()=> {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(270, 780, 'hill');
    this.add.image(270, 880, 'hill');
    this.buildBunnies();
    this.buildSpaceRocks();
    this.buildEmitter();
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
      this.physics.world.enable(b);
      b.body.moves = false;
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

  buildSpaceRocks() {
    this.spaceRockGroup = this.add.group();
    this.spaceRockGroup.enableBody = true;
    let spaceRockAtlasTexture = this.textures.get('spaceRock');
    let frames = spaceRockAtlasTexture.getFrameNames();
    for(let i=0; i<this.totalSpaceRocks; i++) {
      const xCord = Phaser.Math.Between(0, this.game.renderer.width);
      const yCord = Phaser.Math.Between(-1800, 0);
      const rock = this.spaceRockGroup.create(xCord, yCord, 'spaceRock', frames[i]);
      const scale = Phaser.Math.FloatBetween(0.3, 1.0);
      rock.scaleX = scale;
      rock.scaleY = scale;
      this.physics.world.enable(rock);
      const rockBody = rock.body;
      rockBody.setGravityY(Phaser.Math.Between(50, 150));
      rockBody.setVelocityY(Phaser.Math.Between(200, 400));
      rock.anims.create({
        key: 'Fall',
        frameRate: 24,
        repeat: -1,
        frames: this.anims.generateFrameNames('spaceRock', { prefix: 'SpaceRock', start: 0, end: 49, zeroPad: 1 })
      });
      rock.play('Fall');
      rockBody.setCollideWorldBounds(true);
      rockBody.onWorldBounds = true;
      rockBody.world.on('worldbounds', this.resetRock, this);
    }
  }

  resetRock(rock) {
    if(rock.y > this.game.renderer.height - 260) {
      this.reSpawnRock(rock);   
    }
  }

  reSpawnRock(rock) {
    if(this.gameover === false){
      rock.reset(Phaser.Math.Between(0, this.game.renderer.width), Phaser.Math.Between(-1800, 0));
      rock.setGravityY(Phaser.Math.Between(50, 150));
      rock.setVelocityY(Phaser.Math.Between(200, 400));
    }
  }

  buildEmitter() {
    const particles = this.add.particles('explosion');
    this.burst = particles.createEmitter({ 
      x: -500,
      y: -500,
      quantity: 80,
      speed: { min: Phaser.Math.Between(-60, 60), max: Phaser.Math.Between(60, -60) },
      scale: { start: 0.3, end: 1.2 },
    });
    this.input.on('pointerdown', this.fireBurst, this);
  }

  fireBurst(pointer) {
    if(this.gameover === false){
      this.burst.emitParticleAt(pointer.x, pointer.y);
      this.burst.start(true, 1000, null, 20);
    }
  }

  burstCollision(r, b) {
    this.reSpawnRock(r);
  }

  bunnyCollision(r, b) {
    if(b.active) {
      this.makeGhost(b);
      b.destroy();
      this.totalBunnies--;
      this.checkBunniesLeft();
    }
  }

  checkBunniesLeft() {
    if(this.totalBunnies <= 0) {
      this.gameover = true;
    }
  }

  makeGhost(b) {
    const bunnyGhost = this.add.sprite(b.x-20, b.y-180, 'ghost');
    bunnyGhost.setOrigin(0.5, 0.5);
    bunnyGhost.scaleX = b.scaleX;
    this.physics.world.enable(bunnyGhost);
    bunnyGhost.enableBody = true;
    bunnyGhost.onWorldBounds = true
    bunnyGhost.body.setVelocityY(-800);
  }

  update() {
    this.physics.add.overlap(this.spaceRockGroup, this.bunnyGroup, this.bunnyCollision, null, this);
  }
}