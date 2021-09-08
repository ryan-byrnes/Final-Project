require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const jsonMiddleware = express.json();

const app = express();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.use(errorMiddleware);

app.post('/api/pr', (req, res, next) => {
  const { exercise, reps, weight } = req.body;

  if (!exercise || !reps || !weight) {
    throw new ClientError(400, 'Exercise, reps, and weight are required fields.');
  }
  const sql = `
  insert into "prs" ("reps", "weight")
  values ($1, $2)
  returning *;

  insert into "prs" ("exerciseId")
  select "exerciseId"
  from "exerciseList"
  where "exercise" = $3
  `;

  const params = [reps, weight, exercise];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
