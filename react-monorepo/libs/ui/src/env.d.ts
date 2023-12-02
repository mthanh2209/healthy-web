/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USERS_ENDPOINT: string
  readonly VITE_BOOKS_ENDPOINT: string
  readonly VITE_HIRE_REQUESTS_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
