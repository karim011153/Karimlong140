import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './api';

// Native ESM equivalents for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

// Mount the API router
app.use('/api', apiRouter);

// Serve frontend static assets from 'dist' folder
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Support Single Page App (SPA) fallback routing for frontend routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    next();
    return;
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Hardcoded Port 3000 in production, which is standard for Cloud Run/container
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server is running at http://0.0.0.0:${PORT}`);
});
