const express = require('express');
const cors = require('cors');
const app = express();
const challengeRoutes = require('../routes/ChallengeRouter');
const userRoutes = require('../routes/UserRouter');
const errorHandler = require('../middleware/errorHandler');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/challenges', challengeRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler)
module.exports = app;
