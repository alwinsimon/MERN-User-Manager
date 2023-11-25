//? ===================================================== User JWT Deletion =====================================================

import jwt from 'jsonwebtoken';


const destroyUserToken = (res) => {

    // Empty string to place in cookie instead of token 
    const jwtToken = '';

    const cookieOptions = {

        httpOnly: true, // To prevent cookies from being accessed by client-side scripts
        secure: process.env.NODE_ENV !== 'development', // Value will be false in the development environment and hence http will be allowed in development
        sameSite: 'strict',
        maxAge: new Date(0) // Sets expiry of cookie to current Date so that it'll be expiring right away

    };

    res.cookie('userJwt', jwtToken, cookieOptions); 

};



export default destroyUserToken;