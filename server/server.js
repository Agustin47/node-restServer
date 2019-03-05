require('./config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// parse aplication/x-www-form-urlendoded (formato de como viene, elegimos este por el postman)
app.use(bodyParser.urlencoded({ extended: false }));

// // parse aplication/json (formado a traducir)
// app.use(bodyParser.json);

app.use(require('./routes/usuario'));



mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw new err;

        console.log(`Base de Datos Online`);
    });


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});