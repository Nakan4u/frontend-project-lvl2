#!/usr/bin/env node
import gendiff from '../index.js'

const program = gendiff();
const flags = process.argv.slice(2);

if (flags[0] === '-h') {
  console.log(program.help());
} else {
  console.log(program.description());
}