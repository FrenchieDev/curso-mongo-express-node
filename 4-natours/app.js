const fs = require('fs');
const express = require('express');

const app = express();
const port = 1301;
app.disable('x-powered-by'); // Disabled unnecesary info in header
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello from the server side!',
//         app: 'Natours',
//     });
// });

// app.post('/', (req, res) => {
//     res.status(200).send("You can't POST here");
// });

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours },
    });
};

const getTour = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length || !tour) {
        return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    }
    const tour = tours.find((el) => el.id === id);
    res.status(200).json({
        status: 'success',
        data: { Tours: tour },
    });
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: { tour: newTour },
            });
        }
    );
};

const editTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    }
    res.status(200).json({
        status: 'success',
        data: { tour: '<Updated tour here...' },
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', editTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(editTour).delete(deleteTour);

app.listen(port, () => {
    console.log(`Server running on port ${port}...}`);
});
