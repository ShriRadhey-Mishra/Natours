const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
const PORT = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// Different route handlers
const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id.',
    });
  } else {
    const getTour = tours.find((el) => el.id === id);
    res.status(200).json({
      status: 'success',
      data: {
        tours: getTour,
      },
    });
  }
};

const addTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log('Something went wrong, while updating the data in the file.');
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id.',
    });
  } else {
    res.status(200).json({
      message: 'updated tour',
    });
  }
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    message: `Deleted the tour at id: ${id}`,
  });
};

// Handling GET request to /api/v1/tours
// app.get('/api/v1/tours', getTours);

// Handling GET request to a sepecific id
// app.get('/api/v1/tours/:id', getTour);

// Handling POST request to /api/v1/tours
// app.post('/api/v1/tours', addTour);

// Handling PATCH request to /api/v1/tours/:id
// app.patch('/api/v1/tours/:id', updateTour);

// Handling DELETE request to /api/v1/tours/:id
// app.delete('/api/v1/tours/:id', deleteTour);

// Performing the same tasks but using route

app.route('/api/v1/tours').get(getTours).post(addTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Opening our server to listen at a port
app.listen(PORT, () => {
  console.log(`App running at "http://127.0.0.1:${PORT}/" ...`);
});
