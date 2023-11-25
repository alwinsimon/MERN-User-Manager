//? ===================================================== Admin Authentication Middleware =====================================================

import asyncHandler from 'express-async-handler';
import AdminModel from '../models/adminModel.js';


const verifyAdmin = asyncHandler( async (req, res, next) => {

    try {

        const decodedJwtPayload = req.currentUser;

        // Search the Db with the userId obtained after decoding jwt payload to Verify the userId claimed by JWT Payload is valid.
        const requestUser = await AdminModel.findById(decodedJwtPayload.id).select('-password');

        if (requestUser) {
        
            req.user = requestUser; // Set the request user with the user data fetched from the Db

            console.log(req.user);

            next(); // Proceed to next function as the user is authenticated as Admin

        }

    } catch (error) {
        
        res.status(401);

        throw new Error(`Admin Authentication Failed - ${error.message}`);

    }

});


export default verifyAdmin;

