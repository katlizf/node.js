const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


// MIDDLEWARE (check for id setup so don't have to do in every route handler that uses id as a param)
exports.checkId = (req, res, next, val) => {
    if (req.params.id*1 > tours.length) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next()
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
            return res.status(400).json({
                status: 'fail',
                message: 'Missing name or price'
            })
        }
    next()
}

// ROUTE HANDLERS   
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    })
}
exports.getTour = (req, res) => {
    console.log(req.params)
    const id = req.params.id * 1
    const tour = tours.find(elem => elem.id === id)
    
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tour
        }
    })
}
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {    
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}
exports.deleteTour = (req, res) => {    
    res.status(204).json({
        status: 'success',
        data: null
    })
}