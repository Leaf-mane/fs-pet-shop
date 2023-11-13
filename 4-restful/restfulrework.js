import express from 'express'
import pg from 'pg'
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config()

const port = process.env.PORT 

const { Pool } = pg
const pool = new Pool({
    user: 'testuser',
    host: 'localhost',
    database: 'restfulpetdb',
    port: 5432,
    password: '123',
  });

const app = express();
app.use(express.json());
app.use(express.static('public'));

const create = async (req, res) => {
  const pet = req.body;

  if ([pet.age, pet.kind, pet.name].includes(undefined)) {
    res.status(400).send('Bad Request.');
  } else {
    try {
      const query = 'INSERT INTO pets (age, kind, name) VALUES ($1, $2, $3)';
      const values = [pet.age, pet.kind, pet.name];
      const result = await pool.query(query, values);
      res.send('Success.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed.');
    }
  }
};

app.post("/pets", create);
const read = async (req, res) => {
  const { petIndex } = req.params;

  if (petIndex === undefined) {
    try {
      const query = 'SELECT * FROM pets';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed read.');
    }
  } else {
    const index = parseInt(petIndex);

    if (index >= 0) {
      try {
        const query = 'SELECT * FROM pets WHERE id = $1';
        const values = [index];
        const result = await pool.query(query, values);
        
        if (result.rows.length > 0) {
          res.json(result.rows[0]);
        } else {
          send404(req, res);
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Failed.');
      }
    } else {
      send404(req, res);
    }
  }
};

app.get("/pets/:petIndex?", read);
const update = async (req, res) => {
  let { petIndex } = req.params;
  petIndex = parseInt(petIndex);
  if (petIndex >= 0) {
    const pet = req.body;
    if ([pet.age, pet.kind, pet.name].includes(undefined)) {
      res.status(400).send('Bad Request.');
    } else {
      try {
        const query = 'UPDATE pets SET age = $1, kind = $2, name = $3 WHERE id = $4';
        const values = [pet.age, pet.kind, pet.name, petIndex];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
          send404(req, res);
        } else {
          res.send('Success.');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Failed.');
      }
    }
  } else {
    send404(req, res);
  }
};

app.patch("/pets/:petIndex?", update);
const send404 = (req, res) => {
  res.status(404).send("404 Error - Page Not Found");
};

app.use(send404);

const start = () => {
  app.listen(port, () => {
    console.log(chalk.bold.green(`Server is running on port ${port}`));
  });
};

start();

