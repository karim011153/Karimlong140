import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import express from 'express';
import apiRouter from './api';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Propagate API keys to the Node environment for the dev server APIs
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    process.env.API_KEY = env.GEMINI_API_KEY || process.env.API_KEY || '';

    return {
      base: './',
	      server: {
	        port: 3000,
	        host: '0.0.0.0',
	      },
      plugins: [
        {
          name: 'api-mock-or-server',
          configureServer(server) {
            const app = express();
            app.use(express.json({ limit: '10mb' }));
            app.use('/', apiRouter);
            
            server.middlewares.use('/api', app);
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
