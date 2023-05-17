export const build = {
    extend(config, { isClient }) {
        if (isClient) {
            config.node = {
                fs: 'empty',
                child_process: 'empty',
            }
        }
    }
}
