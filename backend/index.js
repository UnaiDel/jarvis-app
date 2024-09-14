import express from 'express';
import helmet from 'helmet';
import apiRoutes from './routes/api.js'; // Asegúrate de agregar ".js" en las rutas relativas
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(helmet());

const corsOptions = {
  origin: function (origin, callback) {
    if (
      ['http://localhost:3000', 'http://localhost:3001'].indexOf(origin) !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
