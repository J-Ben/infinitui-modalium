const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      '@animations': path.resolve(__dirname, 'src/animations'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  watchFolders: [path.resolve(__dirname, 'src')],
};
