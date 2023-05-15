module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/project',
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/environments',
    '.module.ts',
    '.mock.ts',
  ],
  moduleNameMapper: {
    '@env': '<rootDir>/src/environments/environment',
    '@shared': '<rootDir>/src/app/shared/index.ts',
    '@core': '<rootDir>/src/app/core/index.ts',
    '@modules/auth': '<rootDir>/src/app/modules/auth/index.ts',
    '@modules/private': '<rootDir>/src/app/modules/private/index.ts',
  },
};
