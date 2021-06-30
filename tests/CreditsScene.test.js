import Phaser from 'phaser';
import CreditsScene from '../src/scenes/CreditsScene';

const creditsScene = new CreditsScene();

test('CreditsScene correctly initializes a Credits Scene object', () => {
  expect(typeof creditsScene).toBe('object');
});

test('CreditsScene correctly initializes a Credits Scene object', () => {
  expect(typeof CreditsScene).not.toBe('undefined');
});

test('CreditsScene is a function', () => {
  expect(typeof CreditsScene).toBe('function');
});

test('CreditsScene is a subclass of Phaser.Scene', () => {
  expect(CreditsScene).toBeSubclassOf(Phaser.Scene);
});

test('CreditsScene is not a subclass of Phaser.Physics.Arcade', () => {
  expect(CreditsScene).not.toBeSubclassOf(Phaser.Physics.Arcade.Body);
});