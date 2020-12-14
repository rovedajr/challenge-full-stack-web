
exports.up = function (knex) {
    return knex.schema.createTable('students', tbl => {
        tbl.text('nome', 128).notNullable()
        tbl.text('email', 128).notNullable()
        tbl.increments('ra').notNullable()
        tbl.text('cpf', 11).notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('students')
};
