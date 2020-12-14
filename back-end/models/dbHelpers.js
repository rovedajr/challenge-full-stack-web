// const knex = require('knex');
// const config = require('../knexfile');
// const db = knex(config.development)

const db = require('../dbConfig')

module.exports = {
    addStudent,
    getStudents,
    getStudentByRa,
    removeStudent,
    editStudent
}

// CRUD operations

async function addStudent(student) {
    return await db('students').insert(student, ['ra', 'nome', 'email', 'cpf'])
    // const [ra] = await db('students').insert(student)
    // return ra;
}

function getStudents() {
    return db('students')
}

function getStudentByRa(ra) {
    return db('students')
        .where({ ra })
        .first()
}

function removeStudent(ra) {
    return db('students')
        .where({ ra })
        .delete();
}

function editStudent(ra, changes) {
    return (
        db('students')
            .where({ ra })
            .update(changes)
            .then(() => {
                return getStudentByRa(ra)
            })
    )
}