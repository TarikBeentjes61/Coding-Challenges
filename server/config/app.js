const express = require('express');
const cors = require('cors');
const app = express();
const challengeRoutes = require('../routes/ChallengeRouter');
const userRoutes = require('../routes/UserRouter');
const uploadRoutes = require('../routes/UploadRouter');
const errorHandler = require('../middleware/errorHandler');
const rateLimiter = require('../middleware/limiter');

app.use(cors({ origin: 'http://localhost:3000' })); // put in config
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', rateLimiter);
app.use('/api/uploads', uploadRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler)
module.exports = app;
