const { Sequelize } = require('sequelize');

// Connexion à MariaDB avec Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion MariaDB réussie.');
    } catch (error) {
        console.error('Erreur de connexion MariaDB :', error);
        process.exit(1);
    }
};


const syncDB = async () => {
    try {
        await sequelize.sync({ force: false }); // { force: true } pour recréer les tables à chaque démarrage (pas utiliser en production)
        console.log('Tous les models ont été synchronisés correctement.');
    } catch (error) {
        console.error('Erreur de synchronisation des models de la BDD:', error);
    }
};

module.exports = { sequelize, connectDB, syncDB };
