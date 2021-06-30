import Phaser from 'phaser';
import Preloader from '../src/scenes/Preloader';

const preloaderScene = new Preloader();

test('Preloader correctly initializes a Preloader Scene object', () => {
  expect(typeof preloaderScene).toBe('object');
});

test('Preloader correctly initializes a Preloader Scene object', () => {
  expect(typeof Preloader).not.toBe('undefined');
});

test('Preloader is a function', () => {
  expect(typeof Preloader).toBe('function');
});

test('Preloader is a subclass of Phaser.Scene', () => {
  expect(Preloader).toBeSubclassOf(Phaser.Scene);
});

test('Preloader is not a subclass of Phaser.Physics.Arcade', () => {
  expect(Preloader).not.toBeSubclassOf(Phaser.Physics.Arcade.Body);
});