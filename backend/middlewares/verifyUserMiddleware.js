//? ===================================================== User Authentication Middleware =====================================================

import { BadRequestError, NotAuthorizedError } from "base-error-handler";

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';



const verifyUser = asyncHandler( async (req, res, next) => {

    const decodedJwtPayload = req.currentUser;

    // Search the Db with the userId obtained after decoding jwt payload to Verify the userId claimed by JWT Payload is valid.
    const requestUser = await User.findById(decodedJwtPayload.id).select('-password');

    if (requestUser) {
    
        // If user is blocked - deny access.
        const blockedUser = requestUser.isBlocked();

        if (blockedUser) {
            throw new NotAuthorizedError();
        }

        req.user = requestUser; // Set the request user with the user data fetched from the Db

        next(); // Proceed to next function as the user is authenticated as Admin

    } else {
        
        throw new BadRequestError("Invalid User - User Authentication Failed.");

    }

});


export default verifyUser;

