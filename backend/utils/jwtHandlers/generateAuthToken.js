//? ===================================================== JWT Authentication =====================================================

import jwt from 'jsonwebtoken';


const generateAuthToken = (res, userId, userEmail) => {

    // Creating a new json webtoken with userId and secret key
    const jwtToken = jwt.sign({id: userId, email: userEmail}, process.env.JWT_KEY, { expiresIn: process.env.JWT_TOKEN_DURATION } );

    const cookieOptions = {

        httpOnly: true, // To prevent cookies from being accessed by client-side scripts
        secure: process.env.NODE_ENV !== 'development', // Value will be false in the development environment and hence http will be allowed in development
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // Sets expiry of cookie to 30 days

    };

    res.cookie('jwt', jwtToken, cookieOptions); 

};



export default generateAuthToken;