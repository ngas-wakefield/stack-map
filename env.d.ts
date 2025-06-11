// env.d.ts

interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_AUDIENCE: string
  readonly VITE_API_URL: string
  readonly VITE_API_PATH: string
  // Add more env variables you use here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
