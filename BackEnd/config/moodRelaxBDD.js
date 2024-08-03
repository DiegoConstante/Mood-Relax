import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: "MoodRelaxUser",
  host: "localhost",
  database: "MoodRelax",
  password: "MoodRelax!",
  port: 5432,
});

export default client;
