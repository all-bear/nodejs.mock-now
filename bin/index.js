#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');

const MOCK_FILE_NAME = 'mock-now';
const TMP_FOLDER_NAME = '.mock-now-server';
const NOW_CMD_OPTIONS = ['--public'];

let configPath = path.join(process.cwd(), `${MOCK_FILE_NAME}.js`);
const tmpFolderPath = path.join(process.cwd(), TMP_FOLDER_NAME);
const targetServerPath = path.join(__dirname, '..', 'lib', 'server');

if (!fs.existsSync(configPath)) {
  configPath = path.join(process.cwd(), `${MOCK_FILE_NAME}.json`);
}

if (!fs.existsSync(configPath)) {
  throw new Error('Mock file config is not provided');
}

if (fs.existsSync(tmpFolderPath)) {
  fs.removeSync(tmpFolderPath);
}
fs.mkdirSync(tmpFolderPath);

fs.copySync(configPath, path.join(tmpFolderPath, path.parse(configPath).base));
fs.copySync(path.join(targetServerPath, 'package.json'), path.join(tmpFolderPath, 'package.json'));
fs.copySync(path.join(targetServerPath, 'index.js'), path.join(tmpFolderPath, 'index.js'));

require('child_process').spawn('now', [tmpFolderPath, ...NOW_CMD_OPTIONS], { stdio: 'inherit' });
