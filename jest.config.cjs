module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Looks for any file ending in .test.ts or .spec.ts anywhere in your project
  testMatch: ['**/?(*.)+(spec|test).ts'], 
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
};