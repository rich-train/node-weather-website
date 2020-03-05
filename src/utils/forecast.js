const request = require('request')
const moment = require('moment')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4857f352b6dacd65654fce3a5e933ec2/' + latitude + ',' + longtitude

    let time = ''

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            time = moment(body.currently.time)
            callback(undefined, body.daily.data[0].summary +
                '  The time is ' + time.format("h:mm:ss a") +
                '. It is currently ' + body.currently.temperature +
                ' degress out.  There is a ' + body.currently.precipProbability +
                '% chance of rain.  Humidity is ' + body.daily.data[0].humidity)
        }
    })
}


module.exports = forecast