const { Router } = require('express');
const DevController = require('./controlers/DevController');
const SearchController = require('./controlers/SearchController')
const routes = Router();
routes.get('/devs', DevController.index);
routes.get('/search', SearchController.index);

routes.post('/devs', DevController.store);


module.exports = routes;