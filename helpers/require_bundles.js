const bundleInfos = require('../helpers/bundles.js');

const requireBundles = () => {
  const components = {};
  bundleInfos.map((info) => {
    components[info.service] = require(`../public/bundles/${info.service}-server.js`).default
  })
  return components;
};

module.exports = requireBundles;