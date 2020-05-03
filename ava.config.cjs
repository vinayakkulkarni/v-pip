module.exports = {
  require: ['./test/helpers/ava.setup.js'],
  ignoredByWatcher: ['!**/*.{js,vue}'],
  snapshotDir: './test/snapshot',
  babel: true,
  tap: true,
  verbose: true,
  color: true,
};
