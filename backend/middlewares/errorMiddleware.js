//? ===================================================== Custom Error Handlers =====================================================


//* ============================ Not Found Error Handler ============================

const notFoundErrorHandler = (req, res, next) => {

    const error = new Error(`Not Found - ${req.originalUrl}`);
    
    res.status(404);

    next(error);

};


//* ============================ Error Handler ============================

const errorHandler = (error, req, res, next) => {

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    let message = error.message;

    // Handling cast error that mongoose might produce
    if (error.name === 'CastError' && error.kind === 'ObjectId') {

        statusCode = 404;

        message = 'Resource not found';
    
    }
    

    res.status(statusCode).json({

        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
        // If production environment, don't show error stack
        // error.stack will have the information about the line of code that caused error and more
        // Above code will show stack information if it's not a production environment 
        
    });

};



export { notFoundErrorHandler, errorHandler };