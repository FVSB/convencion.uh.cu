import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import sequelize from './src/db';
import sponsorsRouter from './src/routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/sponsors', sponsorsRouter);

const PORT = 3000;
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error al sincronizar DB:', err));
