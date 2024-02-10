const fs = require('fs');
const path = require('path');

const copyFiles = require('./utils');

const SOURCE_DIR = path.resolve('scripts/template/feature');

function createModule({ featureName }) {
  const targetDir = path.resolve('core', featureName);

  if (fs.existsSync(targetDir)) {
    console.error('directory already used');
    process.exit(1);
    return;
  }

  fs.mkdirSync(targetDir);
  copyFiles(SOURCE_DIR, targetDir, featureName);

  console.log(`${featureName} module generated`);
}

module.exports = createModule;
