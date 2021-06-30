import Phaser from 'phaser';
import StorageScene from '../src/scenes/StorageScene';

const storageScene = new StorageScene();

test('StorageScene correctly initializes a StorageScene object', () => {
  expect(typeof storageScene).toBe('object');
});

test('StorageScene correctly initializes a StorageScene object', () => {
  expect(typeof StorageScene).not.toBe('undefined');
});

test('StorageScene is a function', () => {
  expect(typeof StorageScene).toBe('function');
});

test('StorageScene is a subclass of Phaser.Scene', () => {
  expect(StorageScene).toBeSubclassOf(Phaser.Scene);
});

test('StorageScene is not a subclass of Phaser.Physics.Arcade', () => {
  expect(StorageScene).not.toBeSubclassOf(Phaser.Physics.Arcade.Body);
});
