const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const axios = require('axios');
const mainHTML = require('./templates/main_HTML');
const downloadBundles = require('./helpers/download_bundles');
const requireBundles = require('./helpers/require_bundles');
const renderComponents = require('./helpers/render_components');
let components;

app.get('/r/:id', (req, res) => {
  renderComponents(req.params.id, components)
    .then((renderedComponents) => {
      console.log('+++ renderedComponents, server.js +++', renderedComponents);
      res.send(mainHTML(renderedComponents));
    })
    .catch(error => {
      console.log('FROM -- server.js', error);
    });
});

downloadBundles().then(() => {
  components = requireBundles();
  app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`)
  });
}) 
.catch(function (error) {
  console.log('from server.js <><><><>' ,error)

  // console.log('ERROR IN SERVER.JS FILE')
  // if (error.response) {
  //   // The request was made and the server responded with a status code
  //   // that falls out of the range of 2xx
  //   console.log(error.response.data);
  //   console.log(error.response.status);
  //   console.log(error.response.headers);
  // } else if (error.request) {
  //   // The request was made but no response was received
  //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //   // http.ClientRequest in node.js
  //   console.log(error.request);
  // } else {
  //   // Something happened in setting up the request that triggered an Error
  //   console.log('Error', error.message);
  // }
  // console.log(error.config);
});



