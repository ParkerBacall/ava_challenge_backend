
exports.up = function(knex) {
    return knex.schema.createTable('conversations', function(t) {
        t.string('id').unique()
        t.string('lastMutation')
        t.string('text')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('conversations');
};
