#!/usr/bin/env node

// @ts-check

const program = require('commander');

// @ts-ignore
const app = require('./package.json');
const create = require('./create');

let projectName;

function commaSeparatedList(value, dummyPrevious) {
  return value.split(',');
}

program
  .version(app.version, '-v, --version')
  .arguments('<projectName>')
  .action((name) => {
    projectName = name;
  })
  .option('-j, --jsonapi', 'Add json:api support')
  .option('-s, --storybook', 'Add storybook support')
  .option('-e, --exclude [dependency]', 'Exclude dependencies from the generated project', commaSeparatedList)
  .option('--no-commit', 'Don\'t automatically commit the generated project')
  .parse(process.argv);

create(projectName, program).then(
  () => console.log('Done!'),
  (e) => console.error(e),
);
