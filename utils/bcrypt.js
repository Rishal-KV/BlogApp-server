import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
   return bcrypt.hash(password,10);
}

export const compare = (pass,hashpass) => {
    return bcrypt.compare(pass,hashpass);
}