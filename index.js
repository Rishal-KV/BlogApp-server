// Import necessary modules using ES6 syntax
import express from 'express';
import { json, urlencoded } from 'express';
import userRoute from './routes/userRoute.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Initialize Express application
const app = express();

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

// Serve static files from the 'public' directory
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

// Parse JSON bodies
app.use(json());

// Parse URL-encoded bodies
app.use(urlencoded({ extended: true }));

// Route middleware
app.use('/', userRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
