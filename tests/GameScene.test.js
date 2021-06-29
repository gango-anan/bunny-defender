import Phaser from 'phaser';
import GameScene from '../src/scenes/GameScene'

const gameScene = new GameScene();

test('GameScene correctly initializes a Game Scene object' , () => {
  expect(typeof gameScene).toBe('object');
});

test('GameScene correctly initializes a Game Scene object' , () => {
  expect(typeof GameScene).not.toBe('undefined');
});

test('GameScene is a function' , () => {
  expect(typeof GameScene).toBe('function');
});

test('GameScene is a subclass of Phaser.Scene', () => {
  expect(GameScene).toBeSubclassOf(Phaser.Scene);
});

test('GameScene is not a subclass of Phaser.Physics.Arcade', () => {
  expect(GameScene).not.toBeSubclassOf(Phaser.Physics.Arcade.Body);
});