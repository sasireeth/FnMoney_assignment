const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3004',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: 'Content-Type,Authorization'
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect("mongodb+srv://sasireeth:1234@cluster0.sbysgtg.mongodb.net/?appName=Cluster0")
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const authRoutes = require('./routes/auth');
const assessmentRoutes = require('./routes/assessments');

app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
