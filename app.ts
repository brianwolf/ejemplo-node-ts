import express from 'express';
import { getLogger } from './logger';

let app = express()


app.get('/', (req, res) => {
    getLogger().info('vivo!!!')
    res.status(200).send({ ditto: 'yo te elijo' })
})

app.listen(7000, () => {
    console.log(`\nServidor escuchando en http://localhost:7000/`);
})

export default app;