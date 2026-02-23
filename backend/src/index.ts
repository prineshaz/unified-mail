import 'dotenv/config';
import express, { Express } from 'express';
import { Server } from 'node:http';
import cors from 'cors';
import { connectRedis } from "./config/redis";
import routes from './routes/index';
import { errorHandler, notFoundHandler } from './middleware';
import { subToChannel } from './pubsub/subscriber';

const app: Express = express();
const HOST_PORT = process.env.HOST_PORT || 5000;
const PORT = process.env.PORT || 5000;
// Flag to prevent multiple shutdown attempts
let isShuttingDown = false;

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = (server: Server, signal: string): void => {
  // Prevent multiple shutdown attempts
  if (isShuttingDown) {
    console.log(`\n🛑 Received ${signal}, but shutdown is already in progress.`);
    return;
  }

  if (!server.listening) {
    console.log(`\n🛑 Received ${signal}, but server is already closed.`);
    return;
  }

  isShuttingDown = true;

  server.close((err) => {
    if (err) {
      console.error('Error during server shutdown:', err);
      process.exit(1);
    }

    console.log('✅ Server closed successfully');
    process.exit(0);
  });

  // Force shutdown after timeout
  setTimeout(() => {
    console.error(`⚠️  Forced shutdown after 2 seconds`);
    process.exit(1);
  }, 5000);
};

/**
 * Setup process event handlers
 */
export const setupProcessHandlers = (server: Server): void => {
  // Handle shutdown signals
  process.on('SIGTERM', () => gracefulShutdown(server, 'SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown(server, 'SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error: Error) => {
    console.error('💥 Uncaught Exception:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
};


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/v1', routes);

// Catch-all for 404
app.use(/.*/, notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);


const server = app.listen(PORT, async() => {
  console.log(`🚀 Server is running on port ${HOST_PORT} and internal port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${HOST_PORT}/health`);
  console.log(`📍 API routes: http://localhost:${HOST_PORT}/api`);
  try {
    await connectRedis();
    // Mulitple email accounts send message via webhook, specify user id (email) 
    subToChannel('user:123');
    subToChannel('user:456');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
});

setupProcessHandlers(server);



