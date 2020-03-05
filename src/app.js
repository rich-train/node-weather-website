const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// process.env - environment variable
//    its an object 
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rich'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Rich',
        name: 'Rich'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is some helpful text',
        title: 'Help',
        name: 'Rich'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// Error handler
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rich',
        errorMessage: 'Help article not found!'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rich',
        errorMessage: 'Page not found!'
    })
})

// In heroku, it provides the port automatically.  port 3000 is for local only
// Its not static, via an enviroment variable

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})






// console.log(__filename)
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// sample
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Rich',
//         age: 45
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About developer on training</h1>')
// })



