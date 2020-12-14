const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Students = require('../models/dbHelpers');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.json({ message: "So far, so good." })
})

server.post('/api/student', (req, res) => {
    Students.addStudent(req.body)
        .then(student => {
            res.status(200).json(student)
        })
        .catch(error => {
            res.status(500).json({ message: "Todos os campos são obrigatórios!" })
        })
})

server.get('/api/students-list', (req, res) => {
    Students.getStudents()
        .then(students => {
            res.status(200).json(students)
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to retrieve students." })
        })
})

server.get('/api/student/:ra', (req, res) => {
    const { ra } = req.params;

    Students.getStudentByRa(ra)
        .then(student => {
            if (student) {
                res.status(200).json(student)
            } else {
                res.status(404).json({ message: "Student not found." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Cannot find student." })
        })
})


server.delete('/api/student/:ra', (req, res) => {
    const { ra } = req.params;

    Students.removeStudent(ra)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "Student successfully deleted" })
            } else {
                res.status(404).json({ message: "Unable to locate student – student not found in database." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to delete student." })
        })
})

server.patch('/api/student/:ra', (req, res) => {
    const { ra } = req.params
    const changes = req.body

    Students.editStudent(ra, changes)
        .then(student => {
            if (student) {
                res.status(200).json(student)
            } else {
                res.status(404).json({ message: "Student not found in database." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error updating student." })
        })

})

module.exports = server