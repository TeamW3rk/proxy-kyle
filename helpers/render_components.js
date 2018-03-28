const axios = require('axios');
const React = require('react');
const ReactDom = require('react-dom/server');
const bundleInfos = require('../helpers/bundles.js');

const renderComponents = (id, components) => {
  const renderedComponents = bundleInfos.map((info) => {
    console.log('get request to ---> ', `${info.url}r/${id}/${info.endpoint}`);
    
    return axios.get(`${info.url}r/${id}/${info.endpoint}`)
      .then((response) => {
        // console.log('response from get request ^-^-^-^ render_component.js', response.data);
        const props = {};
        props[info.props.data] = response.data;
        props[info.props.id] = id;
        console.log('render_component.js props ^-^-^-^', props);
        return [info.service, ReactDom.renderToString(React.createElement(components[info.service], props))];
    })
    .catch(error => {
      console.log('error FROM -- render_components', error);
    });
  });


  return Promise.all(renderedComponents);
};

module.exports = renderComponents;


