const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
    courseName: {type: String, required: true},
    courseDescription: { type: String, required: true},
    courseSubjectArea: { type: String, required: true},
    courseCredits: { type: Number, required: true},
    courseTeacherFirstName: { type: String, required: true},
    courseTeacherLastName: { type: String, required: true}
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course