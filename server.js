const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs');

app.use(express.static('StyleAndResources'))

app.listen(3000)

app.get('/', (request, response) => {
    response.redirect('/index')
})

app.get('/index',  (request, response) => {
    response.render('index')
})
app.get('/courses',  (request, response) => {
    response.render('courses')
})
app.get('/student',  (request, response) => {
    response.render('student')
})
app.get('/contact',  (request, response) => {
    response.render('contact')
})
app.get('/signup_login',  (request, response) => {
    response.render('signup_login')
})
app.get('/class1',  (request, response) => {
    response.render('class1')
})
app.get('/class2',  (request, response) => {
    response.render('class2')
})
app.get('/class3',  (request, response) => {
    response.render('class3')
})