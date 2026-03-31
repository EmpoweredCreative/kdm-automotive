/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms — get a free key at https://web3forms.com (set in Forge env before `npm run build`) */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
