import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.dimensions = null;
    this.selectAudio = null;
    this.menus = null;
  }

  create() {
    this.menus = [
      { scene: 'GameScene', text: 'Play' },
      { scene: 'CreditsScene', text: 'Credits' },
      { scene: 'LeaderBoard', text: 'Leader Board' },
      { scene: null, text: 'Exit' },
    ];
    this.dimensions = [this.game.renderer.width * 0.5, this.game.renderer.height * 0.5 - 100];
    this.playSceneMusic();
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(270, 170, 'title');
    this.buildMenu(this.dimensions);
    this.addRunningBunny();
  }

  playSceneMusic() {
    this.selectAudio = this.sound.add('select', { volume: 0.2, loop: false });
  }

  buildMenu(dimensions) {
    const menuButtons = [];
    const menuLabels = [];
    let stepUnit = 0;

    this.menus.forEach((menuItem) => {
      const menuPosition = [dimensions[0], dimensions[1] + stepUnit];
      const menuButton = this.add.image(...menuPosition, 'buttons')
        .setDisplaySize(200, 50)
        .setInteractive({ useHandCursor: true });
      menuButtons.push(menuButton);
      const menuLabel = this.add.text(...menuPosition, menuItem.text, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
      menuLabels.push(menuLabel);
      stepUnit += 80;
    });

    this.addButtonInteractions(menuButtons);
    TitleScene.addButtonEvents(menuButtons, menuLabels);
  }

  addButtonInteractions(menuButtons) {
    let index = 0;
    this.menus.forEach((menuItem) => {
      menuButtons[index].on('pointerup', () => {
        if (menuItem.scene) {
          this.scene.start(menuItem.scene);
          this.selectAudio.play();
        } else {
          this.game.destroy(true);
        }
      });
      index += 1;
    });
  }

  static addButtonEvents(menuButtons, menuLabels) {
    for (let index = 0; index < menuButtons.length; index += 1) {
      menuButtons[index].on('pointerover', () => {
        menuLabels[index].setStyle({ fill: '#00ff00' });
      });

      menuButtons[index].on('pointerout', () => {
        menuLabels[index].setStyle({ fill: '#fff' });
      });
    }
  }

  addRunningBunny() {
    const hoverSprite = this.add.sprite(270, 170, 'bunny');
    hoverSprite.setScale(0.8);
    this.anims.create({
      key: 'walk',
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('bunny', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
    });
    hoverSprite.play('walk');
  }
}