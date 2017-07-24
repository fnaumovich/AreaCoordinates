const express = require('express');
const request = require('request');
const app = express();

const fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.get('/writeCoords', function (req, res) {
    if (req.query.areaID) {
        request({
            url: 'http://global.mapit.mysociety.org/area/' + req.query.areaID + '.geojson',
            json: true
        }, function (error, response, body) {
            if (body && body.coordinates) {
                const file = fs.createWriteStream('coordinates.txt');

                file.on('error', function (err) {
                    console.log(err)
                });

                body.coordinates.forEach(function (v) {
                    v.forEach(function (v1) {
                        v1.forEach(function (v2) {
                            file.write(v2.join(', ') + '\n')
                        });
                    });
                });
                file.end();
            }
        });
        res.send({ answer: 'all good!' });
    } else {
        res.send({ error: 'not enough parameters' });
    }
});

app.get('/*', function (req, res) {
    res.send('wrong way');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});