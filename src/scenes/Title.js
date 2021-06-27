import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.dimensions;
    this.mainAudio;
  }

  create() {
    this.dimensions = [this.game.renderer.width*0.5, this.game.renderer.height*0.5-100];
    //this.playSceneMusic();
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
    const playButton = this.add.image(...dimensions, 'buttons').setDisplaySize(200, 50);
    const playLabel = this.add.text(playButton.x, playButton.y, 'Play', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    const creditsButton = this.add.image(xCord, yCord+80, 'buttons').setDisplaySize(200, 50);
    const creditsLabel = this.add.text(creditsButton.x, creditsButton.y, 'Credits', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    const leaderBoardButton = this.add.image(xCord, yCord+160, 'buttons').setDisplaySize(200, 50);
    const leaderBoardLabel = this.add.text(leaderBoardButton.x, leaderBoardButton.y, 'Leader Board', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    const exitButton = this.add.image(xCord, yCord+240, 'buttons').setDisplaySize(200, 50);
    const exitLabel = this.add.text(exitButton.x, exitButton.y, 'Exit', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    const menuButtons = [playButton, creditsButton, leaderBoardButton, exitButton];
    const menuLabels = [playLabel, creditsLabel, leaderBoardLabel, exitLabel]
    this.addButtonInteractions(menuButtons);
    this.addButtonEvents(menuButtons, menuLabels);
  }

  addButtonInteractions(menuButtons) {
    const[playButton, creditsButton, leaderBoardButton, exitButton] = menuButtons;
    playButton.setInteractive({useHandCursor: true});
    exitButton.setInteractive({useHandCursor: true});
    creditsButton.setInteractive({useHandCursor: true});
    leaderBoardButton.setInteractive({useHandCursor: true});
  }

  addButtonEvents(menuButtons, menuLabels) {
    const[playButton, creditsButton, leaderBoardButton, exitButton] = menuButtons;
    const [playLabel, creditsLabel, leaderBoardLabel, exitLabel] = menuLabels;
    playButton.on('pointerup', () => {
      this.scene.start('GameScene');
    })

    playButton.on('pointerover', () => {
      playLabel.setStyle({fill: '#00ff00'});
    });

    playButton.on('pointerout', () => {
      playLabel.setStyle({fill: '#fff'});
    });

    creditsButton.on('pointerover', () => {
      creditsLabel.setStyle({fill: '#00ff00'});
    });

    creditsButton.on('pointerout', () => {
      creditsLabel.setStyle({fill: '#fff'});
    });

    exitButton.on('pointerover', () => {
      exitLabel.setStyle({fill: '#00ff00'});
    });

    exitButton.on('pointerout', () => {
      exitLabel.setStyle({fill: '#fff'});
    });

    leaderBoardButton.on('pointerover', () => {
      leaderBoardLabel.setStyle({fill: '#00ff00'});
    });

    leaderBoardButton.on('pointerout', () => {
      leaderBoardLabel.setStyle({fill: '#fff'});
    });

    
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