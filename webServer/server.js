const express = require('express');
// const recipeCtl = require('./controller/recipe.ctl');
// const profileCtl = require('./controller/profile.ctl');
const test = require('./controlloer/test')
const lisencePlateRecognition = require('./controlloer/lisencePlateRecognition')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use( (req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

/*** All routes ***/
app.get('/test',test.test);
app.post('/lisencePlateRecognition',lisencePlateRecognition.licensePlateUpdate)
// app.get('/getEmailByGmailAPI',gmailAPI.getUserByGmail);


app.all('*', (req, res) => {
  res.send('This is no rout');
});

app.listen(port, () => console.log(`listening on port ${port}`));




