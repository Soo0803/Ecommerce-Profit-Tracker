// Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Example API endpoint
app.get('/api/data', (req, res) => {
  res.json([
    { "id": 1, "name": "Amazon", "sales": 1000, "profit": 200, "isConnected": true },
    { "id": 2, "name": "Etsy", "sales": 500, "profit": 120, "isConnected": true }
    ]);
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});