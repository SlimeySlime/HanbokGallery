module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/test-support/styleMock.cjs',
    '\\.(svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf)$': '<rootDir>/test-support/fileMock.cjs',
  },
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', {
      babelrc: false,
      configFile: false,
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
    }],
  },
  resetMocks: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
};
