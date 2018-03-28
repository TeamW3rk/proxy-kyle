const bundleInfos = require('../helpers/bundles.js');

const main = (apps) => {
  const body = apps.reduce((html, app) => {
    return `<div id="${app[0]}">${app[1]}</div>`
  }, '');

  const scripts = bundleInfos.reduce((html, app) => {
    return `<script src="/bundles/${app.service}-client.js" type="text/javascript"></script>`
  }, '');
  
  const str = `<!DOCTYPE html>
  <html>
    <head>
        <title>FullStack Fat Join Table</title>
    </head>
    <body>
      ${body}
      ${scripts}
    </body>
  </html>`
  return str;
};

module.exports = main;