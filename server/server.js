require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse aplication/x-www-form-urlendoded (formato de como viene, elegimos este por el postman)
app.use(bodyParser.urlencoded({ extended: false }));

// // parse aplication/json (formado a traducir)
// app.use(bodyParser.json);



app.get('/usuario', (req, resp) => {
    resp.json('get Usuario');
});

app.post('/usuario', (req, resp) => {

    let body = req.body;

    if (body.nombre === undefined) {

        resp.status(400).json({
            ok: false,
            mensaje: `El nombre es obligatorio`
        });

    }

    resp.json({
        body
    });
});

app.put('/usuario/:id', (req, resp) => {
    let idUsuario = req.params.id;
    resp.json({
        id: idUsuario
    });
});

app.delete('/usuario', (req, resp) => {
    resp.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});