const express = require('express');
const resultsCtl = require('./controller/results.ctl');
const lisencePlateRecognition = require('./controller/lisencePlateRecognition')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use( (req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

/*** All routes ***/
app.get('/getAllProfiles', resultsCtl.getAllProfiles);
app.get('/getAllHosts', resultsCtl.getAllHosts);
app.get('/getAllAvailableParking', resultsCtl.getAllAvailableParking);
app.get('/getAllParkingSpots', resultsCtl.getAllParkingSpots);
app.get('/getAllDrivers', resultsCtl.getAllDrivers);
app.post('/addProfileBasic',resultsCtl.addProfileBasic);
app.post('/lisencePlateRecognition',lisencePlateRecognition.licensePlateUpdate)



app.all('*', (req, res) => {
  console.log("localhost:3000/getAllProfiles");        //works
  res.send('localhost:3000/getAllProfiles');
});

app.listen(port, () => console.log(`listening on port ${port}`));



