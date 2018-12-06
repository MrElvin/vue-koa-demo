module.exports = {
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  collectCoverage: true,
  collectCoverageFrom: [
    'server/**/*.js',
    'src/**/*.vue',
    '!**/node_modules/**'
  ],
  verbose: false,
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': '<rootDir>/test/client/__mocks__/styleMock.js'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ],
  setupFiles: ['jest-localstorage-mock']
}
