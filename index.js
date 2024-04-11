const express = require('express');
const cors = require('cors');

const PORT = 8000

const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use('/api/log', require('./routes/logs'));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto', PORT);
});