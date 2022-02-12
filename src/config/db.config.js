import "dotenv/config"

export const development = {
  username: getUsername(),
  password: getPassword(),
  database: getName(),
  host: getHost(),
  dialect: "postgres"
};

export const test = {
  username: getUsername(),
  password: getPassword(),
  database: getName(),
  host: getHost(),
  dialect: "postgres"
};

export const production = {
  username: getUsername(),
  password: getPassword(),
  database: getName(),
  host: getHost(),
  dialect: "postgres"
};

export default {
  development: development,
  test: test,
  production: production
}

function getHost() {
  if (!process.env.DB_HOST)
      throw Error("DB_HOST environment variable must be set");

  return process.env.DB_HOST;
}

function getUsername() {
  if (!process.env.DB_USERNAME)
      throw Error("DB_USERNAME environment variable must be set");

  return process.env.DB_USERNAME;
}

function getPassword() {
  if (!process.env.DB_PASSWORD)
      throw Error("DB_PASSWORD environment variable must be set");

  return process.env.DB_PASSWORD;
}

function getName() {
  if (!process.env.DB_NAME)
      throw Error("DB_NAME environment variable must be set");

  return process.env.DB_NAME;
}
