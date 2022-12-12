const express = require('express')
const mongoose = require('mongoose')
const Course = require('./models/course')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')


const app = express()

const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.frko7ir.mongodb.net/FinalProjectDatabase?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => { 
    console.log('connected to db')
    app.listen(3000);})
  .catch((err) => {console.log(err)})

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))



app.get('*', checkUser);
//Basic Page Rendering
app.get('/', (request, response) => {
    response.redirect('/index')
})

app.get('/index',  (request, response) => {
    response.render('index')
})
app.get('/courses',  (request, response) => {
    Course.find()
        .then((result) => {
            response.render('courses', {courses: result})
        })
        .catch((error) => {
            console.log(error)
        })
    
})
app.get('/student',  (request, response) => {
    response.render('student')
})
app.get('/contact',  (request, response) => {
    response.render('contact')
})
app.get('/class/:id',  (request, response) => {
    const id = request.params.id;
    console.log(id)
    Course.findById(id)
    .then((result) => {
        response.render('class', {course: result})
    })
    .catch((error) => {
        console.log(error)
    })
})



app.post('/courses/post', requireAuth, (request, response) => {
    const course = new Course(request.body)
    course.save()
    .then((result) => {
        response.redirect('/courses')
      })
      .catch((error) => {
        console.log(error)
      })
})

app.post('/class/put/:id', requireAuth, (request, response) => {
    const id = request.params.id;
    const course = new Course(request.body)
    Course.findByIdAndDelete(id)
    .then((result) => {
    })
    .catch((error) => {
        console.log(error)
    })
    course.save()
    .then((result) => {
        response.redirect('/courses')
    })
    .catch((error) => {
        console.log(error)
    })
})

app.delete('/courses/delete/:id', requireAuth, (request, response) => {
    const id = request.params.id;
    console.log(id)
    Course.findByIdAndDelete(id)
    .then((result) => {
        response.redirect('/courses')
    })
    .catch((error) => {
        console.log(error)
    })
})

app.use(authRoutes)
