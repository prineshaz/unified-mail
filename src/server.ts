import express, { Express } from 'express';

const app: Express = express();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
});