/*global module, require*/
module.exports = function (app) {
    'use strict';
    
    var mediaController  = require('../controllers/media');
    
    app.get('/api/fotos', mediaController.list);
    app.get('/api/fotos/:maxDate', mediaController.list);
    
};