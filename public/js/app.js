// console.log('Client side javascript side is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then(({ forecast, location, error }) => {
            if (error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
        })
    })
})




//fetch is not javascript, its a browser command
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

