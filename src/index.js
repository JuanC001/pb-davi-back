import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.FRONTEND_URI || '*',
    optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});