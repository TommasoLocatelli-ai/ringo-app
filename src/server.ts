import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import sequelize from './config/dbConfig';

const app = express();

// Middleware per il parsing del body JSON
app.use(bodyParser.json());

// Rotte
app.use('/api', userRoutes);

// Sincronizza il database e avvia il server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
