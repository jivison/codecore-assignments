const knexConnector = require("knex");

const knexDeveleopmentConfig = require("../knexfile").development;

const client = knexConnector(knexDeveleopmentConfig);

module.exports = client;