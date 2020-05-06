
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('conversations').del()
    .then(function () {
      // Inserts seed entries
      return knex('conversations').insert([
        { lastMutation: "A(0, 0)INS0:'The'", text: "The"},
        { lastMutation: "B(0, 0)INS0:'A'", text: "A"},
        { lastMutation: "B(0, 0)INS0:'Hey Guys'", text: "Hey Guys"},
      ]);
    });
};
