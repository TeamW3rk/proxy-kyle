const bundleInfos = require('../helpers/bundles.js');

const main = (apps) => {
  const body = apps.reduce((html, app) => {
    return html + `<div id="${app[0]}" data-${app[0]}='${JSON.stringify(app[2])}'>${app[1]}</div>`;
  }, '');

  const scripts = bundleInfos.reduce((html, app) => {
    return html + `<script src="/bundles/${app.service}-client.js" type="text/javascript"></script>`;
  }, '');

  const styles = bundleInfos.reduce((html, app) => {
    if(!app.fileName.styles) return html;
    return html + `<link rel="stylesheet" href="/bundles/${app.service}-styles.css">`;
  }, '');
  
  const str = `<!DOCTYPE html>
  <html>
    <head>
      <title>FullStack Fat Join Table</title>
      ${styles}
    </head>
    <body>
      ${body}
      ${scripts}
    </body>
  </html>`
  return str;
};

module.exports = main;