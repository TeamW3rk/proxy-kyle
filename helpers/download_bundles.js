const axios = require('axios');
const path = require('path');
const fs = require('fs');
const bundleInfos = require('../helpers/bundles.js');

const promisifyOnEvent = (data) => {
 
  return new Promise((resolve, reject) => {
    data.on('end', () => {
      resolve();
    });
    //reject();
  }); 
}

const getBundle = (info, type) => {
  return axios({
    url: info.url + info.fileName[type], //// info.fileName[type]
    method: 'get',
    responseType: 'stream',
  })
  .then((response) => {
    const bundlePath = path.join(__dirname, `../public/bundles/${info.service}-${type}.js`);
    // console.log(bundlePath)
    const writeStream = fs.createWriteStream(bundlePath);

    // writeStream.on('error', function (err) {
    //   console.log('WriteStream error --- ', err);
    // })

    response.data.pipe(writeStream);



    return promisifyOnEvent(response.data)
      .then(() => {
        console.log(`${info.fileName[type]} fetched from ${info.url}`);
      })
      .catch(error => {
        console.log('error FROM -- download_bundles', error);
      });
  })
  .catch(error => {
    console.log('error FROM -- download_bundles with get request', error);
  });
};

const downloadBundles = () => {

  
  const clientBundles = [];
  const serverBundles = [];
  let promises = bundleInfos.map(info => getBundle(info, 'server'));
  promises.concat(bundleInfos.map(info => getBundle(info, 'client')));
  // console.log('promises',promises);
  return Promise.all(promises);
};


module.exports = downloadBundles;