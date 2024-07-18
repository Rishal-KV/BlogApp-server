import jwt  from "jsonwebtoken";
export const  generateToken = (payload) => {
    return jwt.sign(payload,'IL300', {expiresIn:'2d'});
}

export const verifyToken = (token) => {
    return jwt.verify(token,"IL300");
}