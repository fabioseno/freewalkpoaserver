/*jslint nomen: true */
/*global require, module*/
module.exports.list = function (req, res) {
    'use strict';

    var configInstagram	= require('../config/instagram'),
        ig				= require('instagram-node').instagram(),
        newMedias = [];

    ig.use({ access_token: configInstagram.access_token });

    function processResult(err, startId, lastSavedMediaId, medias) {
        var i, media, finished, newMedia;

        if (err) {
            return;
        }

        for (i = 0; i < medias.length; i += 1) {
            media = medias[i];

            // stop
            if (media.id !== lastSavedMediaId) {
                if (media.type === 'image') {

                    newMedia = {
                        _id: media.id,
                        caption: media.caption && media.caption.text ? media.caption.text : '',
                        lowResolutionURL: media.images.low_resolution.url,
                        standardResolutionURL: media.images.standard_resolution.url,
                        createdTime: media.created_time,
                        userName: media.user.username
                    };

                    newMedias.push(newMedia);
                }
            } else {
                finished = true;
                break;
            }

            startId = media.id;
        }

        if (!finished && medias.length > 0) {
            getMedias(startId, lastSavedMediaId);
        } else {
            newMedias = [];
        }
        
        return res.json(newMedias);
    }
    
    function getMedias(startId, lastSavedMediaId) {
        if (startId) {
            ig.tag_media_recent('freewalkpoa', { max_tag_id: startId }, function (err, medias, pagination, remaining, limit) {
                processResult(err, startId, lastSavedMediaId, medias);
            });
        } else {
            ig.tag_media_recent('freewalkpoa', function (err, medias, pagination, remaining, limit) {
                processResult(err, startId, lastSavedMediaId, medias);
            });
        }
    }
    
    getMedias(undefined, req.params.maxDate);

};