export default class Title extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(0, 0, 'titleBg').setOrigin(0,0);
    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 150, 'playBtn');
    let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 225, 'optionsBtn');
 

    this.sound.play('bgAudio', {
      loop: true
    })

    playButton.setInteractive({useHandCursor: true});
    playButton.on('pointerover', () => {

    })

    playButton.on('pointerout', () => {

    })

    playButton.on('pointerup', () => {

    })
  }
} 