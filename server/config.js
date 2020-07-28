const result = require("dotenv").config();

let envs;

if (!("error" in result)) {
  envs = result.parsed;
} else {
  envs = {};
  process.env.forEach((value, key) => {
    envs[key] = value;
  });
}

module.exports = envs;
