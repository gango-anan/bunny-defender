export default class GameScene extends Phaser.Scene {
  constructor() {
    super();
    this.totalBunnies;
    this.bunnyGroup;
    this.totalSpaceRocks;
    this.spaceRockGroup;
    this.gameover;
    this.burst;
		this.player;
    this.inputKeys;
    this.bulletGroup;
    this.totalBullets;
    this.score;
    this.scoreText;
  }

  create() {
    this.gameover = false;
    this.totalBunnies = 20;
    this.totalSpaceRocks = 13;
    this.totalBullets = 30;
    this.scoreText = '';
    this.buildWorld();
    this.buildBunnies();
    this.buildSpaceRocks();
    this.buildEmitter();
    this.buildBullets();
    this.addPlayer();
    this.addEvents();
    this.setCollisions();
    this.buildScores();
  }

  buildScores() {
    this.score = 0;
    this.scoreText = this.add.text(10,15, `Score: ${this.score}`, { fontSize: '32px', fill: '#fff'});
    this.add.text(10,50, `Best score: ${0}`, { fontSize: '24px', fill: '#fff'});
  }

  getScore() {
    this.score += 5;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  buildWorld() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(270, 780, 'hill');
    this.add.image(270, 880, 'hill');
  }

  addPlayer() {
		const centerX = this.cameras.main.width / 2;
		const bottom = this.cameras.main.height;
		this.player = this.add.image(centerX, bottom - 290, 'player');
    this.player.setScale(1.5);
    this.physics.world.enable(this.player);
	}

  addEvents() {
		this.input.on('pointermove', (pointer) => {
			this.player.x = pointer.x
		});

    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    ];
	}

  buildBullets() {
    const config = {
      classType: Phaser.GameObjects.Image,
      key: 'laser',
      active: false,
      visible: false,
      setXY: {x: 0, y: -20 },
      setOrigin: {x: 0.5, y: 0.5},
      frameQuantity: 30
    }
    this.bulletGroup = this.add.group({classType: Phaser.GameObjects.Image});
    this.bulletGroup.createMultiple(config);
    this.physics.world.enable(this.bulletGroup, 0);
  }

  fireBullet() {
    const bullet = this.bulletGroup.getFirstDead(true);
		if(!this.gameover && bullet) {
      bullet.body.reset(this.player.x, this.player.y - 20);
      this.bulletGroup.setActive(true);
      this.bulletGroup.setVisible(true);
      bullet.body.setVelocityY(-900);
		}
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
      b.anims.create({
        key: 'Rest',
        frameRate: 24,
        repeat: -1,
        frames: this.anims.generateFrameNames('bunnyAtlas', { prefix: 'Bunny', start: 1, end: 58, zeroPad: 1 })
      });
      b.anims.create({
        key: 'Walk',
        frameRate: 24,
        repeat: -1,
        frames: this.anims.generateFrameNames('bunnyAtlas', { prefix: 'Bunny', start: 68, end: 106, zeroPad: 1 })
      });
      b.play('Rest');
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
      duration: 3000,
      ease: 'Quad.easeInOut',
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
  }

  fireBurst(x,y) {
    if(this.gameover === false){
      this.burst.emitParticleAt(x, y);
      this.burst.start(true, 1000, null, 20);
    }
  }

  burstCollision(r, b) {
    this.reSpawnRock(r);
  }

  setCollisions() {
    if (!this.gameover) {
      this.physics.add.collider(this.spaceRockGroup, this.bulletGroup, (rock, bullet) => {
        const rockBody = rock.body;
        const x = rockBody.x;
        const y = rockBody.y;
        this.reSpawnRock(rockBody);
        this.fireBurst(x, y);
        this.getScore();
      }, null, this);
    }
  }

  bunnyCollision(r, b) {
    if(b.active) {
      this.makeGhost(b);
      b.destroy();
      this.totalBunnies--;
      this.checkBunniesLeft();
    }
    if(this.gameover){
      this.gameOver();
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

  gameOver() {
    this.physics.pause();
    this.player.setTint(0xee4824);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false
    })
  }

  update() {
    this.physics.add.overlap(this.spaceRockGroup, this.bunnyGroup, this.bunnyCollision, null, this);
    this.inputKeys.forEach(key => {
			if(Phaser.Input.Keyboard.JustDown(key)) {
				this.fireBullet();
			}
		});
  }
}