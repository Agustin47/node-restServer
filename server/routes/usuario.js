const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');


const app = express();
const Usuario = require('../models/usuarios');

app.get('/usuario', (req, res) => {

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err)
                return res.status(400).json({
                    ok: false,
                    error: err
                });
            res.json({
                ok: true,
                usuarios
            });
        });

});

app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err)
            return res.status(400).json({
                ok: false,
                error: err
            });

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', (req, res) => {
    let idUsuario = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(idUsuario, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err)
            return res.status(400).json({
                ok: false,
                error: err
            });

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuario/:id', (req, res) => {

    let id = req.param.id;
    let body = { estado: false };

    Usuario.findByIdAndUpdate(idUsuario, body, { new: true }, (err, usuarioDB) => {
        if (err)
            return res.status(400).json({
                ok: false,
                error: err
            });

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

    // Usuario.findByIdAndRemove(id, (err, usuarioDB) => {
    //     if (err)
    //         return res.status(400).json({
    //             ok: false,
    //             error: err
    //         });

    //     res.json({
    //         ok: true,
    //         usuario: usuarioDB
    //     });
    // });

});


module.exports = app;