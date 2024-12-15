import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss('./tailwind.config.js'),
  ],
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material', '@mui/system'],
  },
  // css: {
  //   modules: {
  //     localsConvention: 'camelCaseOnly',
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
});

