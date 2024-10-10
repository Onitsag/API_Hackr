require('dotenv').config();
const express = require('express');
const { connectDB, syncDB } = require('./config/db');
const authRoutes = require('./routes/auth');

// Connecter à MariaDB
connectDB();
syncDB();

const app = express();

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Port de l'application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
