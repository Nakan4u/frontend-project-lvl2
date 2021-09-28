#!/usr/bin/env node
import getDiff, { readFile } from '../src/index.js';

test('findDifferences JSON should return correct result', () => {
  const file1Path = 'file1.json';
  const file2Path = 'file2.json';
  const expected = readFile('files-diff.txt');
  const diff = getDiff(file1Path, file2Path);
  expect(diff).toEqual(expected);
});

test('findDifferences JSON should return correct diff with deep files', () => {
  const file1Path = 'file3.json';
  const file2Path = 'file4.json';
  const expected = readFile('files-deep-diff.txt');
  const diff = getDiff(file1Path, file2Path);
  expect(diff).toEqual(expected);
});

test('findDifferences YAML should return correct result', () => {
  const file1Path = 'person1.yaml';
  const file2Path = 'person2.yaml';
  const expected = readFile('persons-diff.txt');
  const diff = getDiff(file1Path, file2Path);
  expect(diff).toEqual(expected);
});

test('findDifferences YAML should return correct diff with deep files', () => {
  const file1Path = 'file3.yaml';
  const file2Path = 'file4.yaml';
  const expected = readFile('files-deep-diff.txt');
  const diff = getDiff(file1Path, file2Path, 'stylish');
  expect(diff).toEqual(expected);
});
