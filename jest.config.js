module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/packages'],
  testMatch: ["**/__tests__/**/*.(js|jsx|ts|tsx)",
    "**/?(*.)+(spec|test).(js|jsx|ts|tsx)"],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  collectCoverageFrom: [
    'packages/ui/src/**/*.{js,jsx}',
    '!packages/ui/src/index.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
