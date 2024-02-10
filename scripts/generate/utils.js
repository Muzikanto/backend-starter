const fs = require('fs');
const path = require('path');

function copyFiles(source, target, featureName) {
  const entries = fs.readdirSync(source);
  const featureNameUpper = featureName.slice(0, 1).toUpperCase() + featureName.slice(1);

  for (const entry of entries) {
    const fileName = entry.replace('feature', featureName);
    const sourceEntry = path.join(source, entry);
    const targetEntry = path.join(target, fileName);

    if (fs.lstatSync(sourceEntry).isDirectory()) {
      fs.mkdirSync(targetEntry);
      copyFiles(sourceEntry, targetEntry, featureName);
    } else {
      let content = fs.readFileSync(sourceEntry, { encoding: 'utf-8' });
      content = content.split('forFeature').join('forXX');

      content = content.split('feature').join(featureName);
      content = content.split('Feature').join(featureNameUpper);
      content = content.split('FEATURE').join(featureName.toUpperCase());

      content = content.split('forXX').join('forFeature');

      fs.writeFileSync(targetEntry, content, { encoding: 'utf-8' });
    }
  }
}

module.exports = copyFiles;
