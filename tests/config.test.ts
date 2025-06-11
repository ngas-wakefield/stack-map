// tests/config.test.ts
import { describe, it, expect, vi } from 'vitest';

vi.stubEnv('VITE_API_URL', 'https://api.stackmap.dev');
vi.stubEnv('VITE_API_PATH', '/api/skills');

import { FULL_API_URL } from '../utils/config';

describe('FULL_API_URL', () => {
  it('should combine base and path correctly', () => {
    expect(FULL_API_URL).toBe('https://api.stackmap.dev/api/skills');
  });
});
