import Phaser from 'phaser';
import Title from '../src/scenes/Title'

const titleScene = new Title();

test('Title correctly initializes a Title Scene object' , () => {
  expect(typeof titleScene).toBe('object');
});

test('Title correctly initializes a Title Scene object' , () => {
  expect(typeof Title).not.toBe('undefined');
});

test('Title is a function' , () => {
  expect(typeof Title).toBe('function');
});

test('Title is a subclass of Phaser.Scene', () => {
  expect(Title).toBeSubclassOf(Phaser.Scene);
});

test('Title is not a subclass of Phaser.Physics.Arcade', () => {
  expect(Title).not.toBeSubclassOf(Phaser.Physics.Arcade.Body);
});