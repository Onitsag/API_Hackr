require('dotenv').config();
const express = require('express');
const { connectDB, syncDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const featureRoutes = require('./routes/features');
const setupSwaggerDocs = require('./config/swagger');
const path = require('path'); // Importer 'path' pour définir le chemin du dossier 'generated'

// Connecter à MariaDB
connectDB();
syncDB();

const app = express();

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Servir statiquement le dossier 'generated'
app.use('/generated', express.static(path.join(__dirname, 'generated')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/features', featureRoutes);

// Configurer Swagger
setupSwaggerDocs(app);

// Port de l'application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
