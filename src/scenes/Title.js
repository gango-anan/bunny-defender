import GameScene from "./GameScene";

export default class Title extends Phaser.Scene {
  constructor() {
    super('Title');
    this.dimensions;
    this.mainAudio;
  }

  create() {
    this.dimensions = [this.game.renderer.width*0.5, this.game.renderer.height*0.5-100];
    this.playSceneMusic();
    this.add.image(0, 0, 'sky').setOrigin(0,0);
    this.add.image(270, 200, 'title');
    this.buildMenu(this.dimensions);
    this.addRunningBunny();
  }

  playSceneMusic() {
    this.mainAudio = this.sound.add('bgAudio', { volume: 0.1, loop: true });
    this.mainAudio.play();
  }

  buildMenu(dimensions) {
    const [ xCord, yCord ] = dimensions;
    const playButton = this.add.image(xCord, yCord, 'buttons').setDisplaySize(200, 50);
    this.add.text(playButton.x, playButton.y, 'Play', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    const optionsButton = this.add.image(xCord, yCord+80, 'buttons').setDisplaySize(200, 50);
    this.add.text(optionsButton.x, optionsButton.y, 'Options', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    const creditsButton = this.add.image(xCord, yCord+160, 'buttons').setDisplaySize(200, 50);
    this.add.text(creditsButton.x, creditsButton.y, 'Credits', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    const leaderBoardButton = this.add.image(xCord, yCord+240, 'buttons').setDisplaySize(200, 50);
    this.add.text(leaderBoardButton.x, leaderBoardButton.y, 'Leader Board', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    const menuButtons = [playButton, optionsButton, creditsButton, leaderBoardButton];
    this.addButtonInteractions(menuButtons);
    this.addButtonEvents(menuButtons);
  }

  addButtonInteractions(menuButtons) {
    const[playButton, optionsButton, creditsButton, leaderBoardButton] = menuButtons;
    playButton.setInteractive({useHandCursor: true});
    optionsButton.setInteractive({useHandCursor: true});
    creditsButton.setInteractive({useHandCursor: true});
    leaderBoardButton.setInteractive({useHandCursor: true});
  }

  addButtonEvents(menuButtons) {
    const[playButton, optionsButton, creditsButton, leaderBoardButton] = menuButtons;
    playButton.on('pointerup', () => {
      this.scene.add('GameScene', GameScene, true);
      this.scene.remove('Title');
    })
  }

  addRunningBunny() {
    const hoverSprite = this.add.sprite(270, 200, 'bunny');
    hoverSprite.setScale(0.8);
    this.anims.create({
      key: 'walk',
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('bunny', {frames: [0 , 1, 2, 3, 4, 5, 6, 7]})
    })
    hoverSprite.play('walk');
  }
} 