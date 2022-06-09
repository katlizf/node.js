const express = require('express')
const morgan = require('morgan')
const app = express()
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

app.use(express.json())

// MIDDLEWARE (applies to every request)
app.use(express.static(`${__dirname}/public`))
app.use((req, res, next) => {
    console.log('Hello from the middleware')
    next()
})
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})
// next calls the next middleware in the stack to run
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')) /*can show details such as "GET /api/v1/tours 200 11.544 ms - 8618" in terminal*/
}


// ROUTES, mounted
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
