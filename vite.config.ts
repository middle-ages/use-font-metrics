import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        FitTextDemo: resolve(__dirname, 'src/demos/FitTextDemo.html'),
        HMetricsDemo: resolve(__dirname, 'src/demos/HMetricsDemo.html'),
        Quickstart : resolve(__dirname, 'src/demos/Quickstart.html'),
        VMetricsDemo : resolve(__dirname, 'src/demos/VMetricsDemo.html'),
      },
    },
  },
});
