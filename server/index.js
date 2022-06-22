import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouters from './routes/User.js';
import authRoutes from './routes/Auth.js';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://pm-user-management-table-application.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors({ origin: 'https://pm-user-management-table-application.netlify.app'}));

app.use('/users', userRouters);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('APP IS RUNNING.');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
 
