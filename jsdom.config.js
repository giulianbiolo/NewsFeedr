module.exports = {
  build: {
    extend(config, { isDev, isClient }) {
      if (isClient) {
        config.node = {
          fs: 'empty',
          child_process: 'empty',
        }
      }
    }
  }
}
