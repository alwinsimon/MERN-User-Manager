//? ===================================================== User Authentication Middleware =====================================================

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';



const verifyUser = asyncHandler( async (req, res, next) => {

    try {
            
        const decodedJwtPayload = req.currentUser;

        // Search the Db with the userId obtained after decoding jwt payload to Verify the userId claimed by JWT Payload is valid.
        const requestUser = await User.findById(decodedJwtPayload.id).select('-password');

        if (requestUser) {
        
            req.user = requestUser; // Set the request user with the user data fetched from the Db

            next(); // Proceed to next function as the user is authenticated as Admin

        } else {
            
            res.status(401).send({message: 'Invalid User'});

        }

    } catch (error) {
        
        res.status(400);

        throw new Error(`User Authentication Failed - ${error.message}`);

    }

});


export default verifyUser;

