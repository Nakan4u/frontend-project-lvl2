import { Command } from 'commander';

export default () => {
  const program = new Command();
  program.version('0.0.1');
  program.arguments('<filepath1> <filepath2>');
  program.description('Compares two configuration files and shows a difference.');
  program.option('-f, --format <type>', 'output format');
  return program;
}