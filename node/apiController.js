/**
 * Created by juanleyba on 5/5/17.
 */
var bodyParser = require('body-parser');
var request = require('request');


module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Content-Type', 'application/json');
        next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.post('/instagram', function (req, res) {

        var askInstagram = function (endpoint) {
            request.get(endpoint, function (error, response, body) {
                try {
                    body = JSON.parse(body);
                }
                catch (error) {
                    console.log(error);
                    return res.status(500).send('Something broke!');
                }
                if (body.success !== undefined && !body.success) {
                    console.log('response:' + JSON.stringify(body));

                    res.json({"responseCode": 1, "responseDesc": "Failed!"});
                }

                res.json(body.graphql.hashtag.edge_hashtag_to_media);
            });
        };

        var tag = req.body['tag'];
        var max_id = req.body['max_id'];
        var endpoint = 'https://www.instagram.com/explore/tags/' + tag + '/?__a=1&max_id=' + max_id;
        askInstagram(endpoint);
    });
};