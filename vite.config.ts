
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import graphql from '@rollup/plugin-graphql'  // Import the GraphQL plugin

export default defineConfig({
  plugins: [
    vue(),
    graphql()  // Add this plugin
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})

