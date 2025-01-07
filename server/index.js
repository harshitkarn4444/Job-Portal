const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users');
const OpeningModel = require('./models/opening');
const ApplicationModel = require('./models/application');

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/college_placement")
.then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.get('/getUsers',(req,res)=>{
    UserModel.find({})
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
})

app.post("/createUser", (req,res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getOpenings',(req,res)=>{
  OpeningModel.find({})
  .then(opening=> res.json(opening))
  .catch(err=> res.json(err))
})

app.post("/createOpening", (req,res)=>{
  OpeningModel.create(req.body)
  .then(opening => res.json(opening))
  .catch(err => res.json(err))
})


app.delete('/deleteOpening/:id', (req, res) => {
  OpeningModel.findByIdAndDelete(req.params.id)
      .then(() => res.json({ message: 'Opening deleted' }))
      .catch(err => res.status(500).json(err));
});

app.post("/applyJob", (req,res)=>{
  ApplicationModel.create(req.body)
  .then(application => res.json(application))
  .catch(err => res.json(err))
})

app.get('/getApplications',(req,res)=>{
  ApplicationModel.find({})
  .then(application=> res.json(application))
  .catch(err=> res.json(err))
})


app.listen(3001, ()=>{
    console.log("Server is running");
})
