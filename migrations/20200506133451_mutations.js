
exports.up = function(knex) {
    return knex.schema.createTable('mutations', function(t) {
    t.increments('id')
    t.string('author')
    t.integer('conversationId').references('conversations.id')
    t.integer('index')
    t.integer('length')
    t.string('type')
    t.string('text')
    t.integer('alice')
    t.integer('bob')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('mutations');
};
