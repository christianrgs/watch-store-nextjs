module.exports = {
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.+(js|jsx|ts|tsx)']
}
