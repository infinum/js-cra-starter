// @ts-check

const path = require('path');
const fs = require('fs-extra');
const ProgressBar = require('progress');

const actions = require('./actions');

const availableModules = ['jsonapi', 'storybook'];

module.exports = async (projectName, program) => {
  const activeModules = ['base'];
  const cmdActions = [
    {cmd: 'initCra', params: [projectName], label: 'Initializing CRA'},
  ];

  if (!projectName) {
    console.error('Project name is required');
    program.help();
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), projectName);

  for (let module of availableModules) {
    if (program[module]) {
      activeModules.push(`modules/${module}`);
    }
  }

  for (let activeModule of activeModules) {
    const meta = await fs.readFile(path.join(__dirname, activeModule, 'meta.json'), 'utf-8');
    const metaData = JSON.parse(meta);

    if ('dependencies' in metaData) {
      cmdActions.push({
        cmd: 'installDeps',
        params: [metaData.dependencies, false, projectName, program.exclude],
        label: `Installing ${activeModule} dependencies`,
      });
    }
    if ('devDependencies' in metaData) {
      cmdActions.push({
        cmd: 'installDeps',
        params: [metaData.devDependencies, true, projectName, program.exclude],
        label: `Installing ${activeModule} dev dependencies`,
      });
    }
    if ('files' in metaData) {
      if ('move' in metaData.files) {
        cmdActions.push({
          cmd: 'filesMove',
          params: [metaData.files.move, projectPath],
          label: `Moving ${activeModule} files around`,
        });
      }
      if ('remove' in metaData.files) {
        cmdActions.push({
          cmd: 'filesRemove',
          params: [metaData.files.remove, projectPath],
          label: `Removing unused ${activeModule} files`,
        });
      }
      if ('append' in metaData.files) {
        cmdActions.push({
          cmd: 'filesAppend',
          params: [metaData.files.append, projectPath, activeModule],
          label: `Modifying ${activeModule} files`,
        });
      }
      if ('copy' in metaData.files) {
        cmdActions.push({
          cmd: 'filesCopy',
          params: [metaData.files.copy, projectPath, activeModule],
          label: `Creating new ${activeModule} files`,
        });
      }
      if ('merge' in metaData.files) {
        cmdActions.push({
          cmd: 'mergeFiles',
          params: [metaData.files.merge, projectPath],
          label: `Merging some ${activeModule} files`,
        });
      }
      if ('exec' in metaData) {
        cmdActions.push({
          cmd: 'exec',
          params: [metaData.exec, projectPath],
          label: `Executing ${metaData.exec}`,
        });
      }
    }
  }
  cmdActions.push({
    cmd: 'exec',
    params: ["./node_modules/.bin/prettier --write \"**/*.{ts,tsx}\"", projectPath],
    label: 'Prettifying code'
  })

  if(program.commit) {
    cmdActions.push({
      cmd: 'exec',
      params: ['git add . && git commit -m "Project setup"', projectPath],
      label: 'Committing changes',
    })
  }

  const bar = new ProgressBar('[:bar] :current/:total: :action', {
    total: cmdActions.length,
    width: 20,
    clear: true,
    complete: '█',
    incomplete: '-',
  });
  for (let action of cmdActions) {
    bar.tick({action: action.label});
    await actions[action.cmd].apply(actions, action.params);
  }
  bar.tick({action: 'Done!'});
};
