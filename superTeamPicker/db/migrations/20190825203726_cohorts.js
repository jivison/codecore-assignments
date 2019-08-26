exports.up = function(knex) {
    return knex.schema.createTable("cohorts", table => {
        table.bigIncrements("id");
        table.string("name");
        table.string("logo_url");
        table.text("members");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("cohorts")
};
