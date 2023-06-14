import CustomError from "../models/CustomError";

export const ErrorHandler = (err, req, res, next) => {
    console.log('❌ ',err)
    if(err instanceof CustomError){
        return res.status(400).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
        })
    }else{
        return res.status(400).json({
            success: false,
            statusCode: 500,
            message: 'Something Went Wrong '+err,
        })
    }
}