/*global require, module*/
module.exports = function (app) {
    'use strict';

	require('../routes/default')(app);
    require('../routes/media')(app);
};