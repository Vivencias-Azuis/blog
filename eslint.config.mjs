import { FlatCompat } from '@eslint/eslintrc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  {
    ignores: ['.next/**', '.next-dev/**', 'node_modules/**', 'public/sw.js', 'next-env.d.ts'],
  },
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),
]

export default eslintConfig
