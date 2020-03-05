const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4857f352b6dacd65654fce3a5e933ec2/' + latitude + ',' + longtitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +
                '  It is currently ' + body.currently.temperature +
                ' degress out.  There is a ' + body.currently.precipProbability +
                '% chance of rain.')
        }
    })
}

module.exports = forecast