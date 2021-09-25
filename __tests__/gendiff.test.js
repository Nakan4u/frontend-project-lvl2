#!/usr/bin/env node
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { getJSONDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filePath) => path.join(__dirname, '..', '__fixtures__', filePath);
const readFile = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

test('findDifferences JSON should return correct result', () => {
  const file1 = readFile('person1.json');
  const file2 = readFile('person2.json');
  const expected = readFile('result-json.txt');
  const differenceJSON = getJSONDiff(file1, file2);
  expect(differenceJSON).toEqual(expected);
});
