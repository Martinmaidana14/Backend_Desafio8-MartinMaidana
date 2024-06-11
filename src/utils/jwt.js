
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {

    /*
        1°: Objeto de asociacion del token (Usuario)
        2°: Clave privada del cifrado
        3°: Tiempo de expiracion
    */

    const token = jwt.sign({ user }, "coderhouse", { expiresIn: '12h'})
    return token
}

console.log(generateToken({
    "_id": "6629f57f6129c2f987c385ef",
    "first_name": "Pepe",
    "last_name": "Vazquez",
    "password": "$2b$14$sOmjcZ6UR1gtoPwJuDl.8eq7rWCwSuytuZVfa4US.CA00Qh/E43WK",
    "age": 77,
    "email": "pepe@vazquez.com",
    "rol": "User",
    "__v": 0
}))