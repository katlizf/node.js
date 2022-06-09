const { resolveObjectURL } = require('buffer')
const express = require('express')
const fs = require('fs')
const PORT  = 3000
const app = express()

// Middleware that applies to every request
app.use(express.json())
app.use((req, res, next) => {
    console.log('Hello from the middleware')
    next()
})
// next calls the next middleware in the stack to run
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    })
}

const getTour = (req, res) => {
    console.log(req.params)
    const id = req.params.id * 1
    const tour = tours.find(elem => elem.id === id)
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tour
        }
    })
}

const createTour = (req, res) => {
    const newID = tours[tours.length-1].id +1
    const newTour = Object.assign({id: newID}, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

const updateTour = (req, res) => {
    if (req.params.id*1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

const deleteTour = (req, res) => {
    if (req.params.id*1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// get mtheod is the http for the request
// can add optional params to url with "/:param?"

// Refactored way of coding the above routes
// Middleware that responds to specific requests
app.route('/api/v1/tours')
    .get(getAllTours)
        .post(createTour)
app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})