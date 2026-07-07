import rateLimiter from 'express-rate-limit'

export const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message:  'Too many request.  Please try again later'
})