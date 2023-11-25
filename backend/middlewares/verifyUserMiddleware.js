//? ===================================================== User Authentication Middleware =====================================================

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';



const authenticateUser = asyncHandler( async (req, res, next) => {

    const tokenFromRequest = req.cookies.userJwt;

    if (tokenFromRequest) {
    
        try {
            
            // Decode the jwt token using the secret key in the server
            const decodedTokenData = jwt.verify( tokenFromRequest, process.env.JWT_SECRET_KEY_USER);

            // If the Token is valid, search the Db with the userId obtained after decoding jwt payload
            const requestUser = await User.findById(decodedTokenData.userId).select('-password');

            if (requestUser) {
            
                req.user = requestUser; // Set the request user with the user data fetched from the Db

                next(); // Proceed to next process

            }

        } catch (error) {
            
            res.status(401);

            throw new Error(`Authentication Failed. Invalid token found`);

        }

    } else {

        res.status(401);

        throw new Error(`Authentication Failed. No token found`);

    }

});


export default authenticateUser;

