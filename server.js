'use strict';

const express = require('express');
const app = express();

// Aquí le decimos que use los archivos estáticos y que se muestre al llamar a la ruta '/'
app.use('/', express.static('public'));

//Desde qué puerto
app.listen(3000, ()=>{
  console.log('Listening on 3000');
});
