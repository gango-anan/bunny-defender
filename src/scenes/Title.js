import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.dimensions;
    this.mainAudio;
    this.menus;
  }

  create() {
    this.menus = [
      {scene: 'GameScene', text: 'Play'},
      {scene: 'CreditsScene', text: 'Credits'},
      {scene: 'LeaderBoard', text: 'Leader Board'},
      {scene: null, text: 'Exit'},
    ];
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
    let menuButtons = [];
    let menuLabels = [];
    let stepUnit  = 0;
    
    this.menus.forEach(menuItem => {
      const menuPosition = [dimensions[0], dimensions[1] + stepUnit];
      const menuButton = this.add.image(...menuPosition, 'buttons')
      .setDisplaySize(200, 50)
      .setInteractive({useHandCursor: true});
      menuButtons.push(menuButton);
      const menuLabel = this.add.text(...menuPosition, menuItem.text, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
      menuLabels.push(menuLabel);
      stepUnit += 80;
    });

    this.addButtonInteractions(menuButtons);
    this.addButtonEvents(menuButtons, menuLabels);
  }

  addButtonInteractions(menuButtons) {
    let index = 0;
    this.menus.forEach(menuItem => {
      menuButtons[index].on('pointerup', () => {
        menuItem.scene && this.scene.start(menuItem.scene);
        if(menuItem.text === 'Exit') {
          this.game.destroy(true);
        }
      })
      index += 1;
    });
  }

  addButtonEvents(menuButtons, menuLabels) {
    for (let index = 0; index < menuButtons.length; index++) {
      menuButtons[index].on('pointerover', () => {
        menuLabels[index].setStyle({fill: '#00ff00'});
      });
  
      menuButtons[index].on('pointerout', () => {
        menuLabels[index].setStyle({fill: '#fff'});
      });
    }    
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