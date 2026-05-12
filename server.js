const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDb connect
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Mongodb Connected!!!"))
.catch((err)=>console.log("Mongodb Error", err))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'JobTracker API chal raha hai!' });
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai`);
});