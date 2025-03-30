const express = require("express");
const app = express();

// Use environment variable for the password (set this in Render later)
const PASSWORD = process.env.APP_PASSWORD || 'defaultpassword123'; // Fallback for local testing

// Middleware to check password
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== `Bearer ${PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized - Invalid or missing password' });
  }
  next();
});

// Your PDF list (replace with your actual Google Drive URLs)
const pdfs = [
  { name: "File1.pdf", url: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_1" },
  { name: "File2.pdf", url: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_2" },
  // Add your ~300 PDFs here
];

// API endpoint to get PDFs
app.get('/api/pdfs', (req, res) => {
  res.json(pdfs);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
