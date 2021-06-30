import Phaser from 'phaser';
import Boot from '../src/scenes/Boot';

const bootScene = new Boot();

test('Boot correctly initializes a Boot Scene object', () => {
  expect(typeof bootScene).toBe('object');
});

test('Boot correctly initializes a Boot Scene object', () => {
  expect(typeof Boot).not.toBe('undefined');
});

test('Boot is a function', () => {
  expect(typeof Boot).toBe('function');
});

test('Boot is a subclass of Phaser.Scene', () => {
  expect(Boot).toBeSubclassOf(Phaser.Scene);
});

test('Boot is not a subclass of Phaser.Physics.Arcade', () => {
  expect(Boot).not.toBeSubclassOf(Phaser.Physics.Arcade.Body);
});
