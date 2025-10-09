module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node', // Or 'jsdom' for browser-like environments
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
            isolatedModules: true
        }
    }
};