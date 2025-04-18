import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

global.fetch = jest.fn();

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

jest.mock('punycode', () => ({}), { virtual: true });