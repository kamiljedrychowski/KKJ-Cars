const http = require("http")

function get(path) {
    let options = {
        host: 'localhost',
        port: '3000',
        method: 'GET',
        path: path
    }
    http.request(options, function (response) {
        let str = ''
        response.on('data', function (chunk) { str += chunk })
        response.on('end', function () {
            console.log(options['method'], path, response.statusCode, str)
        })
    }).end()
}

function post(path, json) {
    let options = {
        host: 'localhost',
        port: '3000',
        method: 'POST',
        path: path
    }
    let req = http.request(options, function (response) {
        console.log()
        let str = ''
        response.on('data', function (chunk) { str += chunk })
        response.on('end', function () {
            console.log(options['method'], path, response.statusCode, str)
        })
    })
    req.write(JSON.stringify(json))
    req.end()
}

// post('/v1/users', { username: "BOB", email: "BOB@gmail.com" })
// get('/v1/users')
get("/v1/appointments/search")