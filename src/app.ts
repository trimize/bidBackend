import express from 'express';
import routes from './routes';

const app = express();
const PORT = 8081;

app.use('/*/bid', express.raw({ type: '*/*' }));
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});