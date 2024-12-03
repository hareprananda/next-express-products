import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  // log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

export const useRouter = jest.fn();
export const usePathname = jest.fn();
export const redirect = jest.fn();

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

jest.mock('antd', () => {
  const React = require('react');
  const originalAntd = jest.requireActual('antd');
  return {
    // @ts-ignore
    ...originalAntd,
    Select: ({ onChange, value }: { onChange: (value: string) => void; value: string }) =>
      React.createElement('input', {
        'data-testid': 'type-select',
        value,
        onChange: (e: any) => onChange(e.target.value)
      })
  };
});
