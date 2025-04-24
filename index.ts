import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

import { sequelize } from './src/db';
import sponsorsRouter from './src/routes';

dotenv.config();

const app = express();

// 1) Middlewares de parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 2) Servir la carpeta public como estáticos
app.use(express.static(path.join(__dirname, 'public')));

// 3) Servir las imágenes subidas
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// 4) Ruta raíz que devuelve public/index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5) Montar el router de sponsors
app.use('/sponsors', sponsorsRouter);

// 6) Sincronizar la BD y levantar el servidor
const PORT = Number(process.env.PORT) || 3000;
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
