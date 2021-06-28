import Phaser from 'phaser';

export default class StorageScene extends Phaser.Scene {
  constructor() {
    super('StorageScene');
  }

  create() {
    this.add.image(0,0,'sky').setOrigin(0);
    this.add.image(270, 200, 'title');
    const nameInput = this.add.dom(270, 550).createFromCache('form');
    const message = this.add.text(270, 360, "Please type your name and \n\n press ENTER to continue", {color: '#fff', fontSize: 24, fontStyle: 'bold'}).setOrigin(0.5);
    const returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    returnKey.on('down', () => {
      let name = nameInput.getChildByName('name');
      if(name.value != "") {
        const currentScore = { username: name.value, recordedScore: '' };
        localStorage.setItem('currentUserScore', JSON.stringify(currentScore));
        name.value = '';
        this.scene.start('TitleScene');
      }
      else {
        message.setText(`Field can't be empty, try again!`);
      }
    });
  }
}
