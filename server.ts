import 'dotenv/config';
import { serve } from '@hono/node-server';
import app from './api/index.js'; // Ensure correct import

const port = 8181;
console.log(`Starting local server on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
