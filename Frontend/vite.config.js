import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  theme: {
    extend : {
      colors: {
        'primary' : '#5f6fff'
      } 
    },
  },
  plugins: [
    tailwindcss(),
  ],
})
