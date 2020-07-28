const result = require("dotenv").config();
const _ = require("lodash");

let envs;

if (!("error" in result)) {
  envs = result.parsed;
} else {
  envs = {};
  _.each(process.env, (value, key) => (envs[key] = value));
}

module.exports = envs;
