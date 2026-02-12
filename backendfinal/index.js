const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// MongoDB connection
require('./Models/db');

// Routers
const AuthRouter = require('./Routes/AuthRouter');
const updateRoutes = require('./Routes/UpdateRoutes');

// Routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/updates', updateRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
