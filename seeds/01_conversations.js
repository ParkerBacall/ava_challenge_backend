
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('conversations').del()
    .then(function () {
      // Inserts seed entries
      return knex('conversations').insert([
        { id:'aaaa', lastMutation: "A(0, 0)INS0:'The'", text: "The"},
        { id:'sssss', lastMutation: "B(0, 0)INS0:'A'", text: "A"},
        { id:'ssssss', lastMutation: "B(0, 0)INS0:'Hey Guys'", text: "Hey Guys"},
      ]);
    });
};
