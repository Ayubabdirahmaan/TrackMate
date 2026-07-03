export const notfound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} is not found`)
    error.statusCode = 404,
    next(error)
}