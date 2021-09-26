#!/usr/bin/env node
import getDiff, { readFile } from '../src/index.js';

test('findDifferences JSON should return correct result', () => {
  const file1 = readFile('file1.json');
  const file2 = readFile('file2.json');
  const expected = readFile('files-diff.txt');
  const diff = getDiff(file1, file2);
  expect(diff).toEqual(expected);
});

test('findDifferences YAML should return correct result', () => {
  const file1 = readFile('person1.yaml');
  const file2 = readFile('person2.yaml');
  const expected = readFile('persons-diff.txt');
  const diff = getDiff(file1, file2);
  expect(diff).toEqual(expected);
});
