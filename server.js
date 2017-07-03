'use strict';

const express = require('express');
const app = express();

// Aquí le decimos que use los archivos estáticos y que se muestre al llamar a la ruta '/'
app.use('/', express.static('public'));

//Desde qué puerto
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
  console.log('Listening on ' + port);
});
