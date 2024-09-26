const errorHandler=(err,req,res,next)=> {
    console.log(err.stack)
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internar Server Error'
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    })
}
module.exports= errorHandler
