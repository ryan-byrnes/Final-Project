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

app.get('/api/exercise-list', (req, res, next) => {
  const sql = `
  select "exercise",
         "exerciseId"
  from "exerciseList"
  `;

  db.query(sql)
    .then(result => res.status(200).json(result.rows));
});

app.get('/api/training/:date', (req, res, next) => {
  const userId = 1;
  const sessionDate = req.params.date;
  const sql = `
  select "e"."exercise",
         "t"."sets",
         "t"."exerciseId"
    from "trainingLog" as "t"
    join "exerciseList" as "e" using ("exerciseId")
   where "userId" = $1 AND date("date") = date($2)
   order by "date"
  `;

  const params = [userId, sessionDate];

  db.query(sql, params)
    .then(result => {
      const session = result.rows[0];
      if (!session) {
        res.status(404).json({ error: 'no training session' });
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch(err => next(err));
});

app.get('/api/pr/:userId', (req, res, next) => {
  const id = parseInt(req.params.userId, 10);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: 'userId must be a positive integer' });
  }
  const sql = `
    select "e"."exercise",
           "p"."reps",
           "p"."weight",
           "p"."prId"
     from  "prs" as "p"
     join "exerciseList" as "e" using ("exerciseId")
     where "userId" = $1
    `;

  const params = [id];

  db.query(sql, params)
    .then(result => {
      const pr = result.rows[0];
      if (!pr) {
        res.status(404).json({ error: 'no prs' });
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch(err => next(err));

});

app.post('/api/pr', (req, res, next) => {
  const { userId, exerciseId, reps, weight } = req.body;

  if (!userId || !exerciseId || !reps || !weight) {
    throw new ClientError(400, 'Exercise, reps, and weight are required fields.');
  }
  const sql = `
  insert into "prs" ("userId", "exerciseId", "reps", "weight")
  values ($1, $2, $3, $4)
  returning *
  `;

  const params = [userId, exerciseId, reps, weight];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/training', (req, res, next) => {
  const { date, exerciseId, sets, userId } = req.body;

  if (!date || !exerciseId || !sets) {
    throw new ClientError(400, 'Date, exerciseId, and sets are required fields.');
  }
  const sql = `
  insert into "trainingLog" ("date", "exerciseId", "sets", "userId")
  values ($1, $2, $3, $4)
  returning *
  `;

  const params = [date, exerciseId, sets, userId];

  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.put('/api/pr/:prId', (req, res, next) => {
  const id = parseInt(req.params.prId, 10);
  const { reps, weight } = req.body;
  if (!Number.isInteger(id) || id <= 0 || !req.body.userId || !req.body.exerciseId || !req.body.reps || !req.body.weight) {
    res.status(400).json({ error: 'invalid entry' });
  } else {
    const sql = `
    update "prs"
      set "reps" = $1,
          "weight" = $2
    where "prId" = $3
    returning *;
    `;

    const params = [reps, weight, id];

    db.query(sql, params)
      .then(result => {
        const prToUpdate = result.rows[0];
        if (!prToUpdate) {
          res.status(404).json({ error: 'pr does not exist' });
        } else {
          res.status(200).json(req.body);
        }
      })
      .catch(err => next(err));
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
