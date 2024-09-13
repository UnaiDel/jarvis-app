const admin = require('firebase-admin');

// Middleware de autenticación de Firebase
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Espera un token en formato 'Bearer TOKEN'
    
    if (!token) {
        return res.status(403).send({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next(); // Si el token es válido, procede con la siguiente función
    } catch (error) {
        return res.status(401).send({ mensaje: 'Token no válido', error });
    }
};

module.exports = verifyToken;
