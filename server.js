const express = require('express');
const mongoose = require('mongoose');
const ipinfo = require('ipinfo');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB (you need to replace 'mongodb://localhost/mydb' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to retrieve IP information
app.use((req, res, next) => {
  const clientIp = req.ip; // Get the user's IP address from the request
  ipinfo(clientIp, (err, data) => {
    if (err) {
      console.error('Error retrieving IP information:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      req.userIpInfo = data;
      next();
    }
  });
});

// Define a route to validate the user's IP
app.get('/validate-ip', (req, res) => {
  // You can add your IP validation logic here.
  // For a simple example, we assume that any IP is valid.
  
  // If you want to implement specific validation logic, you can use req.userIpInfo.

  res.json({ message: 'IP validated successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
