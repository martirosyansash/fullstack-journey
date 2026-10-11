export function errorHandler(error, request, response, next) {
    console.error(error);

    if (error.name === "CastError") {
        return response.status(400).json({
            message: "Invalid product ID"
        });
    }
    if (error.name === "ValidationError") {
        return response.status(400).json({
            message: error.message
        });
    }
    if (error.code === 11000) { 
        return response.status(409).json({
            "message": "Product with this name already exists"
        })
    }
    if (process.env.NODE_ENV === "development") {
        return response.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }
    
    response.status(500).json({
        message: "Something went wrong"
    })

 }