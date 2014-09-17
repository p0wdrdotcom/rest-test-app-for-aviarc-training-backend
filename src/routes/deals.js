(function(){
    'use strict';

    /**
     * @api {get} /api/deals Deals GET
     * @apiName GetDeals
     * @apiGroup Deals
     * @apiVersion 0.0.1
     *
     * @apiSuccess {Object[]} deal
     * @apiSuccess {String} deal.id The unique identifier for the deal
     * @apiSuccess {String} deal.destination The destination for the deal
     * @apiSuccess {String} deal.origin The origin for the deal
     * @apiSuccess {String} deal.price The price of the deal
     * @apiSuccess {String} deal.tagline Some marketing words
     * @apiSuccess {String} deal.terms Some marketing words
     * @apiSuccess {String} deal.image A relative path to the background image
     * @apiSuccess {String} deal.template The layout template to use
     *
     */
    var getDeals = function (req, res, next) {
        var obj = [
            { deal: {
                    id: "1",
                    destination: "New Zealand",
                    origin: "Switzerland",
                    price: "$1,632",
                    terms: "economy per person return",
                    image: "./www/images/Kauri-Cliffs-Golf-Course-New-Zealand.jpg",
                    template: "one"
                }
            },
            { deal: {
                    id: "2",
                    destination: "Asia",
                    origin: "New Zealand",
                    price: "$719",
                    tagline: "on sale!",
                    terms: "economy per person return",
                    image: "www/images/shanghai-skyline-at-dusk-china.jpg",
                    template: "two"
                }
            },
            { deal: {
                    id : "3",
                    destination: "USA & VANCOUVER",
                    origin: "New Zealand",
                    price: "$829",
                    terms: "economy per person return",
                    image: "./www/images/Vancouver_City_2_by_ajithrajeswari.jpg",
                    template: "three"
                }
            }
        ];
        res.json(obj);
        return next();
    };


    module.exports = function (server) {
        server.get('api/deals', getDeals);
    };

})();