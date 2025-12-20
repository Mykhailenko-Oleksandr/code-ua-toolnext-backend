// Libraries
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';

//MongoDB
import { connectMongoDB } from './db/connectMongoDB.js';

// Middlewares
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

// Swagger
import { swaggerSpec } from './config/swagger.js';

// Routes
import userRoutes from './routes/usersRoutes.js';
import toolsRoutes from './routes/toolsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import feedbacksRoutes from './routes/feedbacksRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(userRoutes);
app.use(toolsRoutes);
app.use(authRoutes);
app.use(bookingsRoutes);
app.use(categoriesRoutes);
app.use(feedbacksRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
