import { vi } from 'vitest'

// Example: Stub common env vars for all frontend tests
vi.stubEnv('VITE_API_URL', 'https://api.stackmap.dev')
vi.stubEnv('VITE_API_PATH', '/api/skills')
