const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation du projet de l\'API HackR',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Serveur local'
      }
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers les fichiers contenant les commentaires Swagger
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs disponibles à http://localhost:5000/api-docs');
};

module.exports = setupSwaggerDocs;
