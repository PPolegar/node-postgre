const express = require('express');

let port = process.env.PORT || 3000
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index'));

app.listen(port);
console.log('Server on port', 3000);