const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.getTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.addTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    message: `Deleted the tour at id: ${id}`,
  });
};