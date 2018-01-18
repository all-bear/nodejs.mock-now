const express = require('express');
const app = express();

const ROUTE_METHOD_SEPARATOR = ':';
const DEFAULT_ROUTE_METHOD = 'get';
const SERVER_PORT = 3000;
const MOCK_FILE_NAME = 'mock-now';

let routes = {};

try {
  routes = require(`./${MOCK_FILE_NAME}.js`).routes;
} catch (ex) {
  routes = require(`./${MOCK_FILE_NAME}.json`).routes;
}

class Route {
  constructor(meta, response) {
    this.meta = meta;
    this.response = response;

    [this._path, this._method] = meta.split(ROUTE_METHOD_SEPARATOR);
  }

  get method() {
    return (this._method || DEFAULT_ROUTE_METHOD).toLowerCase();
  }

  get path() {
    return this._path;
  }

  getResponseType(req) {
    switch (typeof this.getResponseData(req)) {
      case 'object':
        return 'json';
      default:
        return 'send';
    }
  }

  getResponseData(req) {
    let response = this.response;

    if (typeof response === 'function') {
        response = response(req);
    }

    return response;
  }
}

for (let routeMeta in routes) {
  const route = new Route(routeMeta, routes[routeMeta]);

  app[route.method](route.path, (req, res) => {
    res[route.getResponseType(req)](route.getResponseData(req))
  });
}

app.listen(SERVER_PORT);

