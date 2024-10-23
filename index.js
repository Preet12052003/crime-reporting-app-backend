const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const crimeReportRoutes = require('./routes/crimeReports');
const statisticsRoutes = require('./routes/statistics');
require('dotenv').config();
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/crimeReports', crimeReportRoutes);
app.use('/api/statistics', statisticsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// API LISTDOWN : 
/* 
1. localhost:5000/api/auth/register
1. localhost:5000/api/auth/login

2. localhost:5000/api/crimeReports/submit
2. localhost:5000/api/crimeReports/all 
2. localhost:5000/api/crimeReports/{report._id}

3. localhost:5000/api/statistics/

*/