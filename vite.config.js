import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
   plugins: [
      tailwindcss(),
   ],
   base: '/learn_block-2/',
})