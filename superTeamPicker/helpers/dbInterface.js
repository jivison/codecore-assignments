const knex = require("../db/client");

module.exports = {
    async fetch(id) {
        if (id === "*") {
            return knex("cohorts")
                .select("*")
                .then(data => {
                    return data;
                });
        } else {
            return knex("cohorts")
                .select("*")
                .where({ id: id })
                .then(data => {
                    return data[0];
                });
        }
    },

    async save(data) {
        return knex("cohorts")
            .insert(data)
            .returning("*")
            .then(fetchedData => {
                return fetchedData[0];
            })
            .catch(err => {
                console.log("ERROR");
            });
    },

    async update(data, id) {
        return knex("cohorts")
            .where({ id: id })
            .update(data)
            .then(fetchedData => {
                return ""
            });
    },

    async delete(id) {
        return knex("cohorts").where({id:id}).delete().then((data) => {
            return ""
        })
    }
};
