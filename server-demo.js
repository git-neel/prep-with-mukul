#!/usr/bin/env node

/**
 * Simple HTTP Server for Firebase App
 * Serves the built frontend from dist/public/
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'dist', 'public');

const server = http.createServer((req, res) => {
  // Route API calls to emulator or production
  if (req.url.startsWith('/api/')) {
    // For demo, return mock response
    if (req.method === 'POST' && req.url === '/api/bookings') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          console.log('📝 Demo booking received:', data);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            id: 'demo-' + Date.now(),
            ...data,
            createdAt: new Date().toISOString()
          }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid request' }));
        }
      });
    } else if (req.method === 'GET' && req.url === '/api/bookings') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([]));
    }
    return;
  }

  // Serve static files
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Serve index.html for SPA routing
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
        return;
      }

      let contentType = 'text/html';
      if (filePath.endsWith('.js')) contentType = 'application/javascript';
      else if (filePath.endsWith('.css')) contentType = 'text/css';
      else if (filePath.endsWith('.png')) contentType = 'image/png';
      else if (filePath.endsWith('.jpg')) contentType = 'image/jpeg';
      else if (filePath.endsWith('.json')) contentType = 'application/json';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('🔥 MasterMukul Development Server');
  console.log('=====================================');
  console.log('');
  console.log(`✓ Server running at: http://localhost:${PORT}`);
  console.log('');
  console.log('📝 To test demo booking (API is mocked):');
  console.log('   1. Visit http://localhost:3000');
  console.log('   2. Click "Book my FREE Demo"');
  console.log('   3. Fill the form');
  console.log('   4. Submit - should show success');
  console.log('');
  console.log('⚠️  Note: This is a demo mode with mocked API');
  console.log('   To use real Firebase:');
  console.log('   1. Set up Firebase project');
  console.log('   2. Update .env.local with credentials');
  console.log('   3. Deploy with: firebase deploy');
  console.log('');
  console.log('📚 See README_FIREBASE.md for full setup guide');
  console.log('');
});
