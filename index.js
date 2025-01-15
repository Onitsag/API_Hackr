require('dotenv').config();
const express = require('express');
const { connectDB, syncDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const featureRoutes = require('./routes/features');
const setupSwaggerDocs = require('./config/swagger');
const path = require('path'); // Importer 'path' pour définir le chemin du dossier 'generated'
const cors = require('cors');

// Connecter à MariaDB
connectDB();
syncDB();

const app = express();
app.use(cors());

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Servir statiquement le dossier 'generated'
app.use('/generated', express.static(path.join(__dirname, 'generated')));

// Servir statiquement le dossier 'osint'
app.use('/osint', express.static(path.join(__dirname, 'osint')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/features', featureRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API HackR!');
});


// Configurer Swagger
setupSwaggerDocs(app);

// Port de l'application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
