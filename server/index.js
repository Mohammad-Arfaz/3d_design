import express from 'express';
import cors from 'cors';
import sketchfabRoutes from './routes/sketchfab.routes.js';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/sketchfab', sketchfabRoutes);

app.listen(8089, () => console.log('Server running on port 8089'));
