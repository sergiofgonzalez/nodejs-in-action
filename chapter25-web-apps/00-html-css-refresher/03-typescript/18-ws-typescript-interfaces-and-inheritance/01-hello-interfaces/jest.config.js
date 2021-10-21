module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  /* to prevent tests from executing twice (one for ts, one for js) */
  roots: [
    'app/'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.test.(ts|js)'
  ],
  testTimeout: 20000,
  coverageReporters: ['clover', 'json', 'lcov', 'html', 'text']
};
