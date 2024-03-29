import Phaser from 'phaser';
import RemoteStorage from '../RemoteStorage';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.totalBunnies = null;
    this.bunnyGroup = null;
    this.totalSpaceRocks = null;
    this.spaceRockGroup = null;
    this.gameover = null;
    this.burst = null;
    this.player = null;
    this.inputKeys = null;
    this.bulletGroup = null;
    this.totalBullets = null;
    this.score = null;
    this.scoreText = null;
    this.canvasWidth = null;
    this.canvasHeight = null;
    this.playerVelocity = null;
    this.userName = null;
    this.scores = null;
    this.bulletSound = null;
  }

  create() {
    this.initializeInputs();
    this.buildWorld();
    this.buildBunnies();
    this.buildPlayer();
    this.backButton();
    this.buildSpaceRocks();
    this.buildEmitter();
    this.buildBullets();
    this.addEvents();
    this.setRockBulletCollision();
    this.buildScores();
  }

  update() {
    this.movePlayer();
    this.physics.add.overlap(this.spaceRockGroup, this.bunnyGroup, this.bunnyCollision, null, this);
    this.inputKeys.forEach((key) => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.fireBullet();
      }
    });
  }

  initializeInputs() {
    this.playerVelocity = 400;
    this.canvasWidth = this.cameras.main.width;
    this.canvasHeight = this.cameras.main.height;
    this.movementKeys = this.input.keyboard.createCursorKeys();
    this.gameover = false;
    this.totalBunnies = 20;
    this.totalSpaceRocks = 13;
    this.totalBullets = 100;
    this.scoreText = '';
    this.score = 0;
    this.userName = 'Galiwango';
    this.scores = JSON.parse(localStorage.getItem('scores')) || [];
  }

  buildWorld() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(0, 860, 'hill').setOrigin(0, 1);
    this.add.image(0, 960, 'hill').setOrigin(0, 1);
  }

  buildPlayer() {
    const centerX = this.cameras.main.width / 2;
    const bottom = this.cameras.main.height;
    this.player = this.physics.add.sprite(centerX, bottom - 260, 'player');
    this.player.setScale(1.5);
  }

  movePlayer() {
    const {
      left, right,
    } = this.movementKeys;
    if (left.isDown && this.player.x > this.player.width * 0.5) {
      this.player.setVelocityX(-this.playerVelocity);
    } else if (right.isDown && this.player.x <= this.canvasWidth - 16) {
      this.player.setVelocityX(this.playerVelocity);
    } else {
      this.player.setVelocityX(0);
    }
  }

  buildBullets() {
    this.bulletGroup = this.physics.add.group();
    for (let index = 0; index < this.totalBullets; index += 1) {
      const bullet = this.bulletGroup.create(this.canvasWidth + 100, 0, 'laser');
      bullet.active = false;
    }
    this.bulletGroup.setVisible(false);
  }

  fireBullet() {
    const bullet = this.bulletGroup.getFirstDead(false);
    if (!this.gameover && bullet) {
      bullet.body.reset(this.player.x, this.player.y - 32);
      bullet.active = true;
      bullet.visible = true;
      bullet.body.setGravityY(-300);
      bullet.body.setVelocityY(-1000);
    }
  }

  buildBunnies() {
    this.bunnyGroup = this.add.group();
    this.bunnyGroup.enableBody = true;
    const atlasTexture = this.textures.get('bunnyAtlas');
    const frames = atlasTexture.getFrameNames();
    for (let i = 0; i < this.totalBunnies; i += 1) {
      const x = Phaser.Math.Between(-10, this.game.renderer.width - 50);
      const y = Phaser.Math.Between(this.canvasHeight - 180, this.canvasHeight - 60);
      const b = this.bunnyGroup.create(x, y, 'bunnyAtlas', frames[i]);
      b.setOrigin(0.5, 0.5);
      this.physics.world.enable(b);
      b.body.moves = false;
      b.anims.create({
        key: 'Rest',
        frameRate: 24,
        repeat: -1,
        frames: this.anims.generateFrameNames('bunnyAtlas', {
          prefix: 'Bunny', start: 1, end: 58, zeroPad: 1,
        }),
      });
      b.anims.create({
        key: 'Walk',
        frameRate: 24,
        repeat: -1,
        frames: this.anims.generateFrameNames('bunnyAtlas', {
          prefix: 'Bunny', start: 68, end: 106, zeroPad: 1,
        }),
      });
      b.play('Rest');
      this.assignBunnyMovement(b);
    }
  }

  assignBunnyMovement(b) {
    const bposition = Math.floor(Phaser.Math.Between(50, this.game.renderer.width - 50));
    const bdelay = Phaser.Math.Between(2000, 6000);
    if (bposition < b.x) {
      b.setFlipX(true);
    } else {
      b.setFlipX(false);
    }
    this.tweens.add({
      targets: b,
      x: bposition,
      duration: 3000,
      ease: 'Power1',
      repeat: -1,

      delay: bdelay,
    });
  }

  buildSpaceRocks() {
    this.spaceRockGroup = this.add.group();
    this.spaceRockGroup.enableBody = true;
    const spaceRockAtlasTexture = this.textures.get('spaceRock');
    const frames = spaceRockAtlasTexture.getFrameNames();
    for (let i = 0; i < this.totalSpaceRocks; i += 1) {
      const xCord = Phaser.Math.Between(0, this.game.renderer.width);
      const yCord = Phaser.Math.Between(-1800, 0);
      const rock = this.spaceRockGroup.create(xCord, yCord, 'spaceRock', frames[i]);
      const scale = Phaser.Math.FloatBetween(0.2, 0.6);
      rock.scaleX = scale;
      rock.scaleY = scale;
      this.physics.world.enable(rock);
      const rockBody = rock.body;
      rockBody.setGravityY(Phaser.Math.Between(10, 50));
      rockBody.setVelocityY(Phaser.Math.Between(100, 200));
      rock.anims.create({
        key: 'Fall',
        frameRate: 24,
        repeat: -1,
        frames: this.anims.generateFrameNames('spaceRock', {
          prefix: 'SpaceRock', start: 0, end: 49, zeroPad: 1,
        }),
      });
      rock.play('Fall');
      rockBody.setCollideWorldBounds(true);
      rockBody.onWorldBounds = true;
      rockBody.world.on('worldbounds', this.resetRock, this);
    }
  }

  resetRock(rock) {
    if (rock.y >= this.game.renderer.height - 200) {
      this.reSpawnRock(rock);
    }
  }

  reSpawnRock(rock) {
    if (!this.gameover) {
      rock.reset(Phaser.Math.Between(0, this.game.renderer.width), Phaser.Math.Between(-1800, 0));
      rock.setGravityY(50);
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

  fireBurst(x, y) {
    if (!this.gameover) {
      this.playExplosionSound();
      this.burst.emitParticleAt(x, y);
      this.burst.start(true, 1000, null, 20);
    }
  }

  buildScores() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');
    this.scoreText = this.add.text(10, 15, `Score: ${this.score}`, { fontSize: '32px', fill: '#fff' });
    this.add.text(10, 50, `Best score: ${bestScore || 0}`, { fontSize: '24px', fill: '#fff' });
  }

  getScore() {
    this.score += 5;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  backButton() {
    const backBtn = this.add.image(this.cameras.main.width - 16, this.cameras.main.height - 16, 'backBtn')
      .setOrigin(1)
      .setScale(2)
      .setInteractive();
    backBtn.on('pointerup', () => {
      this.sound.stopAll();
      this.scene.start('TitleScene');
    });
  }

  buildPauseButton() {
    const pauseButton = this.add.image(this.canvasWidth - 16, this.canvasHeight - 16, 'pauseBtn')
      .setOrigin(1)
      .setScale(2.5)
      .setInteractive();
    pauseButton.on('pointerdown', () => {
      this.physics.pause();
      this.scene.pause();
    });
  }

  addEvents() {
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];
  }

  setRockBulletCollision() {
    if (!this.gameover) {
      this.physics.add.collider(this.spaceRockGroup, this.bulletGroup, (rock, bullet) => {
        this.playBulletSound();
        GameScene.recycleBullet(bullet);
        const rockBody = rock.body;
        const { x } = rockBody;
        const { y } = rockBody;
        this.reSpawnRock(rockBody);
        this.fireBurst(x, y);
        this.getScore();
      }, null, this);
    }
  }

  static recycleBullet(bullet) {
    bullet.body.reset(0, 0);
    bullet.active = false;
    bullet.visible = false;
  }

  playExplosionSound() {
    const explosionSound = this.sound.add('explosion', { volume: 0.1, loop: false });
    explosionSound.play();
  }

  playBulletSound() {
    this.bulletSound = this.sound.add('hurt', { volume: 0.1, loop: false });
    this.bulletSound.play();
  }

  bunnyCollision(r, b) {
    if (b.active) {
      this.makeGhost(b);
      b.destroy();
      this.reSpawnRock(r.body);
      this.totalBunnies -= 1;
      this.checkBunniesLeft();
    }
    if (this.gameover) {
      this.gameOver();
    }
  }

  checkBunniesLeft() {
    if (this.totalBunnies <= 0) {
      this.gameover = true;
    }
  }

  makeGhost(b) {
    const bunnyGhost = this.physics.add.sprite(b.x - 20, b.y - 180, 'ghost');
    bunnyGhost.scaleX = b.scaleX;
    bunnyGhost.body.setVelocityY(-600);
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);
    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }
    const currentScore = JSON.parse(localStorage.getItem('currentUserScore'));
    currentScore.recordedScore = this.score;
    localStorage.setItem('currentUserScore', JSON.stringify(currentScore));
  }

  gameOver() {
    this.physics.pause();
    this.player.setTint(0xee4824);

    this.saveBestScore();
    this.add.text(160, 250, 'Game Over', { fontSize: '32px', fill: '#fff' });
    this.add.text(90, 320, `Your Score is: ${this.score}`, { fontSize: '32px', fill: '#fff' });

    const userScore = JSON.parse(localStorage.getItem('currentUserScore'));
    const remoteStorage = new RemoteStorage();
    const sendFeedBack = remoteStorage.sendScores(userScore.username, userScore.recordedScore);
    sendFeedBack.then((data) => {
      if (data.message === 'Failed to fetch') {
        this.add.text(60, 400, "     Can't save score,\n\nCheck your internet connection.", { fontSize: '24px', fill: '#fff' });
      }
    });
    this.sound.stopAll();
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.scene.start('TitleScene');
      },
      loop: false,
    });
  }
}
