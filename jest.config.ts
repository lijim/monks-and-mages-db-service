import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  cacheDirectory: '.jest-cache',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
