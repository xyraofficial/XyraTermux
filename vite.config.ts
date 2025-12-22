
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5000,
      allowedHosts: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5000
      },
      middlewareMode: false
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom']
          }
        }
      },
      cssCodeSplit: false,
      minify: 'esbuild'
    },
    define: {
      'process.env.GROQ_API_KEY': JSON.stringify(
        env.GROQ_API_KEY || 
        env.API_KEY || 
        process.env.GROQ_API_KEY || 
        process.env.API_KEY || 
        ''
      )
    }
  };
});
