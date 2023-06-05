import jwt from 'jsonwebtoken';     //know about jwt vs session ids

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',      //to prevent csrf attacks
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
};

export default generateToken;