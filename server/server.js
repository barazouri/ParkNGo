const express = require('express');
const resultsCtl = require('./controller/results.ctl');
const searchCtl = require('./controller/search.ctl');
const bookCtl = require('./controller/book.ctl');
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

app.get('/getAllParkingReviewsByProfile',resultsCtl.getAllParkingReviewsByProfile);
app.get('/getSpecificDriverReviews',resultsCtl.getSpecificDriverReviews);
app.get('/makeSpecificParkingNotAvailable',resultsCtl.makeSpecificParkingNotAvailable);
app.get('/makeSpecificParkingAvailable',resultsCtl.makeSpecificParkingAvailable);
app.get('/removeSpecificParkingSpot',resultsCtl.removeSpecificParkingSpot);

app.post('/lisencePlateRecognition',lisencePlateRecognition.licensePlateUpdate);
app.post('/addProfileBasic',resultsCtl.addProfileBasic);
app.post('/editDriverProfile',resultsCtl.editDriverProfile);
app.post('/addNewParkingSpot',resultsCtl.addNewParkingSpot);
app.post('/editSpecificParking',resultsCtl.editSpecificParking);
app.post('/driverWriteReviewOnHost',resultsCtl.driverWriteReviewOnHost);
app.post('/hostWriteReviewOnDriver',resultsCtl.hostWriteReviewOnDriver);
app.post('/addwindowsOfTimeToParkingSpot',resultsCtl.addwindowsOfTimeToParkingSpot);
app.post('/addPictureToParking',resultsCtl.addPictureToParking);

/*** Search */
app.get('/searchParkingSpotByLocation',searchCtl.searchParkingSpotByLocation);
app.get('/searchParkingSpotByLocationAndPrice',searchCtl.searchParkingSpotByLocationAndPrice);
app.get('/searchParkingSpotByLocationAndPriceAndSize',searchCtl.searchParkingSpotByLocationAndPriceAndSize);
app.get('/searchByLocationAndPriceAndSizeByTime',searchCtl.searchByLocationAndPriceAndSizeByTime);
app.get('/searchByLocationAndPriceAndSizeByCurrentTime',searchCtl.searchByLocationAndPriceAndSizeByCurrentTime);

/*** Book */
app.get('/getFutureReservationsForHost',bookCtl.getFutureReservationsForHost);
app.get('/getFutureReservationsForDriver',bookCtl.getFutureReservationsForDriver);
app.get('/getHostWaitingQueue',bookCtl.getHostWaitingQueue);
app.get('/getDriverWaitingQueue',bookCtl.getDriverWaitingQueue);
app.get('/getHostDeclineReservations',bookCtl.getHostDeclineReservations);
app.get('/getDriverDeclineReservations',bookCtl.getDriverDeclineReservations);


app.post('/bookParkingSpot',bookCtl.bookParkingSpot);
app.post('/approveOrDeclineReq',bookCtl.approveOrDeclineReq);



app.all('*', (req, res) => {
  console.log("localhost:3000/getAllProfiles");        //works
  // res.send('localhost:3000/getAllProfiles');
});

app.listen(port, () => console.log(`listening on port ${port}`));



