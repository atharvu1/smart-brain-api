const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
//INSTALL npm install bcrypt-nodejs used for password encryption
/*CHROME DOES NOT ALLOW ANY EXTERNAL REQUEST ON THE WEBPAGE , WHEN WE CALL LOCALHOST:3000 VIA :3001 IT WILL GIVE AN ERROR ,SO WE NEED TI USE CORS IN ORDER TO MAKE OUR REQUEST TRUSTED install npm cors IT IS A MIDDLEWARE*/
/*install knex using npm install knex , used to connect database and node server,
after which install for postgreSQL using npm install pg*/
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const knex = require('knex');
const db=knex({
  client: 'pg',
  connection: {
    host : 'postgresql-vertical-31743',
    user : 'postgres',
    password : 'itsmeAU@1200',
    database : 'smart-brain'
  }
});

/*db.select('*').from('users').then(data=>{
	console.log(data);
})*/

app.get('/',(req,res)=>{
	//res.send('Everythig working properly');
	res.send('It is working');
})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});//dependencies injection
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});
app.put('/image',(req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});

/*// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/
app.listen(process.env.PORT || 3000,()=>{
	console.log(`App is running on port ${process.env.PORT}`);
})

/*ENDPOINT
/(root) --> Everything is working
/signin --> POST request -->success/fail
/register --> POST request = user
/profile/:userId --> GET =user
/image -->PUT -->user (updating number of image submitted by a user)

*/
