const jwt = require('jsonwebtoken');



let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.JWT_Seed, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

}


let verificaAdmin_Role = (req, res, next) => {

    if (req.usuario.role !== 'ADMIN_ROLE')
        return res.status(401).json({
            ok: false,
            err: 'Permiso denegado'
        });

    next();

}


module.exports = {
    verificaToken,
    verificaAdmin_Role,
}