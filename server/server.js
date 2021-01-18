const fs = require('fs');
const express = require('express');
const pino = require('express-pino-logger')();

const app = express();
const PORT = process.env.PORT || 8080;
// middleware for parsing results
app.use(express.json());
app.use(pino);

const devData = 'dev-data';
const api = 'api';
const bitesFilePath = `${__dirname}/${devData}/bites.json`;
const bitesApi = `/${api}/bites`;

// get the bites from the database (eventually)
const bites = JSON.parse(fs.readFileSync(bitesFilePath, 'utf-8'));

// define get route for the bites
app.get(bitesApi, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      status: 'success',
      // for client to quickly get number of bites
      results: bites.length,
      data: { bites },
    })
  );
});

// add a bite, no error/schema handling yet
app.post(bitesApi, (req, res) => {
  const id = bites[bites.length - 1].id + 1;
  const newBite = Object.assign({ id }, req.body);
  bites.push(newBite);

  fs.writeFile(bitesFilePath, JSON.stringify(bites), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        bite: newBite,
      },
    });
  });
});

// get a bite with the given id
app.get(`${bitesApi}/:id`, (req, res) => {
  const id = req.params.id;
  const bite = bites.find((h) => h.id === id * 1);

  if (!bite) {
    return res.status(404).json({
      status: 'fail',
      message: `No bite found with id ${id}`,
    });
  }

  res.json({
    status: 'success',
    data: { bite },
  });
});

app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));
