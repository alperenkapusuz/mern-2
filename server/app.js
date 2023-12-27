const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const protectedRoute = require('./routes/protectedRoute');
const { PORT } = require('./constants/port');
const { Log } = require('./utils/Log');

const app = express();

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern-2').then(() => Log('MongoDB bağlantısı başarılı.', 'GREEN'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/protected', protectedRoute)
app.use('/auth', authRoute);

app.listen(PORT, () => Log(`Server ${PORT} portunda başlatıldı.`, 'GREEN'));
