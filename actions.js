// @ts-check

const {exec: execNode} = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const { merge } = require('lodash');

function exec(command, options = {}) {
  return new Promise((resolve, reject) => {
    execNode(command, options, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    })
  });
}

module.exports = {
  async initCra(projectName) {
    await exec(`npx create-react-app ${projectName} --typescript`);
  },

  async installDeps(deps, isDev, projectName) {
    await exec(`yarn add ${isDev? '-D' : ''} ${deps.join(' ')}`, {cwd: projectName});
  },

  async mergeFiles(files, projectPath) {
    const fileList = Object.keys(files);
    for (let file of fileList) {
      const dest = path.join(projectPath, file);
      const fileData = JSON.parse(await fs.readFile(dest, 'utf-8'));
      const mergeData = files[file];
      merge(fileData, mergeData);
      await fs.writeFile(dest, JSON.stringify(fileData, null, 2));
    }
  },

  async filesMove(files, projectPath) {
    const fileList = Object.keys(files);
    for (let file of fileList) {
      const dest = path.join(projectPath, files[file]);
      const source = path.join(projectPath, file);
      await fs.ensureFile(dest);
      await fs.rename(source, dest);
    }
  },

  async filesRemove(fileList, projectPath) {
    for (let file of fileList) {
      await fs.remove(path.join(projectPath, file));
    }
  },

  async filesAppend(files, projectPath, activeModule) {
    const fileList = Object.keys(files);
    for (let file of fileList) {
      const dest = path.join(projectPath, file);
      let fileData = await fs.readFile(dest, 'utf-8');
      const appendData = files[file];
      fileData = `${fileData}${appendData}`
      await fs.writeFile(dest, fileData);
    }
  },

  async filesCopy(files, projectPath, activeModule) {
    const fileList = Object.keys(files);
    for (let file of fileList) {
      const dest = path.join(projectPath, files[file]);
      const source = path.join(__dirname, activeModule, file);
      await fs.copy(source, dest);
    }
  }
};
