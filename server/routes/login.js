const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuarios');

const app = express();

// LogIN
app.post('/login', (req, res) => {

    let body = req.body;
    let email = null;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        if (!usuarioDB || !bcrypt.compareSync(body.password, usuarioDB.password))
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o Contraseña incorrectos'
                }
            });

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.JWT_Seed, { expiresIn: process.env.JWT_Expirate })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });

});


module.exports = app;