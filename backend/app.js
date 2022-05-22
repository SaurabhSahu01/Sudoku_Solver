const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;
const urlEncodedParser = bodyParser.urlencoded({extended: false});

app.post('/', urlEncodedParser, (req, res)=>{
    const options = {
        method: 'POST',
        url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.key
        },
        data: `{"input": [${req.body.input}]}`
      };
      
      axios.request(options)
      .then(response => {
          res.send(response.data)
      })
      .catch(function (error) {
          console.error(error);
      });
})

app.listen(PORT, (err)=>{
    if(!err){
        console.log('connection succesful');
    }
    else{
        console.error(err);
    }
})