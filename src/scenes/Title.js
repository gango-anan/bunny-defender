export default class Title extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(0, 0, 'titleBg').setOrigin(0,0);
    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 150, 'playBtn');
    let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 225, 'optionsBtn');
    let hoverSprite = this.add.sprite(100, 100, 'bunny');
    hoverSprite.setScale(0.5);
    hoverSprite.setVisible(false);
    this.anims.create({
      key: 'walk',
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('bunny', {frames: [0,1,2,3,4,5,6,7]})
    })

    this.sound.play('bgAudio', {
      loop: true
    })

    playButton.setInteractive({useHandCursor: true});
    playButton.on('pointerover', () => {
      hoverSprite.setVisible(true);
      hoverSprite.play('walk');
      hoverSprite.x = playButton.x - playButton.width;
      hoverSprite.y = playButton.y;
    })

    playButton.on('pointerout', () => {
      hoverSprite.setVisible(false);
    })

    playButton.on('pointerup', () => {
      
    })
  }
} 