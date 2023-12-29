const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const authRoute = require('./routes/authRoute');
const teamRoute = require('./routes/teamRoute');
const leagueRoute = require('./routes/leagueRoute');
const footballerRoute = require('./routes/footballerRoute');
const { PORT } = require('./constants/port');
const { Log } = require('./utils/Log');

const app = express();

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern-2').then(() => Log('MongoDB bağlantısı başarılı.', 'GREEN'));

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//Routes
app.use('/auth', authRoute);
app.use('/team', teamRoute);
app.use('/league', leagueRoute);
app.use('/footballer', footballerRoute);

app.listen(PORT, () => Log(`Server ${PORT} portunda başlatıldı.`, 'GREEN'));
