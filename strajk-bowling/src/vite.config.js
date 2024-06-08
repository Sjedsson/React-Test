import { defineConfig as createViteConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';

const configuration = {
  plugins: [reactPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
};

export default createViteConfig(configuration);
