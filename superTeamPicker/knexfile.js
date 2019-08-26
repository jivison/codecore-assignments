// Update with your config settings.

module.exports = {
    development: {
        client: "pg",
        connection: {
            database: "super_team_picker",
            username: "john",
            password: "password"
        },
        migrations: {
            directory: "db/migrations"
        }
    }
};
