import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.route.js';
import eventOrganizerRouter from './routes/event-organizer.route.js'
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.FRONTEND_URI || '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter)
app.use('/api/event-organizer', eventOrganizerRouter)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});